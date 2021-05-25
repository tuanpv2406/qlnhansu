import axios from "axios";
import ConstantList from "../../appConfig";
import { findUserByUserName } from "../User/UserService";
const API_PATH = ConstantList.API_ENPOINT + "/api/users/getCurrentUser";

export const getCurrentUser = ()=> {
  var url = API_PATH;
  return axios.get(url);
};

export const updateAccount = (id, username) => {
  var url =  ConstantList.API_ENPOINT + "/api/userAccount" + "/" + id + "/" + username;
  return axios.post(url);
}


