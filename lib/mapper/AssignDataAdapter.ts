import {AssignData} from "../data/AssignData";
import {User} from "../data/User";

export class AssignDataAdapter {
    public async buildData(users: User[], description: string): Promise<AssignData>{
        return {
            users,
            description
        }
    }
}