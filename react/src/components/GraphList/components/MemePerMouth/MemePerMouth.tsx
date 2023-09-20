import React, { useContext, useEffect, useState } from "react";
import { GraphContext } from "../../../context";
import { graphService } from "../../../../services/graph.service";
import { Bar } from "react-chartjs-2";

// ref simple
const MemePerMonth: React.FC = () => {
    const { startDate, endDate }: {} | any = useContext(GraphContext);
    const [graphData, setGraphData] = useState<
        { month: string; totalMemes: number }[]
    >([]);
    useEffect(() => {
        async function fetchData() {
            const data = await graphService.getToDate(startDate, endDate);
            if (data) {
                const monthlyMemesCount = Object.entries(data.data).reduce(
                    (acc, [date, values]) => {
                        const [month, day, year] = date.split("/");
                        const monthLabel = `${month}/${year}`;
                        if (acc[monthLabel]) {
                            acc[monthLabel] += values.memes;
                        } else {
                            acc[monthLabel] = values.memes;
                        }
                        return acc;
                    },
                    {} as { [month: string]: number }
                );

                const result = Object.entries(monthlyMemesCount).map(
                    ([month, totalMemes]) => ({ month, totalMemes })
                );
                console.log(result);
                // mb mouth state for avg counter in mouthAvg
                setGraphData(result);
            }
        }
        fetchData();
    }, [startDate, endDate]);

    const labels = graphData.map((item) => item.month);

    const data = {
        labels,
        datasets: [
            {
                label: "Total Memes",
                data: graphData.map((item) => item.totalMemes),
                backgroundColor: "rgb(80,99,133)",
            },
        ],
    };

    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Total Memes by Month",
            },
        },
        maintainAspectRatio: false,
    };

    return <Bar options={options} data={data} />;
};

export default MemePerMonth;
