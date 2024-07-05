import {ListCellAPI} from "../../lib/api/ListCellAPI";
import {ListCellService} from "../service/ListCellService";
import {ListCellResponse} from "../responses/ListCellResponse";
import {httpUtil} from "./UtilsInit";

export const listCellApi: ListCellAPI = new ListCellAPI(httpUtil);
export const listCellService: ListCellService = new ListCellService(listCellApi);
export const listCellResponse: ListCellResponse = new ListCellResponse();