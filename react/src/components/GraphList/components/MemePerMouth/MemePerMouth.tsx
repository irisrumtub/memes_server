import React, { useContext, useEffect, useState } from "react";
import { GraphContext } from "../../../context";
import { graphService } from "../../../../services/graph.service";
import { Bar } from "react-chartjs-2";

// ref simple
const MemePerMonth: React.FC = () => {
    const { startDate, endDate, memePerMonth, setMemePerMonth }: {} | any =
        useContext(GraphContext);

    useEffect(() => {
        async function fetchData() {
            const data = await graphService.getToDate(startDate, endDate);
            if (data) {
                const monthlyMemesCount = Object.entries(data.data).reduce(
                    (acc, [date, values]) => {
                        const [month, day, year] = date.split("/");
                        const monthLabel = `${month}/${year}`;
                        if (acc[monthLabel]) {
                            acc[monthLabel].totalMemes += values.memes;
                        } else {
                            const lastDayOfMonth = new Date(
                                +year,
                                +month,
                                0
                            ).getDate();
                            acc[monthLabel] = {
                                totalMemes: values.memes,
                                daysInMonth: lastDayOfMonth,
                            };
                        }
                        return acc;
                    },
                    {} as {
                        [month: string]: {
                            totalMemes: number;
                            daysInMonth: number;
                        };
                    }
                );

                const result = Object.entries(monthlyMemesCount).map(
                    ([month, { totalMemes, daysInMonth }]) => ({
                        month,
                        totalMemes,
                        daysInMonth,
                    })
                );
                console.log(result);
                setMemePerMonth(result);
            }
        }

        fetchData();
    }, [startDate, endDate]);

    const labels = memePerMonth.map((item) => item.month);

    const data = {
        labels,
        datasets: [
            {
                label: "Total Memes",
                data: memePerMonth.map((item) => item.totalMemes),
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
