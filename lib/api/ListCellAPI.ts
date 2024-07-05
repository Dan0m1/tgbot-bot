import {HttpUtil} from "../../src/utils/HttpUtil";
import {CreateListCellDTO} from "../data/DTOs/CreateListCellDTO";
import {ListCellSingleApiResponseData} from "../data/apiResponses/ListCellSingleApiResponseData";
import {UpdateListCellDTO} from "../data/DTOs/UpdateListCellDTO";
import {HttpUtilMaybeResponse} from "../data/custom/HttpUtilMaybeResponse";

export class ListCellAPI {
    constructor(private httpUtil: HttpUtil) {}

    public async createCell(data: CreateListCellDTO): Promise<boolean>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "POST", "listCell");
        if(typeof response === "number"){
            return null;
        }
        return response as boolean;
    }

    public async getById(id: number): Promise<ListCellSingleApiResponseData>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({}, "GET", `listCell/id/${id}`);
        if(typeof response === "number"){
            return null;
        }
        return response as ListCellSingleApiResponseData;
    }

    public async deleteById(id: number): Promise<boolean>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request({}, "DELETE", `listCell/deleteById/${id}`);
        if(typeof response === "number"){
            return null;
        }
        return response as boolean;
    }

    public async update(data: UpdateListCellDTO): Promise<boolean>{
        const response: HttpUtilMaybeResponse = await this.httpUtil.request(data, "PUT", "listCell");
        if(typeof response === "number"){
            return null;
        }
        return response as boolean;
    }
}