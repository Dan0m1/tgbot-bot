import {Composer, NextFunction} from "grammy";
import {MyContext} from "../bot";
import {UserWithTasksApiResponseData} from "../../lib/data/apiResponses/UserWithTasksApiResponseData";
import {assignResponse, assignService} from "../init/AssignInit";

export const assignMiddleware: Composer<MyContext> = new Composer<MyContext>()

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

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext) => Promise<void>): Promise<void> {
    try {
        await fn(ctx);
    }catch(err){
        await assignResponse.displayError(ctx, err);
    }
}

async function assignTo(ctx: MyContext): Promise<void>{
    await assignService.assignToMembers(ctx);
    await assignResponse.successfullyCreated(ctx);
}

async function assignedToMe(ctx: MyContext): Promise<void>{
    const response: UserWithTasksApiResponseData = await assignService.assignedToMe(ctx);
    await assignResponse.displayAssignedToUser(ctx, response);
}

async function checkAssignedTo(ctx: MyContext): Promise<void>{
    const response: UserWithTasksApiResponseData = await assignService.checkAssignedToUser(ctx);
    await assignResponse.displayAssignedToUser(ctx, response);
}

async function deleteAssignEntry(ctx: MyContext): Promise<void>{
    const response = await assignService.deleteEntry(ctx);
    await assignResponse.successfullyDeleted(ctx, response);
}

