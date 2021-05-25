import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const Insurrance = EgretLoadable({
  loader: () => import("./Insurrance")
});
const ViewComponent = withTranslation()(Insurrance);

const InsurranceRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"list/insurrance",
    exact: true,
    component: ViewComponent
  }
];

export default InsurranceRoutes;
