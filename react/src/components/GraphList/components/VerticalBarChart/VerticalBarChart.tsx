import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
interface Props {}
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    plugins: {
        legend: {
            position: "left" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

const labels = ["January", "February", "March", "April"];
export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [12222, 2123, 1225, 126, 217, 12222, 12222],
            backgroundColor: "rgb(80,99,133)",
        },
        {
            label: "Dataset 2",
            data: [12222, 21213, 225, 6, 7],
            backgroundColor: "rgb(31,31,34)",
        },
    ],
};
const VerticalBarChart: React.FC<Props> = ({}) => {
    return <Bar options={options} data={data} />;
};

export default VerticalBarChart;
