import {Composer, Context, NextFunction} from "grammy";
import {AssignService} from "../service/AssignService";
import {AssignResponse} from "../responses/AssignResponse";
import {MyContext} from "../bot";
import {UserWithTasksApiResponseData} from "../../lib/data/apiResponses/UserWithTasksApiResponseData";

export const assignMiddleware = new Composer<MyContext>()

assignMiddleware.command(
    "assign_to",
    async (ctx: MyContext, next: NextFunction)=> await tryExecuteRelatedFunction(ctx, assignTo)
)
assignMiddleware.command(
    "assigned_to_me",
    async (ctx: MyContext, next: NextFunction)=> await tryExecuteRelatedFunction(ctx, assignedToMe)
)
assignMiddleware.command(
    "check_assigned_to",
    async (ctx: MyContext, next: NextFunction)=> await tryExecuteRelatedFunction(ctx, checkAssignedTo)
)
assignMiddleware.command(
    "delete_assign_entry",
    async (ctx: MyContext, next: NextFunction)=> await tryExecuteRelatedFunction(ctx, deleteAssignEntry)
)

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, assignService: AssignService) => Promise<any>){
    const assignService: AssignService = new AssignService(ctx);
    try {
        await fn(ctx, assignService);
    }catch(err){
        await new AssignResponse(ctx).displayError(err);
    }
}

async function assignTo(ctx: MyContext, assignService: AssignService) {
    const response = await assignService.assignToMembers();
    await new AssignResponse(ctx).successfullyAssigned();
}

async function assignedToMe(ctx: MyContext, assignService: AssignService){
    const response: UserWithTasksApiResponseData = await assignService.assignedToMe();
    await new AssignResponse(ctx).displayAssignedToUser(response);
}

async function checkAssignedTo(ctx: MyContext, assignService: AssignService){
    const response: UserWithTasksApiResponseData = await assignService.checkAssignedToUser();
    await new AssignResponse(ctx).displayAssignedToUser(response);
}

async function deleteAssignEntry(ctx: MyContext, assignService: AssignService){
    const response = await assignService.deleteEntry();
    await new AssignResponse(ctx).successfullyDeleted(response);
}

