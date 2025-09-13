import axios from "axios"

class axiosService {
    constructor(baseURL) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 5000
        })
    }

    
    async getApiData(url) {
        try {
            const res = await this.axiosInstance.get(url)
            return res.data
        } catch (error) {
            console.log("getApiData error:", error)
        }
    }


    async PostNewData(url, payload) {
        try {
            const res = await this.axiosInstance.post(url, payload, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (error) {
            console.log("PostNewData error:", error);
        }
    }


    async DeleteData(url) {
        try {
            const res = await this.axiosInstance.delete(url);
            return res.data;
        } catch (error) {
            console.log("DeleteData error:", error);
        }
    }


    async UpdateData(url, payload) {
        try {
            const res = await this.axiosInstance.patch(url, payload, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        } catch (error) {
            console.log("UpdateData error:", error);
        }
    }
}



export default axiosService;
