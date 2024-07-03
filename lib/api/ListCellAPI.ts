import {HttpUtil} from "../../src/utils/HttpUtil";
import {CreateListCellDTO} from "../data/DTOs/CreateListCellDTO";
import {ListCellSingleApiResponseData} from "../data/apiResponses/ListCellSingleApiResponseData";
import {UpdateListCellDTO} from "../data/DTOs/UpdateListCellDTO";

export class ListCellAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async createCell(data: CreateListCellDTO): Promise<boolean | null>{
        await this.httpUtil.configure(data, "POST", "listCell");
        return this.httpUtil.request();
    }

    public async getById(id: number): Promise<ListCellSingleApiResponseData>{
        await this.httpUtil.configure({}, "GET", `listCell/id/${id}`);
        return this.httpUtil.request();
    }

    public async deleteById(id: number): Promise<boolean | null>{
        await this.httpUtil.configure({}, "DELETE", `listCell/deleteById/${id}`);
        return this.httpUtil.request();
    }

    public async update(data: UpdateListCellDTO): Promise<boolean | null>{
        await this.httpUtil.configure(data, "PUT", "listCell");
        return this.httpUtil.request();
    }
}