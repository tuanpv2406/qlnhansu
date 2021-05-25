import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import UserRoutes from "./views/User/UserRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import ConstantList from "./appConfig";
import MenuRoutes from "./views/Menus/MenuRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";
import DepartmentRoutes from "./views/Department/DepartmentRoutes";
import ActivityRoutes from "./views/Activity/ActivityRoutes";
import InsurranceRoutes from "./views/Insurrance/InsurranceRoutes";
import RecruitmentRoutes from "./views/Recruitment/RecruitmentRoutes";
const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.LOGIN_PAGE} />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  }
];

const routes = [
  ...redirectRoute,
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...pageLayoutRoutes,
  ...UserRoutes,
  ...roleRoutes,
  ...MenuRoutes,
  ...DepartmentRoutes,
  ...ActivityRoutes,
  ...InsurranceRoutes,
  ...RecruitmentRoutes,
  ...errorRoute
];

export default routes;
