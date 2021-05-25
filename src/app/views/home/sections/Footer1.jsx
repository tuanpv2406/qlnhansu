import React, { Component } from "react";
import { Grid, Button, Icon, Tabs, Tab, AppBar } from "@material-ui/core";

// const [selectedTab, setselectedTab] = React.useState(0);

// const handleChange = (event, newValue) => {
//   setselectedTab(newValue);
// };

class Footer1 extends Component {
  
  // render() {
  //   return (
  //     <>
  //       <AppBar position="static">
  //         <Tabs value={selectedTab} onChange={handleChange}>
  //           <Tab label="Trends"/>
  //           <Tab label="Application"/>
  //           <Tab label="Connection"/>
  //           <Tab label="Measurement & Evaluation"/>
  //           <Tab label="LD"/>
  //         </Tabs>
  //       </AppBar>
  //       {selectedTab === 0 && "Trends"},
  //       {selectedTab === 1 && "Application"},
  //       {selectedTab === 2 && "Connection"},
  //       {selectedTab === 3 && "Measurement&Evaluation"},
  //       {selectedTab === 4 && "LD"},
  //     </>
  //   );
  // }
  state = {};
  render() {
    return (
      <div className="section-footer1" id="footer1">
        <div className="container">
          <Grid container>
            <Grid item lg={6} md={6} sm={12}>
              <div className="footer1__about">
                <h4>Organiser</h4>
                <p>
                  Webinar
                </p>
                <Button variant="contained" color="secondary">
                  Contact Us
                </Button>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <div className="footer1__contact">
                <h4>Contact</h4>
                <div className="px-16 my-32">
                  <Icon className="footer1__contact__icon">mail</Icon>
                  <div className="pl-16">
                    <h5 className="m-0 p-0">Email</h5>
                    <p className="m-0 p-0">email@abc.com</p>
                  </div>
                </div>
                <div className="px-16 mt-32">
                  <Icon className="footer1__contact__icon">location_on</Icon>
                  <div className="pl-16">
                    <h5 className="m-0 p-0">Adress</h5>
                    <p className="m-0 p-0">Topoban, Akhalia Sylhet 3114, BD</p>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <div className="footer1__disclaimer">
                <h4>Disclaimer</h4>
                <p>
                  Lorem ipsum dolor sit amet.
                </p>
                <div className="mt-32 footer1__disclaimer__link">
                  <a href="#linkedin" className="px-8">
                    <img src="./assets/images/social-linkedin.png" alt="" />
                  </a>
                  <a href="#twitter" className="px-8">
                    <img src="./assets/images/social-twitter.png" alt="" />
                  </a>
                  <a href="#facebook" className="px-8">
                    <img src="./assets/images/social-facebook.png" alt="" />
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Footer1;
