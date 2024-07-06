import {JarUserAPI} from "../../lib/api/JarUserAPI";
import {MessageUtils} from "../utils/MessageUtils";
import {CreateJarUserDTO} from "../../lib/data/DTOs/CreateJarUserDTO";
import {JarUserApiResponseData} from "../../lib/data/apiResponses/JarUserApiResponseData";
import {MyContext} from "../bot";

export class JarUserService {
    constructor(private jarUserApi: JarUserAPI, private messageUtils: MessageUtils) {
    }

    public async create(ctx: MyContext): Promise<JarUserApiResponseData[]> {
        const names: string[] = await this.messageUtils.getNames(ctx);
        if(!names || names.length == 0){
            throw new Error("Неправильний формат вводу імен.\nЗразок: [ім'я ім'я ім'я]")
        }
        const moneyGoal: number = await this.messageUtils.getNumberInText(ctx);
        if(!moneyGoal || moneyGoal < 0){
            throw new Error("Неправильний формат вводу суми. /help_extort")
        }
        const jarUserPayload: CreateJarUserDTO[] = names.map((name):CreateJarUserDTO => {
            return {
                name,
                moneyGoal: moneyGoal*100
            }
        })
        //TODO
        const erroredTries: string[] = [];
        const responses: JarUserApiResponseData[] = [];
        for(const data of jarUserPayload){
            const apiResponse: JarUserApiResponseData = await this.jarUserApi.createJarUser(data);
            if(!apiResponse){
                erroredTries.push(data.name)
            }
        }
        //TODO
        if(erroredTries.length > 0){
            throw new Error("Не вдалось додати:\n"+erroredTries.join("\n"));
        }
        return responses;
    }

    async getAll(): Promise<JarUserApiResponseData[]>{
        const apiResponse: JarUserApiResponseData[] = await this.jarUserApi.getAllJarUsers();
        if(!apiResponse || apiResponse.length === 0){
            return null;
        }
        return apiResponse;
    }

    async update(ctx: MyContext): Promise<void>{
        try {
            const names: string[] = await this.messageUtils.getNames(ctx);
            const moneyGoal: number = await this.messageUtils.getNumberInText(ctx);
            const jarUserPayload: CreateJarUserDTO[] = names.map((name): CreateJarUserDTO => {
                return {
                    name,
                    moneyGoal: moneyGoal * 100
                }
            })
            for(const data of jarUserPayload){
                await this.jarUserApi.updateJarUser(data);
            }
        } catch (error: unknown){
            throw new Error("Помилка формату даних.\nВпевніться, що Ви ввели команду відповідно до вказаного формату /help_extort")
        }
    }
}