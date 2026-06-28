import { createContext, useState } from "react";
import { updateState } from "../hooks/persistedState";

export const userData = createContext(null);

function UserDataProvider({ children }) {
    
    const [currency, setCurrency] = updateState('currency', 1000);
    const [predictions, setPredictions] = updateState('predictions', {});
    
    return (
        <userData.Provider value={{ currency, setCurrency, predictions, setPredictions }}>
            {children}
        </userData.Provider>
    );

}

