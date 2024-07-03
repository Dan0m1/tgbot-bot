export class UserWithTasksApiResponseData {
    id: number ;
    userId: string;
    username: string;
    name: string;
    tasks: {
        id: number;
        description: string;
    }[]
}