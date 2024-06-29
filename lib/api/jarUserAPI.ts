import {HttpUtil} from "../../src/utils/HttpUtil";
import {JarUserApiResponseData} from "../data/JarUserApiResponseData";
import {JarUserCreateData} from "../data/JarUserCreateData";
import {JarUserUpdateData} from "../data/JarUserUpdateData";

export class JarUserAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async createJarUser(data: JarUserCreateData) : Promise<JarUserApiResponseData>{
        await this.httpUtil.configure(data, "POST", "jarUser");
        return this.httpUtil.request();
    }

    public async getAllJarUsers(): Promise<JarUserApiResponseData[]>{
        await this.httpUtil.configure({}, "GET", "jarUser");
        return this.httpUtil.request();
    }

    public async updateJarUser(data: JarUserUpdateData){
        await this.httpUtil.configure(data, "PUT", "jarUser");
        await this.httpUtil.request();
    }
}