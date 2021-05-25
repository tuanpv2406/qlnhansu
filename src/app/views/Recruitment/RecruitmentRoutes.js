import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const Recruitment = EgretLoadable({
  loader: () => import("./Recruitment")
});
const ViewComponent = withTranslation()(Recruitment);

const RecruitmentRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"recruitment",
    exact: true,
    component: ViewComponent
  }
];

export default RecruitmentRoutes;
