import AuthenticationLayout from "../components/layout/AuthLayout/AuthenticationLayout";
import {Navigate} from "react-router-dom";
import Login from "../components/auth/Login";
import AssessmentIndex from "../components/assessment/AssessmentIndex";
import TaskLayout from "../components/layout/TaskLayout/TaskLayout";
import Dashboard from "../components/dashboard/Dashboard";
import TaskManagement from "../components/task-management/TaskManagement";

const PrivateRoutes = {
    path: '/private',
    element: <TaskLayout/>,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard/>
        },
        {
            path: 'tasks',
            element: <TaskManagement/>
        },
    ]

}
export default PrivateRoutes;
