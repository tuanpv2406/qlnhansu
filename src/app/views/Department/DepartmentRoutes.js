import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const Department = EgretLoadable({
  loader: () => import("./Department")
});
const ViewComponent = withTranslation()(Department);

const DepartmentRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"list/department",
    exact: true,
    component: ViewComponent
  }
];

export default DepartmentRoutes;
