import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { graphService } from "../../../../services/graph.service";
import { options } from "../PieChart/PieChart";
import { GraphContext } from "../../../context";

interface Props {}

const MemePerMouthAvg: React.FC<Props> = ({}) => {
    const [graphData, setGraphData] = useState("");
    const { startDate, endDate }: {} | any = useContext(GraphContext);

    useEffect(() => {
        async function fetchData() {
            const data = await graphService.getToDate(startDate, endDate);
            if (data) {
                console.log(data.data);

                setGraphData(data.data);
            }
        }
        fetchData();
    }, [startDate, endDate]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Graph1",
            },
        },
        maintainAspectRatio: false,
    };

    const data = {
        labels: "test",
        datasets: [
            {
                label: "Сообщения",
                data: "test",
                borderColor: "rgb(80, 99, 133)",
                backgroundColor: "rgb(80, 99, 133)",
            },
        ],
    };
    return <Bar options={options} data={data} />;
};

export default MemePerMouthAvg;
