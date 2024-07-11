export class ListApiResponseData {
    title: string;
    cells: {
        id: number;
        item: string;
        description?: string;
        isDone?: boolean;
        assignee?: string;
    }[]
}