
const swiperVariants = (name, perView, spaceBetween, autoplayDelay) => {
    var swiper = new Swiper(`.${name}`, {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      spaceBetween: spaceBetween,
      autoplay: {
        delay: autoplayDelay,
        disableOnInteraction: false,
      },
  
      slidesPerView: perView,
    });
  };
  
  export default swiperVariants;


  const bannerFactory = () => {
    const SWIPER_WRAPPER = document.querySelector(".swiper-wrapper");
    const bannerData = [
      {
        id: 1,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fxerox923520.jpg&w=3840&q=100",
      },
      {
        id: 2,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2FLGtv923520.jpg&w=3840&q=100",
      },
      {
        id: 3,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520MAC.jpg&w=3840&q=100",
      },
      {
        id: 4,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520ipad.JPG&w=3840&q=100",
      },
      {
        id: 5,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520nau.jpg&w=3840&q=100",
      },
      {
        id: 6,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520midea.jpg&w=3840&q=100",
      },
      {
        id: 7,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fphilips923520.jpg&w=3840&q=100",
      },
      {
        id: 8,
        image:
          "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520.jpg&w=3840&q=100",
      },
    ];
    let renderBanner = bannerData
      .map(
        (item) => `   <div class="swiper-slide rounded-4xl overflow-hidden">
                <img
                  src=${item?.image}
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>`
      )
      .join();
    SWIPER_WRAPPER.innerHTML = renderBanner;
  };
  
  bannerFactory();
  swiperVariants("mySwiper", 1, 0, 3000);
  