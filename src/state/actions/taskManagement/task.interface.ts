import dayjs from "dayjs";

export interface IMyTask {
    id: number;
    title: string;
    description: string;
    dueDate: dayjs.Dayjs | string;
    priority: TPriority;
    status: TStatus;
}

export interface IAddMyTask {
    title: string;
    description: string;
    dueDate: dayjs.Dayjs | string;
    priority: TPriority;
    status: TStatus;
}

export type TPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TPriorityAsPayload = 'LOW' | 'MEDIUM' | 'HIGH' | 'ALL';
export type TStatus = 'PENDING' | 'PROGRESS' | 'COMPLETED';
export type TStatusAsPayload = 'PENDING' | 'PROGRESS' | 'COMPLETED' | 'ALL';

export interface IUpdateMyTask extends IAddMyTask {
    id: number;
}

export interface IDashboardCounts {
    all: number,
    pending: number,
    progress: number,
    completed: number
}

export type IMyTaskId = Pick<IMyTask, 'id'>;

export interface IMyTaskPayload {
    searchContent?: string;
    page?: number;
    perPage?: number;
    startDate?: string;
    endDate?: string;
    status?: TStatusAsPayload;
    priority?: TPriorityAsPayload;
}
