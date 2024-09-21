import httpRequest from "../api/httpRequest";
import ResponseInterface from "../interface/response.interface";
import {IUserInfo} from "../state/actions/user/user.interface";


class UserService {
    login(body: IUserInfo) {
        return httpRequest.post<ResponseInterface<IUserInfo>>(process.env.REACT_APP_NODE_API_BASE_URL + '/auth/login', body);
    }
}

export default new UserService();
