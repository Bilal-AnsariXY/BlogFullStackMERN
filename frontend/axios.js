import axios from "axios";

export const axiosInstance= axios.create(
    {
        baseURL: import.meta.env.MODE === "development" ? "http://localhost:4001/api" : "https://blogfullstackmern.onrender.com/api",
        withCredentials: true , // send cookie with every request 
    }
)