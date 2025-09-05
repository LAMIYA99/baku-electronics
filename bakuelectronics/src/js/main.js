import axiosService from "../Api/api";

const api = new axiosService("http://localhost:3000/")


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
  SWIPER_WRAPPER && (SWIPER_WRAPPER.innerHTML = renderBanner);
};

bannerFactory();
swiperVariants("mySwiper", 1, 0, 3000);


const DARK_MODE_BTN = document.querySelector("#themeBtn");
const circle = DARK_MODE_BTN && DARK_MODE_BTN.querySelector(".circle");

DARK_MODE_BTN &&
  DARK_MODE_BTN.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    circle.classList.toggle("translate-x-[24px]");
  });

const ADMIN_FORM = document.querySelector("#productForm")
const NAME_INPUT = document.querySelector("#productName")
const PRICE_INPUT = document.querySelector("#productPrice")
const CATEGORY_INPUT = document.querySelector("#productCategory")
const DISCOUNT_PRICE_INPUT = document.querySelector("#productdiscountprice")
const IMAGE_INPUT = document.querySelector("#productImage")

ADMIN_FORM && ADMIN_FORM.addEventListener('submit', (e) => {
  e.preventDefault()

  const payload = {
    id: crypto.randomUUID(),
    name: NAME_INPUT.value,
    price: PRICE_INPUT.value,
    category: CATEGORY_INPUT.value,
    discountPrice: DISCOUNT_PRICE_INPUT.value,
    image: IMAGE_INPUT.value
  }
  console.log(payload)
  api.PostNewData("products", payload).then((data) => {
    console.log(data)

  })
})

const ADMIN_PRODUCT_WRAPPER = document.querySelector("#productTableBody")
const PRODUCT_WRAPPER_CLIENT = document.querySelector("#productWrapper")



const adminProducts = () => {
  api.getApiData("products").then((data) => {
    let renderAdmin = data.map((item) => ` <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${item?.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">${item?.name}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₼${item?.price}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            ${item?.category}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                     <div><img src=${item?.image} alt=${item?.name} class="w-[70px] h-[70px] object-contain"/></div>
                    </td>

                 
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onclick="editProduct(${item?.id})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors transform hover:-translate-y-0.5">
                            Redaktə
                        </button>
                        <button onclick="deleteProduct(${item?.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors transform hover:-translate-y-0.5">
                            Sil
                        </button>
                    </td>
                </tr>`).join("")
    ADMIN_PRODUCT_WRAPPER && (ADMIN_PRODUCT_WRAPPER.innerHTML = renderAdmin)
  })

}
adminProducts()

const productRender = () => {
  api.getApiData("products").then((data) => {
    let renderHTML = data.map((item) => `  <div
          class="cards mt-20 relative flex flex-col gap-5 bg-[#F5F5F5] rounded-[24px] pt-[22px] pr-[22px] pb-[32px] pl-[23px] overflow-visible">
      
          <div class="relative -mt-18 rounded-[24px] bg-[#FFFFFF] shadow-xl h-[240px]">
            <span
              class="absolute left-4 top-4 z-10 inline-flex items-center rounded-[10px] bg-[#ea2427] text-white px-2 py-1 text-[12px] font-medium">
              - 80 ₼
            </span>
            <button
              class="absolute right-4 top-4 z-10 w-10 h-[30px] rounded-[32px] bg-white grid place-items-center shadow hover:shadow-md transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 26 25" fill="none">
                <path d="M6.45443 16.25C4.62109 16.25 3.12109 14.6429 3.12109 12.6786C3.12109 11.0714 5.28776 5.44643 5.70443 4.28571C5.78776 3.92857 6.12109 3.75 6.45443 3.75C6.78776 3.75 7.12109 3.92857 7.20443 4.28571C7.62109 5.44643 9.78776 11.0714 9.78776 12.6786C9.78776 14.6429 8.28776 16.25 6.45443 16.25ZM6.45443 7.05357C5.62109 9.46429 4.78776 11.9643 4.78776 12.6786C4.78776 13.6607 5.53776 14.4643 6.45443 14.4643C7.37109 14.4643 8.12109 13.6607 8.12109 12.6786C8.12109 11.9643 7.28776 9.46429 6.45443 7.05357ZM19.7878 16.25C17.9544 16.25 16.4544 14.6429 16.4544 12.6786C16.4544 11.0714 18.6211 5.44643 19.0378 4.28571C19.1211 3.92857 19.4544 3.75 19.7878 3.75C20.1211 3.75 20.4544 3.92857 20.5378 4.28571C20.9544 5.44643 23.1211 11.0714 23.1211 12.6786C23.1211 14.6429 21.6211 16.25 19.7878 16.25ZM19.7878 7.05357C18.9544 9.375 18.1211 11.9643 18.1211 12.6786C18.1211 13.6607 18.8711 14.4643 19.7878 14.4643C20.7044 14.4643 21.4544 13.6607 21.4544 12.6786C21.4544 11.9643 20.6211 9.46429 19.7878 7.05357Z" fill="currentColor"></path>
                <path d="M19.7878 5.875H6.45443C5.95443 5.875 5.62109 5.45 5.62109 4.8125C5.62109 4.175 5.95443 3.75 6.45443 3.75H19.7878C20.2878 3.75 20.6211 4.175 20.6211 4.8125C20.6211 5.45 20.2878 5.875 19.7878 5.875Z" fill="currentColor"></path>
                <path d="M12.9336 21.25C12.2961 21.25 11.8711 20.9 11.8711 20.375V4.625C11.8711 4.1 12.2961 3.75 12.9336 3.75C13.5711 3.75 13.9961 4.1 13.9961 4.625V20.375C13.9961 20.9 13.5711 21.25 12.9336 21.25Z" fill="currentColor"></path>
                <path d="M18.1211 21.25H8.12109C7.62109 21.25 7.28776 20.8864 7.28776 20.3409C7.28776 19.7955 7.62109 19.4318 8.12109 19.4318H18.1211C18.6211 19.4318 18.9544 19.7955 18.9544 20.3409C18.9544 20.8864 18.6211 21.25 18.1211 21.25ZM8.95443 13.0682H3.95443C3.45443 13.0682 3.12109 12.7046 3.12109 12.1591C3.12109 11.6137 3.45443 11.25 3.95443 11.25H8.95443C9.45443 11.25 9.78776 11.6137 9.78776 12.1591C9.78776 12.7046 9.45443 13.0682 8.95443 13.0682ZM22.2878 13.0682H17.2878C16.7878 13.0682 16.4544 12.7046 16.4544 12.1591C16.4544 11.6137 16.7878 11.25 17.2878 11.25H22.2878C22.7878 11.25 23.1211 11.6137 23.1211 12.1591C23.1211 12.7046 22.7878 13.0682 22.2878 13.0682Z" fill="currentColor"></path>
              </svg>
            </button>
            <div class="absolute inset-0 flex items-center justify-center">
              <img class="w-full h-[210px] object-contain"
                src=${item?.image}
                alt=${item?.name} />
            </div>
          </div>
      
          <div class="flex items-center gap-2 text-[13px] text-[#6B7280]">
            <span>0 rəy</span>
          </div>
      
          <div class="text-[14px] leading-5 font-normal text-[#333333]">
            ${item?.name}
          </div>
      
          <div class="grid grid-cols-12 gap-2.5">
            <div class="col-span-6">
              <div class="text-[14px] text-[#9CA3AF] font-medium leading-5 line-through">${item?.price} ₼</div>
              <div class="text-[20px] font-bold text-[#333333] leading-8">${item?.discountPrice} ₼</div>
            </div>
            <div class="col-span-6">
              <div class="text-[13px] text-[#9CA3AF]">6 ay</div>
              <div class="text-[20px] font-extrabold text-[#1A1A1A]">48.33 ₼</div>
            </div>
            
          </div>
      
          <div class="flex items-center gap-3">
            <button
              class="flex-1 h-[48px] rounded-[14px] bg-[#E1E1E1] hover:bg-[#ea2427] hover:text-white transition grid place-items-center text-[15px] font-semibold text-[#111827]">
              <span class="inline-flex items-center gap-2 text-[14px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 18 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1.292 3.708 1.733.3.803 9.56a1.5 1.5 0 0 0 1.5 1.378h9.09a1.5 1.5 0 0 0 1.488-1.288l.79-5.465a1.118 1.118 0 0 0-.945-1.266c-.053-.007-12.448-.011-12.448-.011M9.46 4.333V1M8.166 3.033l1.294 1.3 1.294-1.3"></path><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.962 17.835a.453.453 0 1 1 0 .906.453.453 0 0 1 0-.906ZM14.362 17.835a.454.454 0 1 1 0 .908.454.454 0 0 1 0-.908Z" clip-rule="evenodd"></path></svg>
                Səbətə əlavə et
              </span>
            </button>
            <button class="w-[48px] h-[48px] rounded-[14px] bg-[#E1E1E1] hover:bg-[#ea2427] hover:text-white grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.8942 12.0816C2.77649 8.59201 4.08274 4.60347 7.74628 3.42326C9.67336 2.80138 11.8004 3.16805 13.4025 4.37326C14.9182 3.20138 17.1234 2.80555 19.0484 3.42326C22.7119 4.60347 24.0265 8.59201 22.9098 12.0816C21.1702 17.6128 13.4025 21.8733 13.4025 21.8733C13.4025 21.8733 5.69211 17.6774 3.8942 12.0816Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5688 6.97917C18.6834 7.33959 19.4709 8.33438 19.5657 9.50209" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
          </div>
        </div>`).join("")
    PRODUCT_WRAPPER_CLIENT.innerHTML = renderHTML
  })

}

productRender()




const SCROLL_TO_TOP = document.querySelector("#Topbutton");

// kliklə yuxarı apar
if (SCROLL_TO_TOP) {
  SCROLL_TO_TOP.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// skrolla görə içini doldur
function setProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const deg = pct * 3.6; // faiz → dərəcə
  SCROLL_TO_TOP.style.setProperty("--p", deg + "deg");
}

setProgress();
window.addEventListener("scroll", setProgress, { passive: true });
window.addEventListener("resize", setProgress);

