import React, { Component, Children } from "react";
import Swiper from "swiper";
import { Fab, Grid, Card, CardContent } from "@material-ui/core";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

class Carousel extends Component {
  swiperOptions = {
    direction: "horizontal",
    allowSlideNext: true,
    allowSlidePrev: true,
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },

    // breakpoints: {
    //   // when window width is >= 576px
    //   576: {
    //     width: 576,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   // when window width is >= 768px
    //   768: {
    //     width: 768,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   // when window width is >= 992px
    //   992: {
    //     width: 992,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   // when window width is >= 1200px
    //   1200: {
    //     width: 1200,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    // },

    pagination: {
      el: ".swiper-pagination1",
      type: "bullets",
      bulletActiveClass: "bullet-active",
      clickable: true
    },

    navigation: {
      nextEl: ".carousel__button-next1",
      prevEl: ".carousel__button-prev1"
    }
  };

  componentDidMount() {
    new Swiper(".swiper1", this.swiperOptions);
  }

  render() {
    let slideShow = [
      { url: "./assets/images/slideshow/pic1.jpg" },
      { url: "./assets/images/slideshow/pic2.jpg" },
      { url: "./assets/images/slideshow/pic3.jpg" },
      { url: "./assets/images/slideshow/pic4.jpg" }
    ]
    return (
      <Grid  lg={12} md={12} sm={12} xs={12}>
        <div className="relative w-100">
          <div className="swiper-container swiper1 mx-28">
            <div className="swiper-wrapper">
              {slideShow.map(value => (
                <div className="swiper-slide p-4 pb-24">
                  <img src={value.url} alt="" />
                </div>
              ))}
            </div>

            {/* pagination */}
            <div className="swiper-pagination swiper-pagination1 relative mt-24" />
          </div>

          {/* navigation */}
          <Fab className="carousel__button-prev carousel__button-prev1 bg-white">
            <NavigateBefore />
          </Fab>
          <Fab className="carousel__button-next carousel__button-next1 bg-white">
            <NavigateNext />
          </Fab>
        </div>
      </Grid>
    );
  }
}

export default Carousel;
