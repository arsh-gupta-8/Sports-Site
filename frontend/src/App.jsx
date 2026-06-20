import { useState, useEffect } from "react";
import axios from "axios";

function app() {

    const [matchData, setMatchData] = useState({});
    const [webError, setWebError] = useState("");

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json');

                if (response.ok) {
                    const matchInfo = await response.json();
                    const data = matchInfo.matches;

                    data.sort((a, b) => a.date.localeCompare(b.date));

                    let i = 1;
                    data.forEach(match => {
                        match.id = i;
                        i++;
                    })
                    
                    let matchByDate = {};

                    data.forEach((match) => {
                        const checkDate = match.date;
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

    return (
        <div>
            <h1>Matches</h1>
            { webError !== "" ? (
                <p>{webError}1</p>
            ) : matchData.length === 0 ? (
                <p>No matches available</p>
            ) : (
                Object.keys(matchData).map((matchSet) => (
                    <div key={matchSet}>
                        <h2>{matchData[matchSet][0].round}</h2>
                        <h2>{matchSet}</h2>
                        <div>
                            
                            {matchData[matchSet].map((match) => (
                                <div key={match.id}>
                                    <h2>{match.id}</h2>  
                                    <p><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></p>
                                    { Object.hasOwn(match, "score") == true ? (
                                        <div>
                                            <p>FINAL</p>
                                            <p>{match.score.ft[0]} - {match.score.ft[1]}</p>
                                        </div>
                                    ) : (
                                        <p>TBD</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default app;

