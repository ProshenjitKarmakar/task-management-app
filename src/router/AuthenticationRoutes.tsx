import AuthenticationLayout from "../components/layout/AuthLayout/AuthenticationLayout";
import {Navigate} from "react-router-dom";
import Login from "../components/auth/Login";
import AssessmentIndex from "../components/assessment/AssessmentIndex";
import Error501 from "../components/errors/Error501";

const AuthenticationRoutes = {
    path: '/',
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
        {
            path: '*',
            element: <Error501/>
        }
    ]

}
export default AuthenticationRoutes;
