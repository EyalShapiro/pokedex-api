import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://pokeapi.co/api/v2";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 100000, //100s=100000ms = 1000ms *100ms
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			// const message = error.response?.data?.message || error?.message || "An error occurred";
			if (isAxiosError(error)) toast.error(`API Error: ${error.response?.data?.message}`);
			else if (error instanceof Error) toast.error(`API Error: ${error?.message}`);
		}

		return Promise.reject(error);
	}
);
export default axiosInstance;
