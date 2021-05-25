import React, { Component } from "react"; import {
  Icon,
  Grid,
  Fab
} from "@material-ui/core";
import ConstantList from "../../../appConfig";
import Moment from 'moment';
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import CarouselListZoom from "../common/CarouselListZoom";

class Intro3 extends Component {
  handleSignOut = () => { this.props.logoutUser(); };
  constructor(props) {
    super(props);
  }

  state = {
    currentEQARound: null,
  };
  render() {
    const { t, i18n } = this.props;

    let {
      currentEQARound
    } = this.state;
    return (
      <section className="section section-intro1 section-intro3" id="intro3">
        <div className="container">
          <CarouselListZoom />

        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Intro3);