import {ListCellAPI} from "../../lib/api/ListCellAPI";
import {InlineKeyboardGenerator} from "../menu/InlineKeyboardGenerator";
import {InlineKeyboard} from "grammy";
import {ListCellSingleApiResponseData} from "../../lib/data/apiResponses/ListCellSingleApiResponseData";

export class ListCellService {
    constructor(private listCellApi: ListCellAPI) {
    }

    async getOneById(id: number): Promise<ListCellSingleApiResponseData>{
        const cell = await this.listCellApi.getById(id);
        if(!cell){
            throw new Error("Не знайдено.");
        }
        return cell;
    }

    async getInlineForListCell(id: number): Promise<InlineKeyboard>{
        return InlineKeyboardGenerator.getListCellOperationsMenu(id);
    }

    async deleteCellById(id: number): Promise<void>{
        const result = await this.listCellApi.deleteById(id);
        if(!result){
            throw new Error("Не вдалось видалити запис.")
        }
    }
}