import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
interface Props {}
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [300, 400, 600, 800, 500, 300, 200],
            borderColor: "rgb(241,240,225)",
            backgroundColor: "rgb(241,240,225)",
        },
        {
            label: "Dataset 2",
            data: [200, 100, 100, 800, 500, 300, 200],
            borderColor: "rgb(80,99,133)",
            backgroundColor: "rgb(80,99,133)",
        },
    ],
};

const LineChart: React.FC<Props> = ({}) => {
    return <Line options={options} data={data} />;
};

export default LineChart;
