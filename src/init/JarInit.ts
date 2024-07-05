import {JarAPI} from "../../lib/api/JarAPI";
import {httpUtil} from "./UtilsInit";
import {JarService} from "../service/JarService";
import {JarResponse} from "../responses/JarResponse";

const jarApi: JarAPI = new JarAPI(httpUtil);
export const jarService: JarService = new JarService(jarApi);
export const jarResponse: JarResponse = new JarResponse();