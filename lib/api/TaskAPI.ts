import {HttpUtil} from "../../src/utils/HttpUtil";
import {CreateTasksDTO} from "../data/DTOs/CreateTasksDTO";
import {TaskApiResponseData} from "../data/apiResponses/TaskApiResponseData";
import {HttpUtilMaybeResponse} from "../data/custom/HttpUtilMaybeResponse";

export class TaskAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async create(data: CreateTasksDTO): Promise<TaskApiResponseData> {
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "POST", "task");
        if(typeof response === "number"){
            return null;
        }
        return response as TaskApiResponseData;
    }

    public async deleteEntry(entryId: number): Promise<boolean>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({id: entryId}, "DELETE", "task");
        if(typeof response === "number"){
            return null;
        }
        return response as boolean;
    }
}