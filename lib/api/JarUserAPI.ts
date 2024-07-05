import {HttpUtil} from "../../src/utils/HttpUtil";
import {JarUserApiResponseData} from "../data/apiResponses/JarUserApiResponseData";
import {CreateJarUserDTO} from "../data/DTOs/CreateJarUserDTO";
import {UpdateJarUserDTO} from "../data/DTOs/UpdateJarUserDTO";
import {HttpUtilMaybeResponse} from "../data/custom/HttpUtilMaybeResponse";

export class JarUserAPI {
    constructor(private httpUtil: HttpUtil) {}

    public async createJarUser(data: CreateJarUserDTO) : Promise<JarUserApiResponseData>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "POST", "jarUser");
        if(typeof response === "number"){
            return null;
        }
        return response as JarUserApiResponseData;
    }

    public async getAllJarUsers(): Promise<JarUserApiResponseData[]>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({}, "GET", "jarUser");
        if(typeof response === "number"){
            return null;
        }
        return response as JarUserApiResponseData[];
    }

    public async updateJarUser(data: UpdateJarUserDTO): Promise<void>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "PUT", "jarUser");
    }
}