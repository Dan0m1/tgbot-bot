import {MessageUtils} from "../utils/MessageUtils";
import {User} from "../../lib/data/custom/User";
import {AssignDataAdapter} from "../../lib/mapper/AssignDataAdapter";
import {CreateTasksDTO} from "../../lib/data/DTOs/CreateTasksDTO";
import {TaskAPI} from "../../lib/api/TaskAPI";
import {UserAPI} from "../../lib/api/UserAPI";
import {
    buildUserPayloadFromCtx,
    buildUserPayloadFromUser,
} from "../utils/BuildUserPayloadUtil";
import {MyContext} from "../bot";
import {TaskApiResponseData} from "../../lib/data/apiResponses/TaskApiResponseData";
import {UserWithTasksApiResponseData} from "../../lib/data/apiResponses/UserWithTasksApiResponseData";

export class AssignService {
    constructor(private userApi: UserAPI, private taskApi: TaskAPI,
                private messageUtils: MessageUtils, private assignAdapter: AssignDataAdapter) {
    }

    public async assignToMembers(ctx: MyContext): Promise<TaskApiResponseData> {
        const users: User[] = await this.messageUtils.getMentionedUsers(ctx);
        if(!users || users.length == 0){
            throw new Error("Відсутні тегнуті користувачі")
        }
        const text: string = await this.messageUtils.getTextWithoutUsernames(ctx);
        if(!text){
            throw new Error("Відсутнє завдання")
        }
        const data: CreateTasksDTO = await this.assignAdapter.buildData(users, text);
        return this.taskApi.create(data);
    }

    public async assignedToMe(ctx: MyContext){
        const user: User = await buildUserPayloadFromCtx(ctx)
        const apiResponse: UserWithTasksApiResponseData = await this.userApi.getAllAssignedToUser(user);
        if(!apiResponse || apiResponse.tasks.length == 0){
            throw new Error(`Для Вас відсутні завдання`)
        }
        return apiResponse;
    }

    public async checkAssignedToUser(ctx: MyContext){
        const user: User = (await this.messageUtils.getMentionedUsers(ctx))[0];
        if(!user){
            throw new Error(`Відсутні тегнуті користувачі`);
        }
        const payload: User = await buildUserPayloadFromUser(user)
        const apiResponse: UserWithTasksApiResponseData = await this.userApi.getAllAssignedToUser(payload);
        if(!apiResponse || apiResponse.tasks.length == 0){
            throw new Error(`Для користувача відсутні завдання`)
        }
        return apiResponse;
    }

    public async deleteEntry(ctx: MyContext){
        const user: User = (await this.messageUtils.getMentionedUsers(ctx))[0];
        const entryId: number = await this.messageUtils.getNumberInText(ctx);
        if(!user){
            throw new Error(`Відсутні тегнуті користувачі`);
        }
        const payload: User = await buildUserPayloadFromUser(user)
        const apiResponse: UserWithTasksApiResponseData = await this.userApi.getAllAssignedToUser(payload)

        if(!apiResponse || apiResponse.tasks.length == 0){
            throw new Error(`Для користувача відсутні завдання`)
        }
        const targetTask: TaskApiResponseData = apiResponse.tasks.find((task, index) => index === entryId-1);
        await this.taskApi.deleteEntry(targetTask.id);
    }
}