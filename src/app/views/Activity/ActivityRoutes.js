import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const Activity = EgretLoadable({
  loader: () => import("./Activity")
});
const ViewComponent = withTranslation()(Activity);

const ActivityRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"direction/activity",
    exact: true,
    component: ViewComponent
  }
];

export default ActivityRoutes;
