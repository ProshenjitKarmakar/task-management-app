import httpRequest from "../api/httpRequest";
import ResponseInterface from "../interface/response.interface";
import { IAddMyTask, IMyTaskId, IMyTaskPayload, IUpdateMyTask } from "../state/actions/taskManagement/task.interface";


class MyTaskService {
    list(params: IMyTaskPayload) {
        return httpRequest.get<ResponseInterface<string>>(process.env.VITE_SETTINGS_APP + 'invoice-builder/folder/list', params);
    }

    add(params: IAddMyTask) {
        return httpRequest.put<ResponseInterface<string>>(process.env.VITE_SETTINGS_APP + 'invoice-builder/folder/list', params);
    }

    update(params: IUpdateMyTask) {
        return httpRequest.put<ResponseInterface<string>>(process.env.VITE_SETTINGS_APP + 'invoice-builder/folder/list', params);
    }

    delete(params: IMyTaskId) {
        return httpRequest.put<ResponseInterface<string>>(process.env.VITE_SETTINGS_APP + 'invoice-builder/folder/list', params);
    }
}

export default new MyTaskService();
