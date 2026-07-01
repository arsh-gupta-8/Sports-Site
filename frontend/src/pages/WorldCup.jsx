import { useState, useEffect } from "react";
import axios from "axios";
import FootballMatchCard from "../components/FootballMatchCard"
import { getItem } from "../utils/localStorage";
import { updateState } from "../hooks/persistedState";
import { useContext } from "react";
import { userData } from "../context/UserDataContext";

function WorldCup() {

    const { currency, setCurrency, predictions, setPredictions } = useContext(userData);

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
            <div style={{
                width: "80%",
                maxWidth: "800px",
                margin: "80px auto",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                padding: "30px",
                textAlign: "center"
            }}>
                <h3 style={{ 
                    color: "#4682B4",
                    fontSize: "1.5rem", 
                    marginTop: "0",
                    marginBottom: "40px",
                }}>
                    Prediction Rules
                </h3>
                <ul style={{ 
                    listStyleType: "none",
                    padding: "0",
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}>
                    <li style={{ fontSize: "1rem", color: "#e0e0e0" }}><strong>+2x</strong> if only win/draw predicted</li>
                    <li style={{ fontSize: "1rem", color: "#e0e0e0" }}><strong>+1x</strong> for each teams score predicted correctly</li>
                    <li style={{ fontSize: "1rem", color: "#e0e0e0" }}>Win by penalties don't count as a draw</li>
                    <li style={{ fontSize: "1rem", color: "#e0e0e0" }}>Penalties are included in final score prediction</li>
                    <li style={{ fontSize: "1rem", color: "#e0e0e0"}}>You cannot make predictions after a match starts</li>
                </ul>
            </div>
            <h1 style={{ color: "#e0e0e0" }}>Matches</h1>
            { webError !== "" ? (
                <p style={{ color: "#e0e0e0" }}>{webError}1</p>
            ) : matchData.length === 0 ? (
                <p style={{ color: "#e0e0e0" }}>No matches available</p>
            ) : (
                Object.keys(matchData).map((matchSet) => (
                    <div key={matchSet} style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", 
                        alignItems: "center",
                        marginBottom: "70px",
                        color: "#e0e0e0",
                    }}>
                        <h2>{matchData[matchSet][0].round}</h2>
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

