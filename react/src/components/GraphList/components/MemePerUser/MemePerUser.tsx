import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
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
            }
        }
        fetchData();
    }, []);
    const generateDynamicColors = React.useMemo(() => {
        const dynamicColors = [];
        for (let i = 0; i < labels.length; i++) {
            const hue = (i * (360 / labels.length)) % 360;
            dynamicColors.push(`hsl(${hue}, 50%, 60%)`);
        }
        return dynamicColors;
    }, [labels]);
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
                backgroundColor: generateDynamicColors,
                borderColor: generateDynamicColors,
                borderWidth: 1,
            },
        ],
    };

    return <Pie width={50} height={50} data={data} options={options}></Pie>;
};

export default MemePerUser;
