import {HttpUtil} from "../../src/utils/HttpUtil";
import {JarApiResponseData} from "../data/apiResponses/JarApiResponseData";
import {HttpUtilMaybeResponse} from "../data/custom/HttpUtilMaybeResponse";

export class JarAPI{
    constructor(private httpUtil: HttpUtil) {}

    public async getJarInfo() : Promise<JarApiResponseData>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({}, "GET", "jar");
        if(typeof response === "number"){
            return null;
        }
        return response as JarApiResponseData;
    }
}