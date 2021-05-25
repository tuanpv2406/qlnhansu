import React, { Component, Fragment } from "react";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  Button,
  TextField,
  Card
} from "@material-ui/core";
import ConstantList from "../../../appConfig";
import moment from "moment";
// import { searchByPage } from "../../Webinar/WebinarServicev2"

// const [selectedTab, setselectedTab] = React.useState(0);

// const handleChange = (event, newValue) => {
//   setselectedTab(newValue);
// };
const searchObject = {
  keyword: '',
  rowsPerPage: 10,
  page: 0,
}
// const ItemList = searchByPage(searchObject, searchObject.page, searchObject.rowsPerPage).then(({ data }) => {
//   return ([...data.content])
// })
const ItemList =
  [
    {
      name: "Hội thảo 1",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 2",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 3",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 4",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 5",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 6",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 7",
      startTime: "2021-03-15 15:30"
    },
    {
      name: "Hội thảo 1",
      startTime: "2021-03-15 15:30"
    },
  ]

class ShowListZoom extends Component {
  state = {};
  render() {
    return (
      // className="container" style={{marginBottom: '5px', background: '#fafafa', color: '#655046' }}
      <div>
        <Fragment>
          <div className="position-relative h-100 w-100">
            <Grid container spacing={2}>
              {ItemList.map((item, index) => {
                return (
                  <Grid item lg={3} md={4} sm={4} xs={4}>
                    <Card elevation={3} className="p-16 position-relative h-80 d-f">
                      <Grid container spacing={2} direction="row" justify="center">
                        <Grid item lg={6} md={6} sm={6} xs={6} >
                          <div className="product__image-box flex flex-center flex-middle position-relative justify-content-center" >
                            <img
                              src={ConstantList.ROOT_PATH + "assets/images/WebinarDefault.jpg"}
                              alt={"publicOffer"}
                              style={{ border: '5px ', borderRadius: '5px' }}
                              className="img"
                            />
                            <div className="image-box__overlay">
                            </div>
                          </div>
                        </Grid>
                        {/* style={{ display: "flex", justifyContent: "center" }} */}
                        <Grid item lg={12} md={12} sm={12} xs={12} className="p-10 b-w" >
                          <div className="movie-card">
                            {/*--- Tên hội thảo -----*/}
                            <div className="movie-content" >
                              <div className="movie-content-header">
                                <h3 className="movie-title_grid">Tên hội thảo </h3>
                              </div>
                              <div className="movie-info">
                                <div className="info-section_grid">
                                  <label>{item.name}</label>
                                </div>
                              </div>
                            </div>
                            {/*---- Thời gian ---------*/}
                            <div className="movie-content" >
                              <div className="movie-content-header">
                                <h3 className="movie-title_grid">Thời gian</h3>
                              </div>
                              <div className="movie-info">
                                <div className="info-section_grid">
                                  <label>
                                    {item.startTime}
                                    {/* {moment(item.startTime).format("DD-MM-YYYY - kk:mm")} */}
                                  </label>
                                  {/* <label>
                                        {moment(item.endTime).format("DD-MM-YYYY - kk:mm")}
                                      </label> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default ShowListZoom;
