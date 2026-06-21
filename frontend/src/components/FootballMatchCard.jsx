function FootballCard({matchInfo}) {
    return (
        <div className="match-card" style={{
            maxWidth: 500,
            justifyContent: "center",
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