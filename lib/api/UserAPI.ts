import {HttpUtil} from "../../src/utils/HttpUtil";
import {UserWithTasksApiResponseData} from "../data/apiResponses/UserWithTasksApiResponseData";

export class UserAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async getAllAssignedToUser(user: { userId: string | null, username: string | null }): Promise<UserWithTasksApiResponseData> {
        await this.httpUtil.configure(user, "GET", "users");
        return await this.httpUtil.request();
    }
}