import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    agreement: ""
  };
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSubmit = event => {
    this.props.loginWithEmailAndPassword({ ...this.state });
  };
  render() {
    let { email, password } = this.state;
    let { classes } = this.props;
    return (

      <div className="signup flex flex-center w-100 h-100vh">
        <Helmet>
          <title>{'Đăng nhập'} | {'Quản lý nhân sự'} </title>
        </Helmet>
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center flex-middle h-100 logo-login">
                  <img src={ConstantList.ROOT_PATH + "assets/images/avt.jpg"} alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100 bg-light-gray position-relative">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label={'Tên đăng nhập'}
                      onChange={this.handleChange}
                      type="text"
                      name="email"
                      value={email}
                      //validators={["required", "isEmail"]}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required"
                      ]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label={'Mật khẩu'}
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />

                    <Grid item container spacing={1} sm={12} xs={12}>
                      <Grid item sm={6} xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.props.login.loading}
                          type="submit"
                        >
                          {"Đăng nhập"}
                        </Button>
                        {this.props.login.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      { loginWithEmailAndPassword }
    )(SignIn)
  )
);
