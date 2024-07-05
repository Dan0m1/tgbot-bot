import {ListService} from "../service/ListService";
import {ListAPI} from "../../lib/api/ListAPI";
import {ListResponse} from "../responses/ListResponse";
import {httpUtil} from "./UtilsInit";

const listApi: ListAPI = new ListAPI(httpUtil);
export const listService: ListService = new ListService(listApi);
export const listResponse: ListResponse = new ListResponse();