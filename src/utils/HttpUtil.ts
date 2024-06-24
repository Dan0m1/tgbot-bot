import axios, {AxiosError, AxiosRequestConfig} from "axios";

export class HttpUtil {
    private options = {
        method: "",
        url: process.env.BACKEND_URL,
        headers: {
            'content-type': 'application/json',
        },
        data: {}
    };

    public async request() {
        try{
            console.log(this.options.url)
            const response = await axios.request(this.options);
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

    public async configure(data: any, method: string, endpoint: string){
        this.options.method = method;
        this.options.url = this.options.url + endpoint;
        if(method == 'POST'){
            this.options.data = data;
        }
        if(method == 'GET'){
            this.options.url = this.options.url + "?";
            for(let key in data){
                // @ts-ignore
                this.options.url = this.options.url + key + "=" + data[key]?.toString() + "&";
            }
            this.options.url = this.options.url.slice(0, this.options.url.length-1);
        }
    }
}