import AuthenticationLayout from "../components/layout/AuthLayout/AuthenticationLayout";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/login";
import AssessmentIndex from "../components/assessment/AssessmentIndex";
import TaskLayout from "../components/layout/TaskLayout/TaskLayout";

const PrivateRoutes = {
    path: '/private',
    element: <TaskLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Login />
        },
        {
            path: 'user-list',
            element: <AssessmentIndex />
        },
    ]

}
export default PrivateRoutes;
