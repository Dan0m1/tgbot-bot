import {Context} from "grammy";
import {MessageUtils} from "../../utils/MessageUtils";
import {User} from "../../../lib/data/User";
import {AssignDataAdapter} from "../../../lib/mapper/AssignDataAdapter";
import {AssignData} from "../../../lib/data/AssignData";
import {AssignAPI} from "../../../lib/api/assignAPI";
import {
    buildUserPayloadFromCtx,
    buildUserPayloadFromUser,
} from "../../utils/BuildUserPayloadUtil";

export class Assign{
    private messageUtils: MessageUtils;
    private assignAdapter: AssignDataAdapter = new AssignDataAdapter();
    private assignApi: AssignAPI;
    private ctx: Context;

    constructor(ctx: Context) {
        this.messageUtils = new MessageUtils(ctx);
        this.assignApi = new AssignAPI();
        this.ctx = ctx;
    }

    public async assignToMembers(){
        const users: User[] = await this.messageUtils.getMentionedUsers();
        if(!users || users.length == 0){
            throw new Error("Відсутні тегнуті користувачі")
        }
        const text: string = await this.messageUtils.getTextWithoutUsernames();
        if(!text){
            throw new Error("Відсутнє завдання")
        }
        const data: AssignData = await this.assignAdapter.buildData(users, text);
        const apiResponse = await this.assignApi.create(data);
        return apiResponse;
    }

    public async assignedToMe(){
        const user = await buildUserPayloadFromCtx(this.ctx)
        const apiResponse = await this.assignApi.getAllAssignedToUser(user);
        if(!apiResponse){
            throw new Error(`Для Вас відсутні завдання`)
        }
        return apiResponse;
    }

    public async checkAssignedToUser(){
        const user: User = (await this.messageUtils.getMentionedUsers())[0];
        if(!user){
            throw new Error(`Відсутні тегнуті користувачі`);
        }
        const payload = await buildUserPayloadFromUser(user)
        const apiResponse = await this.assignApi.getAllAssignedToUser(payload);
        if(!apiResponse){
            throw new Error(`Для користувача відсутні завдання`)
        }
        return apiResponse;
    }

    public async deleteEntry(){
        const entryId = await this.messageUtils.getNumberInText();
        const apiResponse = await this.assignApi.deleteEntry(entryId);
        return apiResponse;
    }
}