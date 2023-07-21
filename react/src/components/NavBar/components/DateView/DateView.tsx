import React, { useContext, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { graphService } from "../../../../services/graph.service";
import { GraphContext } from "../../../context";

interface Props {
    setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateView: React.FC<Props> = ({ setIsDatePickerOpen }) => {
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    //req service
    const {
        memeDateDataset,
        setMemeDateDataset,
        memePerDay,
        setMemePerDay,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
    }: any = useContext(GraphContext);
    const { data, isLoading, isError } = useQuery(["card"], () =>
        graphService.getToDate(startDate, endDate)
    );
    if (data) {
        setMemeDateDataset(data.data);
    }
    //ref if startDate,endDate state
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (isError) {
    //     return <div>Error</div>;
    // }
    const handleButtonClick = () => {
        if (startDateRef.current?.value && endDateRef.current?.value) {
            setStartDate(startDateRef.current.value);
            setEndDate(endDateRef.current.value);
            handleCloseDateView();
        }
    };
    console.log(startDate, endDate);

    const handleCloseDateView = () => {
        setIsDatePickerOpen(false);
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-opacity-75 bg-gray-900"
            onClick={handleCloseDateView}
        >
            <div
                className="rounded-lg p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Select Date Range</h2>
                <div className="mb-2">
                    <p className="text-sm">From:</p>
                    <input
                        type="date"
                        ref={startDateRef}
                        className="border rounded p-1 "
                    />
                </div>
                <div>
                    <p className="text-sm">To:</p>
                    <input
                        type="date"
                        ref={endDateRef}
                        className="border rounded p-1"
                    />
                </div>
                <button
                    className="border mt-3 rounded p-2 bg-[#506385] text-white"
                    onClick={handleButtonClick}
                >
                    Submit Date
                </button>
            </div>
        </div>
    );
};

export default DateView;
