import { useState, useEffect } from "react";
import axios from "axios";

function app() {

    const [matchData, setMatchData] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch('http://localhost:5000/api/matches');

            if (response.ok) {
                setMatchData(await response.json());
            }
        };

        fetchMatches();
    }, []);

    return (
        <div>
            <h1>Matchs Today</h1>
            { matchData.length === 0 ? (
                <p>No matches today</p>
            ) : (
                matchData.map((match) => (
                    <div>
                        <h2>Match {match.id}</h2>
                        <p><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></p>
                        <p>SCORE     {match.score}</p>
                    </div>
                ))
            )};
        </div>
    );
}

export default app;