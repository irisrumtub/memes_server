import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {}
export const options = {
    plugins: {
        title: {
            display: true,
            text: "Chart",
        },
    },
};
export const data = {
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
const PineChart: React.FC<Props> = ({}) => {
    return <Pie width={50} height={50} data={data}></Pie>;
};

export default PineChart;
