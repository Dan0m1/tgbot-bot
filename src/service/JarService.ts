import {JarAPI} from "../../lib/api/JarAPI";
import {JarApiResponseData} from "../../lib/data/apiResponses/JarApiResponseData";

export class JarService {
    constructor(private jarApi: JarAPI){
    }

    public async getJarInfo(): Promise<JarApiResponseData>{
        const apiResponse: JarApiResponseData = await this.jarApi.getJarInfo();
        if(!apiResponse){
            throw new Error("Дані про банку відсутні!")
        }
        return apiResponse;
    }
}