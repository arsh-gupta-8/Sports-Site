import { useState, useEffect } from "react";
import axios from "axios";

function app() {

    const [matchData, setMatchData] = useState([]);
    const [webError, setWebError] = useState("");

    useEffect(() => {
        const fetchMatches = async () => {
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
                setMatchData(data);
                setWebError("");
            }
            else {
                setWebError("Unable to retrieve match data. Please try again later.");
            }
        };

        fetchMatches();
        console.log(matchData)
    }, []);

    return (
        <div>
            <h1>Matches Today</h1>
            { webError !== "" ? (
                <p>{webError}1</p>
            ) : (
                matchData.length === 0 ? (
                    <p>No matches today</p>
                ) : (
                    matchData.map((match) => (
                        <div key={match.id}>
                            <h2>{match.round}</h2>  
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
                    ))
                )
            )}
        </div>
    );
}

export default app;