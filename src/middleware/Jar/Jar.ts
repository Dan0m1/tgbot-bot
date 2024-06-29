import {JarAPI} from "../../../lib/api/jarAPI";
import {JarApiResponseData} from "../../../lib/data/JarApiResponseData";
import {MyContext} from "../../bot";

export class Jar{
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