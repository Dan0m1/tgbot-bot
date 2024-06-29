import {HttpUtil} from "../../src/utils/HttpUtil";
import {AssignData} from "../data/AssignData";
import {AssignApiResponseData} from "../data/AssignApiResponseData";

export class AssignAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async create(data: AssignData) {
        await this.httpUtil.configure(data, "POST", "task");
        return await this.httpUtil.request();
    }

    public async getAllAssignedToUser(user: { userId: string | null, username: string | null }): Promise<AssignApiResponseData> {
        await this.httpUtil.configure(user, "GET", "users");
        return await this.httpUtil.request();
    }

    public async deleteEntry(entryId: number){
        await this.httpUtil.configure({id: entryId}, "DELETE", "task")
        await this.httpUtil.request();
    }
}