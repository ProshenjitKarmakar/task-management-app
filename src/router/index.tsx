import { useRoutes } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import PrivateRoutes from "./PrivateRoutes";

const ThemeRoutes = (): any => {
    return useRoutes([AuthenticationRoutes, PrivateRoutes]);
}

export default ThemeRoutes;
