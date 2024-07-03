import {HttpUtil} from "../../src/utils/HttpUtil";
import {JarApiResponseData} from "../data/apiResponses/JarApiResponseData";

export class JarAPI{
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async getJarInfo() : Promise<JarApiResponseData>{
        await this.httpUtil.configure({}, "GET", "jar");
        return this.httpUtil.request();
    }
}