import {UserAPI} from "../../lib/api/UserAPI";
import {httpUtil, messageUtils} from "./UtilsInit";
import {TaskAPI} from "../../lib/api/TaskAPI";
import {AssignService} from "../service/AssignService";
import {assignAdapter} from "./MapperInit";
import {AssignResponse} from "../responses/AssignResponse";

const userApi: UserAPI = new UserAPI(httpUtil);
const taskApi: TaskAPI = new TaskAPI(httpUtil);
export const assignService: AssignService = new AssignService(userApi, taskApi, messageUtils, assignAdapter);
export const assignResponse: AssignResponse = new AssignResponse();