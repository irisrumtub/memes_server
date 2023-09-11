import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { graphService } from "../../../../services/graph.service";
import { GraphContext } from "../../../context";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {}
const MemePerUser: React.FC<Props> = ({}) => {
    const { startDate, endDate }: {} | any = useContext(GraphContext);
    const [graphData, setGraphData] = useState();
    const [labels, setLabels] = useState<any>([]);
    useEffect(() => {
        async function fetchData() {
            const data = await graphService.getUserMeme(startDate, endDate);
            if (data) {
                setGraphData(data.data.usersObj);
                console.log(graphData);
            }
        }
        fetchData();
    }, []);

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Chart",
            },
        },
    };
    useEffect(() => {
        if (graphData) {
            setLabels(Object.keys(graphData));
        }
    }, [graphData]);
    const data = {
        labels: labels.map((label) => label),

        datasets: [
            {
                label: "memes",
                data: labels.map((label) => graphData[label].memes),
                backgroundColor: [
                    "rgb(241,240,225)",
                    "rgb(80,99,133)",
                    "rgb(31,31,34)",
                    "rgb(245,240,225)",
                    "rgb(85,99,133)",
                    "rgb(35,31,34)",
                    "rgb(245,241,225)",
                    "rgb(85,92,133)",
                    "rgb(35,31,34)",
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

    return <Pie width={50} height={50} data={data} options={options}></Pie>;
};

export default MemePerUser;
