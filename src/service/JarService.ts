import {JarAPI} from "../../lib/api/JarAPI";
import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";
import {MyContext} from "../bot";

export class JarService {
    private ctx: MyContext;
    private jarApi: JarAPI;

    constructor(ctx: MyContext){
        this.ctx = ctx;
        this.jarApi = new JarAPI()
    }

    public async getJarInfo(): Promise<JarApiResponseData>{
        const apiResponse: JarApiResponseData = await this.jarApi.getJarInfo();
        if(!apiResponse){
            throw new Error("Дані про банку відсутні!")
        }
        return apiResponse;
    }
}