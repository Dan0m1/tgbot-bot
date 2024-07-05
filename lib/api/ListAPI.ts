import {HttpUtil} from "../../src/utils/HttpUtil";
import {ListApiResponseData} from "../data/apiResponses/ListApiResponseData";
import {CreateListDTO} from "../data/DTOs/CreateListDTO";
import {DeleteListDTO} from "../data/DTOs/DeleteListDTO";
import {HttpUtilMaybeResponse} from "../data/custom/HttpUtilMaybeResponse";

export class ListAPI {
    constructor(private httpUtil: HttpUtil) {}

    public async create(data: CreateListDTO): Promise<ListApiResponseData> {
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "POST", "list");
        if(typeof response === "number"){
            return null;
        }
        return response as ListApiResponseData;
    }

    public async delete(data: DeleteListDTO): Promise<void> {
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "DELETE", "list");
    }

    public async getAll(): Promise<ListApiResponseData[]>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({}, "GET", "list");
        if(typeof response === "number"){
            return null;
        }
        return response as ListApiResponseData[];
    }

    public async getOneByTitle(title: string): Promise<ListApiResponseData> {
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({}, "GET", `list/${title}`);
        if(typeof response === "number"){
            return null;
        }
        return response as ListApiResponseData;
    }
}