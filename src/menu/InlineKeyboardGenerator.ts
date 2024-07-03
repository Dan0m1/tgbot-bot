import {ListApiResponseData} from "../../lib/data/apiResponses/ListApiResponseData";
import {InlineKeyboard} from "grammy";

export class InlineKeyboardGenerator {
    static async getDisplayListsMenu(lists: ListApiResponseData[]){
        const inline = new InlineKeyboard();
        lists.forEach(list => {
            inline.text(list.title, "list-title="+ list.title).row();
        })
        return inline;
    }

    static async getListCellOperationsMenu(id: number){
        const inline = new InlineKeyboard();
        inline
            .text("Змінити", `listCell-update=${id}`).row()
            .text("Видалити", `listCell-delete=${id}`).row()
        return inline;
    }
}