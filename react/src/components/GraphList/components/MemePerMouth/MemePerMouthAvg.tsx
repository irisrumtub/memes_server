import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { graphService } from "../../../../services/graph.service";
import { options } from "../PieChart/PieChart";
import { GraphContext } from "../../../context";

interface avgMemeDataType {
    label: string;
    avgMemes: number;
}
// fix style
const MemePerMouthAvg: React.FC = ({}) => {
    const [avgMemeData, SetAvgMemeData] = useState<avgMemeDataType[]>([]);
    const { startDate, endDate, memePerMonth }: {} | any =
        useContext(GraphContext);

    useEffect(() => {
        if (memePerMonth) {
            const avgMemeData = memePerMonth.map((item) => ({
                label: item.month,
                avgMemes: item.totalMemes / item.daysInMonth,
            }));
            console.log(avgMemeData);

            SetAvgMemeData(avgMemeData);
        }
    }, [startDate, endDate, memePerMonth]);

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
    };

    const data = {
        labels: avgMemeData.map((item) => item.label),
        datasets: [
            {
                label: "Avg memesPerMouth",
                data: avgMemeData.map((item) =>
                    Number(item.avgMemes).toFixed(1)
                ),
                borderColor: "rgb(80, 99, 133)",
                backgroundColor: "rgb(80, 99, 133)",
            },
        ],
    };
    return <Bar options={options} data={data} />;
};

export default MemePerMouthAvg;
