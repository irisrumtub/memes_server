import React, { useContext } from "react";
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

interface Props {
    dataset: any;
}

const MemePerDay: React.FC<Props> = ({ dataset }) => {
    // Register the necessary components
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

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

    if (dataset && dataset.labels) {
        const data = {
            labels: dataset.labels,
            datasets: [
                {
                    label: "Мемесы",
                    data: dataset.memesArr,
                    borderColor: "rgb(241, 240, 225)",
                    backgroundColor: "rgb(241, 240, 225)",
                },
                {
                    label: "Сообщения",
                    data: dataset.messagesArr,
                    borderColor: "rgb(80, 99, 133)",
                    backgroundColor: "rgb(80, 99, 133)",
                },
            ],
        };

        return <Line options={options} data={data} />;
    }
};

export default MemePerDay;
