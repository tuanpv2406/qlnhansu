import React, { Component } from 'react'
import Swiper from 'swiper'
import history from 'history.js'
import { Grid, Card, Fab, IconButton, Icon } from '@material-ui/core'
import ConstantList from '../../../appConfig'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import { listWebinar } from '../HomeService'
import moment from 'moment'
import { useTranslation, withTranslation, Trans } from 'react-i18next'

function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  return (
    <div class="icon-button">
      <IconButton
        onClick={() => {
          history.push({
            pathname: 'session/signin',
          })
        }}
      >
        <Icon
          fontSize="large"
          style={{ color: '#01bb54f7' }}
          title={t('webinar.joinWebinar')}
        >
          visibility
        </Icon>
      </IconButton>
    </div>
  )
}

class CarouselListZoom extends Component {
  state = {
    itemList: [],
    rowsPerPage: 10,
    page: 0,
  }
  swiperOptions = {
    direction: 'horizontal',
    allowSlideNext: true,
    allowSlidePrev: true,
    slidesPerView: 4,
    spaceBetween: 2,
    slidesPerGroup: 1,
    loop: true,

    pagination: {
      el: '.swiper-pagination2',
      type: 'bullets',
      bulletActiveClass: 'bullet-active',
      clickable: true,
    },
    navigation: {
      nextEl: '.carousel__button-next2',
      prevEl: '.carousel__button-prev2',
    },

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    breakpoints: {
      // when window width is >= 640px
      576: {
        // width: 566,
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
      // when window width is >= 768px
      768: {
        // width: 758,
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
      // when window width is >= 640px
      992: {
        // width: 982,
        slidesPerView: 4,
        slidesPerGroup: 1,
      },
      // when window width is >= 768px
      1200: {
        // width: 1190,
        slidesPerView: 4,
        slidesPerGroup: 1,
      },
    },
  }

  updatePageData = () => {
    var object = {}
    object.pageIndex = this.state.page + 1
    object.pageSize = this.state.rowsPerPage
    listWebinar(object, this.state.page, this.state.rowsPerPage).then(
      ({ data }) => {
        this.setState({ itemList: [...data.content] })
        new Swiper('.swiper2', this.swiperOptions)
      },
      () => { },
    )
  }

  componentDidMount() {
    this.updatePageData()
  }

  render() {
    let listItem = this.state.itemList
    return (
      <div className="relative w-100">
        <div className="swiper-container swiper2">
          <div className="swiper-wrapper">
            {listItem.map(item => {
              return (
                <div className="swiper-slide">
                  <Card elevation={3} className="p-16 position-relative">
                    <Grid container spacing={2} direction="row" justify="center">
                      <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className="product__image-box flex flex-center flex-middle position-relative justify-content-center" style={{height:'150px'}}>
                          <img
                            src={ConstantList.API_ENPOINT + item.imageUrl}
                            alt={"publicOffer"}
                            style={{ border: '5px ', borderRadius: '5px' }}
                            className="img"
                          />
                          <div className="image-box__overlay"></div>
                        </div>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="movie-card">
                          {/* ---- Tên Webinar ----- */}
                          <div className="movie-content" >
                            <div className="movie-content-header">
                              <h3 className="movie-title_grid">Tên Webinar</h3>
                            </div>
                            <div className="movie-info">
                              <div className="info-section_grid">
                                <label title={item.name}>{item.name}</label>
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
                                  {moment(item.startTime).format("DD-MM-YYYY - kk:mm")}
                                </label>
                                <label>
                                  {moment(item.endTime).format("DD-MM-YYYY - kk:mm")}
                                </label>
                              </div>
                            </div>
                            <div className="movie-content" >
                              <div className="movie-content-header">
                                <MaterialButton item={item} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </div>
              )
            })}
          </div>
          {/* pagination */}
          <div className="swiper-pagination swiper-pagination2 relative mt-24" />
        </div>
        {/* <!-- Add Pagination --> */}
        {/* navigation */}
        {/* <Fab className="carousel__button-prev carousel__button-prev2 bg-white">
          <NavigateBefore />
        </Fab>
        <Fab className="carousel__button-next carousel__button-next2 bg-white">
          <NavigateNext />
        </Fab> */}
      </div>
    )
  }
}

export default CarouselListZoom
