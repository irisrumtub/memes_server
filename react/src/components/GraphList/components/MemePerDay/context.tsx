import React, { useEffect, useState } from "react";

const MemePerDayContext = React.createContext({});
interface memeDateDatasetType {
    [key: string]: {
        memes: number;
        messages: number;
    };
}
const MemePerDayProvider = ({ children }: any) => {
    const [memeDateDataset, setMemeDateDataset] =
        useState<memeDateDatasetType | null>(null);
    const [graphPerDay, setGraphPerDay] = useState<{}>({});
    //ref context LineGraph

    useEffect(() => {
        if (memeDateDataset) {
            const labels = Object.keys(memeDateDataset);
            const memesArr = labels.map((item) => memeDateDataset[item].memes);
            const messagesArr = labels.map(
                (item) => memeDateDataset[item].messages
            );
            setGraphPerDay({ memesArr, messagesArr, labels });
        }
    }, [memeDateDataset]);
    ////////////

    return (
        <MemePerDayContext.Provider
            value={{
                memeDateDataset,
                setMemeDateDataset,
                graphPerDay,
            }}
        >
            {children}
        </MemePerDayContext.Provider>
    );
};

export { MemePerDayProvider, MemePerDayContext };
