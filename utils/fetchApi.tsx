import { serverUrl } from "../secret";
import axios from "axios";
export const baseURL = serverUrl;

axios.interceptors.request.use(
    (config) => {
        // let token = JSON.parse(localStorage.getItem("user"))?.token;
        // let token = Cookies.get("token");
        // if (token) {
        //     config.headers.Authorization = token;
        // }
        config.baseURL = baseURL;
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status == 401) {
            // Cookies.remove('token')
            // localStorage.removeItem("user");
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export function post(url: any, data: any, contentType = "application/json") {
    return axios({
        method: "POST",
        url: url,
        data: data,
        headers: {
            "Content-Type": contentType,
        },
    });
}
export function put(url: any, data: any, contentType = "application/json") {
    return axios({
        method: "PUT",
        url: url,
        data: data,
        headers: {
            "Content-Type": contentType,
        },
    });
}
export function get(url: any) {
    return axios({
        method: "GET",
        url: url,
    });
}
export function getWithParams(url: any, params: any) {
    return axios({
        method: "GET",
        url: url,
        params: params,
    });
}
export function del(url: any) {
    return axios({
        method: "DELETE",
        url: url,
    });
}
