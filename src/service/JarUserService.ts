import {JarUserAPI} from "../../lib/api/JarUserAPI";
import {MessageUtils} from "../utils/MessageUtils";
import {CreateJarUserDTO} from "../../lib/data/DTOs/CreateJarUserDTO";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {MyContext} from "../bot";

export class JarUserService {
    private jarUserApi: JarUserAPI;
    private ctx: MyContext;
    private messageUtils: MessageUtils;

    constructor(ctx: MyContext) {
        this.jarUserApi = new JarUserAPI();
        this.ctx = ctx;
        this.messageUtils = new MessageUtils(ctx);
    }

    public async create() {
        const names = await this.messageUtils.getNames();
        if(!names || names.length == 0){
            throw new Error("Неправильний формат вводу імен.\nЗразок: [ім'я ім'я ім'я]")
        }
        const moneyGoal = await this.messageUtils.getNumberInText();
        const jarUserPayload: CreateJarUserDTO[] = names.map((name):CreateJarUserDTO => {
            return {
                name,
                moneyGoal: moneyGoal*100
            }
        })

        const erroredTries: string[] = [];
        const responses: JarUserApiResponseData[] = [];
        for(const data of jarUserPayload){
            const apiResponse = await this.jarUserApi.createJarUser(data);
            if(!apiResponse){
                erroredTries.push(data.name)
            }
        }

        if(erroredTries.length > 0){
            throw new Error("Не вдалось додати:\n"+erroredTries.join("\n"));
        }
        return responses;
    }

    async getAll(){
        const apiResponse: JarUserApiResponseData[] = await this.jarUserApi.getAllJarUsers();
        if(!apiResponse || apiResponse.length === 0){
        return null;
        }
        return apiResponse;
    }

    async update(){
        const names = await this.messageUtils.getNames();
        const moneyGoal = await this.messageUtils.getNumberInText();
        const jarUserPayload: CreateJarUserDTO[] = names.map((name):CreateJarUserDTO => {
            return {
                name,
                moneyGoal: moneyGoal*100
            }
        })

        for(const data of jarUserPayload){
            await this.jarUserApi.updateJarUser(data);
        }
    }
}