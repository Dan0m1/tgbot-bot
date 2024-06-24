import {HttpUtil} from "../../src/utils/HttpUtil";
import {AssignData} from "../data/AssignData";
import {User} from "../data/User";

export class AssignAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async create(data: AssignData) {
        await this.httpUtil.configure(data, "POST", "task");
        return await this.httpUtil.request();
    }

    public async getAllAssignedToUser(user: { userId: string | null, username: string | null }){
        console.log(user)
        await this.httpUtil.configure(user, "GET", "users");
        return await this.httpUtil.request();
    }

    public async deleteEntry(entryId: number){
        await this.httpUtil.configure({entryId}, "DELETE", "assign")
        await this.httpUtil.request();
    }
}