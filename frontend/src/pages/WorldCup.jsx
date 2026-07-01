import { useState, useEffect } from "react";
import axios from "axios";
import FootballMatchCard from "../components/FootballMatchCard"
import { getItem } from "../utils/localStorage";
import { updateState } from "../hooks/persistedState";
import { useContext } from "react";
import { userData } from "../context/UserDataContext";

function WorldCup() {

    const { currency, setCurrency, predictions, setPredictions } = useContext(userData);
    console.log(predictions);
    const [matchData, setMatchData] = useState({});
    const [webError, setWebError] = useState("");


    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json');

                if (response.ok) {
                    const matchInfo = await response.json();
                    const data = matchInfo.matches;

                    data.forEach(match => {
                        const combTime = match.date + "T" + match.time.split(" ")[0] + ":00-0" + match.time.split(" ")[1].at(-1) + ":00";
                        const dateObj = new Date(combTime);
                        match.timeFormat = combTime;
                        const userLocalTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const userLocalDate = dateObj.toLocaleDateString([], { day: 'numeric', month: 'short' });
                        const compDate = dateObj.toLocaleDateString("en-US", { day: '2-digit', month: '2-digit' }) + userLocalTime;

                        match.compDate = compDate;
                        match.localTime = userLocalTime;
                        match.localDate = userLocalDate;
                        match.dateObj = dateObj;
                    })

                    data.sort((a, b) => a.compDate.localeCompare(b.compDate));

                    let i = 1;
                    data.forEach(match => {
                        match.id = i;
                        i++;
                    })

                    // console.log(data)
                    
                    let matchByDate = {};

                    data.forEach((match) => {
                        const checkDate = match.localDate;
                        if (!matchByDate[checkDate]) {
                            matchByDate[checkDate] = [match];
                        }
                        else {
                            matchByDate[checkDate].push(match);
                        }
                    })

                    setMatchData(matchByDate);

                }
                else {
                    setWebError("Unable to retrieve match data. Please try again later.");
                }

                
            } catch (error) {
                console.log(error)
                setWebError("Unable to retrieve match data. Please try again later.");
            }
        };

        fetchMatches();        

    }, []);

    function testPrediction() {
        const updatedPredictions = { ...predictions };
        updatedPredictions["WC"][75] = {"score1" : 2, "score2" : 1, "amount" : 100, "winner" : 1 };
        setPredictions(updatedPredictions);
        console.log(predictions);
    }

    return (
        <div>
            <h1>Matches</h1>
            <p>You have {currency} coins</p>
            <button onClick={() => {setCurrency(currency + 1)}}> Add currency </button>
            <button onClick={() => {testPrediction()}}> Test Prediction </button>
            <div style={{
                width: "90%",
                borderColor: "white",
                border: "2px solid white",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column"
            }}>
                <h3>Prediction Rules</h3>
                <ul>
                    <li> +200% return if win/draw decided correctly</li>
                    <li> Win by penalties don't count as a draw</li>
                    <li> +100% return for each team score chosen correctly</li>
                    <li> penalties are included in final score prediction</li>
                    <li> You cannot make predictions after a match starts</li>
                </ul>
            </div>
            { webError !== "" ? (
                <p>{webError}1</p>
            ) : matchData.length === 0 ? (
                <p>No matches available</p>
            ) : (
                Object.keys(matchData).map((matchSet) => (
                    <div key={matchSet} style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", 
                        alignItems: "center",
                    }}>
                        <h2 style={{ marginTop: "50px" }}>{matchData[matchSet][0].round}</h2>
                        <h2>{matchSet}</h2>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            flexWrap: "wrap",
                        }}>
                            {matchData[matchSet].map((match) => (
                                <FootballMatchCard key={match.id} matchInfo={match}/>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default WorldCup;

