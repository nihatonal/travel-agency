import React, { createContext, useState } from "react";
export const ShareContext = createContext({
    dates: [],
    update: false,
    setDateRange: () => { },
});

export function ShareProvider({ children }) {
    const [dates, setDates] = useState([]);
    const [update, setUpdate] = useState(false)
    function setDateRange(x) {
        setDates(x)
        setUpdate(!update)

    }

    const contextValue = {
        dates: dates,
        update: update,
        setDateRange
    }

    return (
        <ShareContext.Provider value={contextValue}>
            {children}
        </ShareContext.Provider>
    )
}

export default ShareProvider;


