import React, { useState } from "react";

const GraphContext = React.createContext({});

const GraphProvider = ({ children }: any) => {
    const [fullScreenGraph, setFullScreenGraph] = useState<boolean>(false);
    const [selectedGraphId, SetSelectedGraphId] = useState(null);

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
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export { GraphContext, GraphProvider };
