
const worldCupCountryFlags = {
    "Algeria": "https://flagcdn.com/w320/dz.png",
    "Argentina": "https://flagcdn.com/w320/ar.png",
    "Australia": "https://flagcdn.com/w320/au.png",
    "Austria": "https://flagcdn.com/w320/at.png",
    "Belgium": "https://flagcdn.com/w320/be.png",
    "Bosnia & Herzegovina": "https://flagcdn.com/w320/ba.png",
    "Brazil": "https://flagcdn.com/w320/br.png",
    "Canada": "https://flagcdn.com/w320/ca.png",
    "Cape Verde": "https://flagcdn.com/w320/cv.png",
    "Colombia": "https://flagcdn.com/w320/co.png",
    "DR Congo": "https://flagcdn.com/w320/cd.png",
    "Ivory Coast": "https://flagcdn.com/w320/ci.png",
    "Croatia": "https://flagcdn.com/w320/hr.png",
    "Curaçao": "https://flagcdn.com/w320/cw.png",
    "Czech Republic": "https://flagcdn.com/w320/cz.png",
    "Ecuador": "https://flagcdn.com/w320/ec.png",
    "Egypt": "https://flagcdn.com/w320/eg.png",
    "England": "https://flagcdn.com/w320/gb-eng.png",
    "France": "https://flagcdn.com/w320/fr.png",
    "Germany": "https://flagcdn.com/w320/de.png",
    "Ghana": "https://flagcdn.com/w320/gh.png",
    "Haiti": "https://flagcdn.com/w320/ht.png",
    "Iran": "https://flagcdn.com/w320/ir.png",
    "Iraq": "https://flagcdn.com/w320/iq.png",
    "Japan": "https://flagcdn.com/w320/jp.png",
    "Jordan": "https://flagcdn.com/w320/jo.png",
    "Mexico": "https://flagcdn.com/w320/mx.png",
    "Morocco": "https://flagcdn.com/w320/ma.png",
    "Netherlands": "https://flagcdn.com/w320/nl.png",
    "New Zealand": "https://flagcdn.com/w320/nz.png",
    "Norway": "https://flagcdn.com/w320/no.png",
    "Panama": "https://flagcdn.com/w320/pa.png",
    "Paraguay": "https://flagcdn.com/w320/py.png",
    "Portugal": "https://flagcdn.com/w320/pt.png",
    "Qatar": "https://flagcdn.com/w320/qa.png",
    "Saudi Arabia": "https://flagcdn.com/w320/sa.png",
    "Scotland": "https://flagcdn.com/w320/gb-sct.png",
    "Senegal": "https://flagcdn.com/w320/sn.png",
    "South Africa": "https://flagcdn.com/w320/za.png",
    "South Korea": "https://flagcdn.com/w320/kr.png",
    "Spain": "https://flagcdn.com/w320/es.png",
    "Sweden": "https://flagcdn.com/w320/se.png",
    "Switzerland": "https://flagcdn.com/w320/ch.png",
    "Tunisia": "https://flagcdn.com/w320/tn.png",
    "Turkey": "https://flagcdn.com/w320/tr.png",
    "USA": "https://flagcdn.com/w320/us.png",
    "Uruguay": "https://flagcdn.com/w320/uy.png",
    "Uzbekistan": "https://flagcdn.com/w320/uz.png"
};

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
            <div className="match-teams" style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "5%",
                marginBottom: "5%",
            }}>
                <img src={worldCupCountryFlags[matchInfo.team1]} alt={matchInfo.team1} style={{
                    width: "10%",
                    height: "auto",
                }}></img>
                <p style={{
                    width: "20%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontWeight: (Object.hasOwn(matchInfo, "score") && (matchInfo.score.ft[0] > matchInfo.score.ft[1] || matchInfo.score.ft[0] === matchInfo.score.ft[1])) ? "bold" : "normal",
                }}>{matchInfo.team1}</p>
                <p>vs</p>
                <p style={{
                    width: "20%",
                    textOverflow: "ellipsis",
                    fontWeight: (Object.hasOwn(matchInfo, "score") && (matchInfo.score.ft[1] > matchInfo.score.ft[0] || matchInfo.score.ft[0] === matchInfo.score.ft[1])) ? "bold" : "normal",
                }}>{matchInfo.team2}</p>
                <img src={worldCupCountryFlags[matchInfo.team2]} alt={matchInfo.team2} style={{
                    width: "10%",
                    height: "auto",
                }}></img>
            </div>
            <div className="match-score" style={{  
                display: "flex",
                justifyContent: "center"
            }}>
                { Object.hasOwn(matchInfo, "score") ? (
                    <div style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}>
                        <p style={{
                            fontWeight: (matchInfo.score.ft[0] > matchInfo.score.ft[1] || matchInfo.score.ft[0] === matchInfo.score.ft[1]) ? "bold" : "normal",
                        }}>{matchInfo.score.ft[0]}</p>
                        <p>  vs  </p>
                        <p style={{
                            fontWeight: (matchInfo.score.ft[1] > matchInfo.score.ft[0] || matchInfo.score.ft[0] === matchInfo.score.ft[1]) ? "bold" : "normal",
                        }}>{matchInfo.score.ft[1]}</p>
                    </div>
                ) : (
                    <p>TBD</p>
                )}
            </div>
        </div>
    );
}

export default FootballCard;