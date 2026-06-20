import { useState, useEffect } from "react";
import axios from "axios";

function app() {

    const [matchData, setMatchData] = useState([]);
    const [webError, setWebError] = useState("");

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json');

                const matchInfo = await response.json()
                console.log(matchInfo)
                const data = matchInfo.matches

                let i = 1;
                data.forEach(match => {
                    match.id = i;
                    i++;
                })

                if (response.ok) {
                    let matchByDate = []
                    if (data.length !== 0) {
                        data.sort((a, b) => a.date.localeCompare(b.date));
                        let searchDate = data[0].date;
                        let matchSet = [];
                        for (i = 0; i < data.length; i++) {
                            if (data[i].date === searchDate) {
                                matchSet.push(data[i]);
                            }
                            else {
                                searchDate = data[i+1].date;
                                matchByDate.push(matchSet);
                                matchSet = [];
                            }
                        }
                        matchByDate.push(matchSet);
                    }
                    setMatchData(matchByDate);
                    setWebError("");
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
        console.log(matchData)
    }, []);

    return (
        <div>
            <h1>Matches</h1>
            { webError !== "" ? (
                <p>{webError}1</p>
            ) : matchData.length === 0 ? (
                <p>No matches available</p>
            ) : (
                matchData.map((matchSet) => (
                    <div>
                        <h2>{matchSet[0].date}</h2>
                        <h2>{matchSet[0].round}</h2>
                        <div>
                            
                            {matchSet.map((match) => (
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

