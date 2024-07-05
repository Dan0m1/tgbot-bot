import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {HttpUtilMaybeResponse} from "../../lib/data/custom/HttpUtilMaybeResponse";

export class HttpUtil {
    public async request(data: any, method: string, endpoint: string): Promise<HttpUtilMaybeResponse>{
        try{
            const options: AxiosRequestConfig = await this.configure(data, method, endpoint);
            const response: AxiosResponse = await axios.request(options);
            return response.data;
        }
        catch (error: any) {
            if(error instanceof AxiosError){
                if(error.response.status === 404){
                    return (404);
                }
                if(error.response.status === 400){
                    return (400);
                }
            }
        }
    }

    private async configure(data: any, method: string, endpoint: string): Promise<AxiosRequestConfig> {
        const options: AxiosRequestConfig = await this.getBlankOptions()
        options.method = method;
        options.url = options.url + endpoint;
        if(method == 'POST' || method == 'PUT' || method == 'DELETE'){
            options.data = data;
        }
        if(method == 'GET'){
            options.url = options.url + "?";
            for(let key in data){
                options.url = options.url + key + "=" + data[key]?.toString() + "&";
            }
            options.url = options.url.slice(0, options.url.length-1);
        }
        return options;
    }

    private async getBlankOptions(): Promise<AxiosRequestConfig>{
        return  {
            method: "",
            url: process.env.BACKEND_URL,
            headers: {
                'content-type': 'application/json',
            },
            data: {}
        };
    }
}