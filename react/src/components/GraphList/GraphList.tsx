import React, { useContext, useEffect, useRef } from "react";
import LineChart from "./components/LineChart/LineChart";
import PieChart from "./components/PieChart/PieChart";
import VerticalBarChart from "./components/VerticalBarChart/VerticalBarChart";
import { GraphContext } from "../context";
interface Props {}

const GraphList: React.FC<Props> = ({}) => {
    const graphs = [
        { id: 1, component: <LineChart /> },
        { id: 2, component: <PieChart /> },
        { id: 3, component: <VerticalBarChart /> },
        { id: 4, component: <PieChart /> },
        { id: 5, component: <VerticalBarChart /> },
        { id: 6, component: <VerticalBarChart /> },
        { id: 7, component: <LineChart /> },
        { id: 8, component: <PieChart /> },
        { id: 9, component: <PieChart /> },
    ];
    const {
        selectGraph,
        fullScreenGraph,
        selectedGraphId,
        setFullScreenGraph,
    }: any = useContext(GraphContext);

    console.log(fullScreenGraph, selectGraph, selectedGraphId);

    const selectGraphView = () => {
        const selectedGraph = selectedGraphId
            ? graphs.find((graph) => graph.id === selectedGraphId)
            : null;
        return (
            <div className="w-1/2 ">
                {selectedGraph ? selectedGraph.component : null}
            </div>
        );
    };
    //ref
    const handleCloseGraphView = () => {
        setFullScreenGraph(false);
    };
    return (
        <div className="flex flex-wrap justify-center">
            {graphs.map((graph) => (
                <div
                    key={graph.id}
                    onClick={() => selectGraph(graph.id)}
                    className="w-72 h-72 m-1 bg-[#242424]"
                >
                    {graph.component}
                </div>
            ))}
            {fullScreenGraph && (
                <div
                    className="fixed p-10 inset-0 p flex justify-center items-center bg-opacity-75 bg-gray-900"
                    id="selected-graph"
                >
                    {selectGraphView()}
                    <button onClick={handleCloseGraphView}>close</button>
                </div>
            )}
        </div>
    );
};

export default GraphList;
