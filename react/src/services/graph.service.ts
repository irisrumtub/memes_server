import axios from "axios";
const url = "http://localhost:3000";
export const graphService = {
    async getToDate(startDate: string, endDate: string) {
        try {
            const response = await axios.get(`${url}/query/dateMesMem?`, {
                params: {
                    start: startDate,
                    end: endDate,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getUserMeme(startDate: string, endDate: string) {
        try {
            const response = await axios.get(`${url}/query/dailyUserStats?`, {
                params: {
                    start: startDate,
                    end: endDate,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async getVideosAndPics(startDate: string, endDate: string) {
        try {
            const response = await axios.get(`${url}/query/getVideosAndPics?`, {
                params: {
                    start: startDate,
                    end: endDate,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
