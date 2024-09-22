import TaskLayout from "../components/layout/TaskLayout/TaskLayout";
import Dashboard from "../components/dashboard/Dashboard";
import TaskManagement from "../components/task-management/TaskManagement";
import Error501 from "../components/errors/Error501";
import {Suspense} from "react";

const PrivateRoutes = {
    path: '/private',
    element: <TaskLayout/>,
    children: [
        {
            path: 'dashboard',
            element: (
                <Suspense>
                    <Dashboard/>
                </Suspense>
            )
        },
        {
            path: 'tasks',
            element: (
                <Suspense>
                    <TaskManagement/>
                </Suspense>
            )
        },
        {
            path: '*',
            element: (
                <Suspense>
                    <Error501/>
                </Suspense>
            )
        }
    ]

}
export default PrivateRoutes;
