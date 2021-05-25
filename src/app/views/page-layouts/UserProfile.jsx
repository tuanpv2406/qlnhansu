import React, { Component, Fragment } from "react";
import UploadForm from "./UploadForm";
import ConstantList from "../../appConfig";
import {
  Card,
  Icon,
  Avatar,
  Grid,
  Select,
  FormControl,
  Divider,
  IconButton,
  Button,
  withStyles,
  InputLabel,
  TextField
} from "@material-ui/core";
import DummyChart from "./DummyChart";
import ProfileBarChart from "./ProfileBarChart";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import localStorageService from "../../services/localStorageService";
import { useTranslation, withTranslation, Trans, t } from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';
import { getCurrentUser, updateAccount } from './UserProfileService';
import UploadCropImagePopup from "./UploadCropImagePopup";
import ChangePasswordDiaglog from "./ChangePasswordPopup";
import authService from "../../services/jwtAuthService";
import { saveUser } from "../User/UserService";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const API_PATH = ConstantList.API_ENPOINT + "/api/fileUpload/";
class UserProfile extends Component {
  state = { open: true, user: {}, shouldOpenImageDialog: false, shouldOpenPasswordDialog: false };
  windowResizeListener;

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleWindowResize = () => {
    return event => {
      if (event.target.innerWidth < 768) {
        this.setState({ mobile: true });
      } else this.setState({ mobile: false });
    };
  };

  componentDidMount() {
    getCurrentUser().then(({ data }) => {
      this.setState({ user: data });
    });
    //let user = localStorageService.getLoginUser();
    if (window.innerWidth < 768) {
      this.setState({ open: false });
    }
    if (window)
      this.windowResizeListener = window.addEventListener("resize", event => {
        if (event.target.innerWidth < 768) {
          this.setState({ open: false });
        } else this.setState({ open: true });
      });
  }

  componentWillUnmount() {
    let user = localStorageService.getLoginUser();
    getCurrentUser();
    this.setState({ user: user });
    if (window) window.removeEventListener("resize", this.windowResizeListener);
  }
  handleOpenUploadDialog = () => {
    this.setState({
      shouldOpenImageDialog: true
    });
  }
  handleDialogClose = () => {
    this.setState({
      shouldOpenImageDialog: false
    })
  }
  handleOpenPasswordDialog = () => {
    this.setState({
      shouldOpenPasswordDialog: true
    });
  }
  handleDialogPasswordClose = () => {
    this.setState({
      shouldOpenPasswordDialog: false
    })
  }

  handleChangeName = () => {
    let id = this.state.user.id;
    let username = this.state.user.person.displayName;
    updateAccount(id, username).then(({ data }) => {
      toast.info("Lưu tên hiển thị thành công");
      window.location.reload()
    });
  }

  openPasswordDialog = () => {
    this.setState({
      shouldOpenPasswordDialog: true
    })
  }
  handleUpdate = (blobValue) => {
    const url = ConstantList.API_ENPOINT + "/api/users/updateavatar";
    let formData = new FormData();
    formData.set('uploadfile', blobValue)
    //formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
      headers: {
        'Content-Type': 'image/jpg'
      }
    }
    return axios.post(url, formData, config).then(response => {
      let user = response.data;
      this.setState({ user: user });
      authService.setLoginUser(user);
      this.handleDialogClose();
    });
  }

  handleChange = (event, source) => {
    event.persist();

    if (source === "displayName") {
      let { user } = this.state;
      user = user ? user : {};
      user.person.displayName = event.target.value;
      this.setState({ user: user });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    let { theme } = this.props;
    let { t, i18n } = this.props;

    const genders = [
      { id: 'M', name: 'Nam' },
      { id: 'F', name: 'Nữ' },
      { id: 'U', name: 'Không rõ' },
    ]
    let user = this.state.user;
    //alert('Render');
    return (
      <div className="m-sm-30" t={t} i18n={i18n}>
        {this.state.shouldOpenImageDialog && (
          <UploadCropImagePopup t={t} i18n={i18n}
            handleClose={this.handleDialogClose}
            handleUpdate={this.handleUpdate}
            open={this.state.shouldOpenImageDialog}
            uploadUrl={API_PATH + "avatarUpload"}
            acceptType="png;jpg;gif;jpeg"
          />
        )}
        {this.state.shouldOpenPasswordDialog && (
          <ChangePasswordDiaglog t={t} i18n={i18n}
            handleClose={this.handleDialogPasswordClose}
            handleUpdate={this.handleUpdate}
            open={this.state.shouldOpenPasswordDialog}
            uploadUrl={API_PATH + "avatarUpload"}
            acceptType="png;jpg;gif;jpeg"
            user={user}
          />
        )}
        <div>
          {t('user.person_info')}
        </div>
        <div className="user-profile__sidenav flex-column flex-middle">
          {this.state.user && this.state.user ? (
            <Avatar
              className="avatar mb-20"
              src={ConstantList.API_ENPOINT + this.state.user.imagePath}
              onClick={
                this.handleOpenUploadDialog
              }
            />
          ) :
            (
              <div>
                <Avatar
                  className="avatar mb-20"
                  src={ConstantList.ROOT_PATH + "assets/images/avatar.jpg"}
                  onClick={
                    this.handleOpenUploadDialog
                  }
                />
              </div>
            )}
          {user.displayName}
        </div>
        <Grid className="mb-10" container spacing={2}>
          <Grid item md={6} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic"
                label={t('user.firstName')}
                type="text"
                name="name"
                value={user.person ? user.person.displayName : ''}
                onChange={displayName => this.handleChange(displayName, "displayName")}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <FormControl disabled fullWidth={true}>
              <InputLabel htmlFor="gender-simple">
                {t('user.gender')}
              </InputLabel>
              <Select
                value={user.person ? user.person.gender : ''}
                onChange={(gender) => this.handleChange(gender, 'gender')}
                inputProps={{
                  name: 'gender',
                  id: 'gender-simple',
                }}
              >
                {genders.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid className="mb-10" container spacing={2}>
          <Grid item md={6} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic" disabled label={t('user.email')} value={user.email != null ? user.email : ''} />
            </FormControl>
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic" disabled label={t('user.username')} value={user.username != null ? user.username : ''} />
            </FormControl>
          </Grid>
        </Grid>

        <Grid className="mb-10" container spacing={3}>
          {/* <Button variant="contained" color="primary" type="submit">
                {t('general.update')}
              </Button> */}
          <Grid item md={10} sm={6} xs={6}>
            <Button className="" variant="contained" color="primary" type="button" onClick={() => this.openPasswordDialog()}>
              {t('user.changePass')}
            </Button>
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <Button className="" variant="contained" color="primary" type="button" onClick={this.handleChangeName}>
            {t('user.saveChange')}
              </Button>
          </Grid>
        </Grid>

      </div >
    );
  }
}

export default withStyles({}, { withTheme: true })(UserProfile);
