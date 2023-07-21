import React from "react";
import NavBar from "../NavBar/NavBar";
import GraphList from "../GraphList/GraphList";

interface Props {}

const Home: React.FC<Props> = ({}) => {
    return (
        <div className="bg-[#0E0E13] p-2">
            <NavBar />
            <GraphList />
        </div>
    );
};

export default Home;
