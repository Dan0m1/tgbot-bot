import {JarUserAPI} from "../../lib/api/JarUserAPI";
import {httpUtil, messageUtils} from "./UtilsInit";
import {JarUserService} from "../service/JarUserService";
import {JarUserResponse} from "../responses/JarUserResponse";

const jarUserApi: JarUserAPI = new JarUserAPI(httpUtil);
export const jarUserService: JarUserService = new JarUserService(jarUserApi, messageUtils);
export const jarUserResponse: JarUserResponse = new JarUserResponse();