import { createContext, useEffect, useState } from "react";
import { updateState } from "../hooks/persistedState";

export const userData = createContext(null);

function UserDataProvider({ children }) {
    
    const [currency, setCurrency] = updateState('currency', 1000);
    const [predictions, setPredictions] = updateState('predictions', {"WC" : {}, "Other" : {}});


    useEffect(() => {
        const checkWCPredictions = async () => {

            // try {
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
                
                const predictionList = Object.keys(predictions["WC"]);
                for (i=0; i<data.length; i++) {
                    if (predictionList.includes(String(data[i].id))) {
                        const checkID = data[i].id; 
                        
                        if (Object.hasOwn(data[i], "score")) {
                            let multiplier = 0;
                            let score1 = data[i+1].score.ft[0];
                            let score2 = data[i+1].score.ft[1];
                            if (Object.hasOwn(data[i+1].score, "et")) {
                                score1 += data[i+1].score.et[0];
                                score2 += data[i+1].score.et[1];
                            }
                            if (Object.hasOwn(data[i+1].score, "p")) {
                                score1 += data[i+1].score.p[0];
                                score2 += data[i+1].score.p[1];
                            }
                            const winner = score1 > score2 ? 1 : score2 > score1 ? 2 :  0;
                            if ( winner === predictions["WC"][checkID].winner ) {
                                multiplier += 2
                            }


                            if ( score1 === predictions["WC"][checkID].score1 ) {
                                multiplier += 1
                            }
                            if ( score2 === predictions["WC"][checkID].score2 ) {
                                multiplier += 1
                            }

                            setCurrency(currency + predictions["WC"][checkID].amount * multiplier)

                            const updatedPredictions = { ...predictions };
                            delete updatedPredictions["WC"][checkID];
                            setPredictions(updatedPredictions);
                        }
                    } 
                }
            }
            else {
                setWebError("Unable to retrieve match data. Please try again later.");
            }

                
            // } catch (error) {
            //     console.log(error)
            //     setWebError("Unable to retrieve match data. Please try again later.");
            // }
        }

        if (Object.keys(predictions["WC"]).length !== 0) {
            checkWCPredictions();
        }
        
    }, [])
    
    return (
        <userData.Provider value={{ currency, setCurrency, predictions, setPredictions }}>
            {children}
        </userData.Provider>
    );

}

export default UserDataProvider;