import AuthenticationLayout from "../components/layout/AuthLayout/AuthenticationLayout";
import {Navigate} from "react-router-dom";
import Login from "../components/auth/Login";
import AssessmentIndex from "../components/assessment/AssessmentIndex";

const AuthenticationRoutes = {
    path: '/public',
    element: <AuthenticationLayout/>,
    children: [
        {
            path: '',
            element: <Navigate to="login" replace={true}/>
        },
        {
            path: 'login',
            element: <Login/>
        },
    ]

}
export default AuthenticationRoutes;
