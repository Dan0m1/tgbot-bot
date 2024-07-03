import {HttpUtil} from "../../src/utils/HttpUtil";
import {JarUserApiResponseData} from "../data/apiResponses/JarUserApiResponseData";
import {CreateJarUserDTO} from "../data/DTOs/CreateJarUserDTO";
import {UpdateJarUserDTO} from "../data/DTOs/UpdateJarUserDTO";

export class JarUserAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async createJarUser(data: CreateJarUserDTO) : Promise<JarUserApiResponseData>{
        await this.httpUtil.configure(data, "POST", "jarUser");
        return this.httpUtil.request();
    }

    public async getAllJarUsers(): Promise<JarUserApiResponseData[]>{
        await this.httpUtil.configure({}, "GET", "jarUser");
        return this.httpUtil.request();
    }

    public async updateJarUser(data: UpdateJarUserDTO){
        await this.httpUtil.configure(data, "PUT", "jarUser");
        await this.httpUtil.request();
    }
}