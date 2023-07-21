import React, { useState } from "react";
import DateView from "./components/DateView/DateView";

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [memeCount, setMemeCount] = useState<number>(0);
    const textColor = {
        color: "#282728",
    };
    const handleButtonClick = () => {
        setIsDatePickerOpen((prevState) => !prevState);
    };

    return (
        <div className="w-full h-10 bg-[#0E0E13] flex justify-between items-center p-1">
            <button onClick={handleButtonClick} className="">
                <img
                    src="./src/assets/ic/button.svg"
                    alt="Button"
                    width="20"
                    height="20"
                />
            </button>
            {isDatePickerOpen && (
                <DateView setIsDatePickerOpen={setIsDatePickerOpen} />
            )}
            <div className="text-[#282728]">MemeGraph Statistics</div>
            <div className="text-[#282728]">
                MemeCountFirst:<p>{}</p>
            </div>
            <div className="text-[#282728]">
                MemeCountSecond:<p>{}</p>
            </div>
            <div className="text-[#282728]">
                MemeCountThird:<p>{}</p>
            </div>
            <div className="text-[#282728]">
                Мемов всего:<p className="text-white"> {memeCount}</p>
            </div>
        </div>
    );
};

export default NavBar;
