import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import Error501 from "../components/errors/Error501";

const AuthenticationLayout = lazy(() => import('../components/layout/AuthLayout/AuthenticationLayout'));
const Login = lazy(() => import('../components/auth/Login'));

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
            element: (
                <Suspense>
                    <Login/>
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
export default AuthenticationRoutes;
