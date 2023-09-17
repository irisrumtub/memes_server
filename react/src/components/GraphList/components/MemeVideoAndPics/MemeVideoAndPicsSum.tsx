import React, { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { graphService } from "../../../../services/graph.service";
import { GraphContext } from "../../../context";
interface Label {
    videos: number;
    pics: number;
}
interface GraphData {
    total: {};
    usersObj: {};
}
const MemeVideoAndPicsSum: React.FC = ({}) => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [label, setLabel] = useState<Label | null>(null);
    const { startDate, endDate }: {} | any = useContext(GraphContext);

    const data = {
        labels: ["Видево", "Картиночки"],

        datasets: [
            {
                label: "# of Votes",
                data: [label ? label.videos : 0, label ? label.pics : 0],
                backgroundColor: [
                    "rgb(241,240,225)",
                    "rgb(80,99,133)",
                    "rgb(31,31,34)",
                ],
                borderColor: [
                    "rgb(241,240,225)",
                    "rgb(80,99,133)",
                    "rgb(31,31,34)",
                ],
                borderWidth: 1,
            },
        ],
    };
    useEffect(() => {
        if (graphData) {
            setLabel(graphData?.total);
            console.log(graphData);
        }
    }, [graphData]);

    useEffect(() => {
        async function fetchData() {
            const data = await graphService.getVideosAndPics(
                startDate,
                endDate
            );
            if (data) {
                setGraphData(data.data);
            }
        }
        fetchData();
    }, []);
    return <Pie width={50} height={50} data={data}></Pie>;
};

export default MemeVideoAndPicsSum;
