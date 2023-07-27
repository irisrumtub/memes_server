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
    const data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],

        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
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

    return <Pie width={50} height={50} data={data} options={options}></Pie>;
};

export default MemePerUser;
