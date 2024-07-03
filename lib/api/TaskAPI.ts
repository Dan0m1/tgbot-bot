import {HttpUtil} from "../../src/utils/HttpUtil";
import {CreateTasksDTO} from "../data/DTOs/CreateTasksDTO";

export class TaskAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async create(data: CreateTasksDTO) {
        await this.httpUtil.configure(data, "POST", "task");
        return await this.httpUtil.request();
    }

    public async deleteEntry(entryId: number){
        await this.httpUtil.configure({id: entryId}, "DELETE", "task")
        await this.httpUtil.request();
    }
}