import {ListApiResponseData} from "../../lib/data/apiResponses/ListApiResponseData";
import {ListAPI} from "../../lib/api/ListAPI";
import {InlineKeyboard} from "grammy";
import {InlineKeyboardGenerator} from "../menu/InlineKeyboardGenerator";
import {CreateListDTO} from "../../lib/data/DTOs/CreateListDTO";
import {DeleteListDTO} from "../../lib/data/DTOs/DeleteListDTO";

export class ListService {
    constructor(private listApi: ListAPI) {
    }

    async addNew(data: CreateListDTO): Promise<void> {
        if (!/[a-zA-Z0-9]+/.test(data.title)){
            throw new Error("Назва списку обов'язково повинна складатись лише з латинських літер.")
        }
        const list = await this.listApi.create(data);
        if(!list){
            throw new Error("Помилка створення списку.")
        }
    }

    async delete(data: DeleteListDTO): Promise<void> {
       await this.listApi.delete(data);
    }

    async getListsInline(): Promise<InlineKeyboard>{
        const lists = await this.listApi.getAll();
        if(!lists || lists.length == 0){
            throw new Error("Списки відсутні.")
        }
        return await InlineKeyboardGenerator.getDisplayListsMenu(lists);
    }

    async getListByTitle(title: string): Promise<ListApiResponseData>{
        const list = await this.listApi.getOneByTitle(title);
        if (!list){
            throw new Error("Виникла помилка.")
        }
        return list;
    }
}