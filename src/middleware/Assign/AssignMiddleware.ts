import {Composer, Context, NextFunction} from "grammy";
import {Assign} from "./Assign";
import {AssignResponse} from "./AssignResponse";

export const assignMiddleware = new Composer()

assignMiddleware.command(
    "assign_to",
    async (ctx: Context, next: NextFunction)=> await tryExecuteFunction(ctx, assignTo)
)
assignMiddleware.command(
    "assigned_to_me",
    async (ctx: Context, next: NextFunction)=> await tryExecuteFunction(ctx, assignedToMe)
)
assignMiddleware.command(
    "check_assigned_to",
    async (ctx: Context, next: NextFunction)=> await tryExecuteFunction(ctx, checkAssignedTo)
)
assignMiddleware.command(
    "delete_assign_entry",
    async (ctx: Context, next: NextFunction)=> await tryExecuteFunction(ctx, deleteAssignEntry)
)

async function tryExecuteFunction(ctx: Context, fn: (ctx: Context, assign: Assign) => Promise<any>){
    const assign = new Assign(ctx);
    try {
        await fn(ctx, assign);
    }catch(err){
        await new AssignResponse(ctx).displayError(err);
    }
}

async function assignTo(ctx: Context, assign: Assign) {
    const response = await assign.assignToMembers();
    await new AssignResponse(ctx).successfullyAssigned(response);
}

async function assignedToMe(ctx: Context, assign: Assign){
    const response = await assign.assignedToMe();
    await new AssignResponse(ctx).displayAssignedToUser(response);
}

async function checkAssignedTo(ctx: Context, assign: Assign){
    const response = await assign.checkAssignedToUser();
    await new AssignResponse(ctx).displayAssignedToUser(response);
}

async function deleteAssignEntry(ctx: Context, assign: Assign){
    const response = await assign.deleteEntry();
    await new AssignResponse(ctx).successfullyDeleted(response);
}

