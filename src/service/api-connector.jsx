import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {

    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null

        });
        return response;
    } catch (error) {
        throw error; // Rethrow the error for further handling if needed }

    }
}
