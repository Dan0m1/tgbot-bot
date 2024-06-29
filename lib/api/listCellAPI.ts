import {HttpUtil} from "../../src/utils/HttpUtil";
import {ListApiResponseData} from "../data/ListApiResponseData";
import {ListCellCreateData} from "../data/ListCellCreateData";

export class ListCellAPI {
    constructor(private httpUtil: HttpUtil = new HttpUtil()) {}

    public async createCell(data: ListCellCreateData): Promise<ListApiResponseData[]>{
        await this.httpUtil.configure(data, "POST", "listCell");
        return this.httpUtil.request();
    }
}