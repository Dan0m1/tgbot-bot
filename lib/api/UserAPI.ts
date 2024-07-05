import {HttpUtil} from "../../src/utils/HttpUtil";
import {UserWithTasksApiResponseData} from "../data/apiResponses/UserWithTasksApiResponseData";
import {User} from "../data/custom/User";
import {HttpUtilMaybeResponse} from "../data/custom/HttpUtilMaybeResponse";

export class UserAPI {
    constructor(private httpUtil: HttpUtil) {}

    public async getAllAssignedToUser(user: User): Promise<UserWithTasksApiResponseData> {
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(user, "GET", "users");
        if(typeof response === "number"){
            return null;
        }
        return response as UserWithTasksApiResponseData;
    }
}