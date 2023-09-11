import { createContext } from "chart.js/helpers";

export const MemeVideoAndPicsContext = createContext();

export const MemeVideoAndPicsProvider = ({ children }) => {
    return (
        <MemeVideoAndPicsContext.Provider value={}>
            {children}
        </MemeVideoAndPicsContext.Provider>
    );
};
