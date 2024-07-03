import {CreateTasksDTO} from "../data/DTOs/CreateTasksDTO";
import {User} from "../data/custom/User";

export class AssignDataAdapter {
    public async buildData(users: User[], description: string): Promise<CreateTasksDTO>{
        return {
            users,
            description
        }
    }
}