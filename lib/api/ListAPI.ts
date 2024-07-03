import {HttpUtil} from "../../src/utils/HttpUtil";
import {ListApiResponseData} from "../data/apiResponses/ListApiResponseData";
import {CreateListDTO} from "../data/DTOs/CreateListDTO";
import {DeleteListDTO} from "../data/DTOs/DeleteListDTO";

export class ListAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async create(data: CreateListDTO): Promise<ListApiResponseData> {
        await this.httpUtil.configure(data, "POST", "list");
        return this.httpUtil.request();
    }

    public async delete(data: DeleteListDTO): Promise<void> {
        await this.httpUtil.configure(data, "DELETE", "list");
        return this.httpUtil.request();
    }

    public async getAll(): Promise<ListApiResponseData[]>{
        await this.httpUtil.configure({}, "GET", "list");
        return this.httpUtil.request();
    }

    public async getOneByTitle(title: string): Promise<ListApiResponseData> {
        await this.httpUtil.configure({}, "GET", `list/${title}`);
        return this.httpUtil.request();
    }
}