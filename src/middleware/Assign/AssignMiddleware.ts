import {Composer, Context, NextFunction} from "grammy";
import {Assign} from "./Assign";
import {AssignResponse} from "./AssignResponse";
import {MyContext} from "../../bot";

export const assignMiddleware = new Composer<MyContext>()
console.log(assignMiddleware);

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

async function tryExecuteRelatedFunction(ctx: MyContext, fn: (ctx: MyContext, assign: Assign) => Promise<any>){
    const assign = new Assign(ctx);
    try {
        await fn(ctx, assign);
    }catch(err){
        await new AssignResponse(ctx).displayError(err);
    }
}

async function assignTo(ctx: MyContext, assign: Assign) {
    const response = await assign.assignToMembers();
    await new AssignResponse(ctx).successfullyAssigned();
}

async function assignedToMe(ctx: MyContext, assign: Assign){
    const response = await assign.assignedToMe();
    await new AssignResponse(ctx).displayAssignedToUser(response);
}

async function checkAssignedTo(ctx: MyContext, assign: Assign){
    const response = await assign.checkAssignedToUser();
    await new AssignResponse(ctx).displayAssignedToUser(response);
}

async function deleteAssignEntry(ctx: MyContext, assign: Assign){
    const response = await assign.deleteEntry();
    await new AssignResponse(ctx).successfullyDeleted(response);
}

