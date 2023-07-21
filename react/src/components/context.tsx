import React, { useEffect, useState } from "react";

const GraphContext = React.createContext({});
interface memeDateDatasetType {
    [key: string]: {
        memes: number;
        messages: number;
    };
}
const GraphProvider = ({ children }: any) => {
    const [fullScreenGraph, setFullScreenGraph] = useState<boolean>(false);
    const [selectedGraphId, SetSelectedGraphId] = useState(null);
    const [memePerDay, setMemePerDay] = useState(null);
    const [startDate, setStartDate] = useState<string>("04/01/2023");
    const [endDate, setEndDate] = useState<string>("06/30/2023");
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
    console.log(graphPerDay);

    const selectGraph = (graphId: any) => {
        SetSelectedGraphId(graphId);
        setFullScreenGraph(true);
    };

    return (
        <GraphContext.Provider
            value={{
                fullScreenGraph,
                setFullScreenGraph,
                selectedGraphId,
                SetSelectedGraphId,
                selectGraph,
                memePerDay,
                setMemePerDay,
                memeDateDataset,
                setMemeDateDataset,
                graphPerDay,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export { GraphContext, GraphProvider };
