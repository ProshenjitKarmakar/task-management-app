import httpRequest from "../api/httpRequest";
import ResponseInterface from "../interface/response.interface";
import {IAddMyTask, IMyTaskId, IMyTaskPayload, IUpdateMyTask} from "../state/actions/taskManagement/task.interface";


class MyTaskService {
    list(body: IMyTaskPayload) {
        return httpRequest.get<ResponseInterface<IMyTaskPayload>>(process.env.REACT_APP_NODE_API_BASE_URL + '/task/list', body);
    }

    add(params: IAddMyTask) {
        return httpRequest.post<ResponseInterface<IAddMyTask>>(process.env.REACT_APP_NODE_API_BASE_URL + '/task/add', params);
    }

    update(params: IUpdateMyTask) {
        return httpRequest.put<ResponseInterface<IUpdateMyTask>>(process.env.REACT_APP_NODE_API_BASE_URL + '/task/update', params);
    }

    delete(params: IMyTaskId) {
        return httpRequest.delete<ResponseInterface<IMyTaskId>>(process.env.REACT_APP_NODE_API_BASE_URL + '/task/delete', params);
    }
}

export default new MyTaskService();
