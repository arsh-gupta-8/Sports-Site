function FootballCard({matchInfo}) {
    return (
        <div className="match-card" style={{
            width: "35%",
            justifyContent: "center",
            margin: "2%",
            border: "2px solid white",
            borderRadius: "20px",
            padding: "5%",
        }}>
            <div className="match-header" style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <p>{matchInfo.date}</p>
                <p>{matchInfo.time}</p>
            </div>
            <div className="match-teams">
                <p>{matchInfo.team1} vs {matchInfo.team2}</p>
            </div>
            <div className="match-score">
                { Object.hasOwn(matchInfo, "score") == true ? (
                    <div>
                        <p>{matchInfo.score.ft[0]} - {matchInfo.score.ft[1]}</p>
                    </div>
                ) : (
                    <p>TBD</p>
                )}
            </div>
        </div>
    );
}

export default FootballCard;