import NotFound from "./NotFound";
import { EgretLoadable } from "egret";
import { withTranslation } from 'react-i18next';
import ConstantList from "../../appConfig";

const SignIn = EgretLoadable({
  loader: () => import("./SignIn")
});
const ViewComponentSignIn = withTranslation()(SignIn);

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
  {
    path: ConstantList.ROOT_PATH+"session/signin",
    component: ViewComponentSignIn,
    settings
  },
  {
    path: ConstantList.ROOT_PATH+"session/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
