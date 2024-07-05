import {JarApiResponseData} from "../apiResponses/JarApiResponseData";
import {JarUserApiResponseData} from "../apiResponses/JarUserApiResponseData";
import {ListApiResponseData} from "../apiResponses/ListApiResponseData";
import {ListCellSingleApiResponseData} from "../apiResponses/ListCellSingleApiResponseData";
import {UserWithTasksApiResponseData} from "../apiResponses/UserWithTasksApiResponseData";
import {TaskApiResponseData} from "../apiResponses/TaskApiResponseData";

export type HttpUtilMaybeResponse =
    JarApiResponseData | JarApiResponseData[]
    |
    JarUserApiResponseData | JarUserApiResponseData[]
    |
    ListApiResponseData | ListApiResponseData[]
    |
    ListCellSingleApiResponseData | ListCellSingleApiResponseData[]
    |
    UserWithTasksApiResponseData | UserWithTasksApiResponseData[]
    |
    TaskApiResponseData | TaskApiResponseData[]
    |
    number | boolean | null;