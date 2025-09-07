import axiosService from "../Api/api";
import postUserData from "../Auth/login";
import loading from "../loading/loading";

const api = new axiosService("http://localhost:3000/");


postUserData();
document.addEventListener("DOMContentLoaded", () => {
  loading();
});


export default function swiperVariants(name, perView, spaceBetween, autoplayDelay) {

  new Swiper(`.${name}`, {
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    spaceBetween,
    autoplay: { delay: autoplayDelay, disableOnInteraction: false },
    slidesPerView: perView,
  });
}


function bannerFactory() {
  const SWIPER_WRAPPER = document.querySelector(".swiper-wrapper");
  if (!SWIPER_WRAPPER) return;

  const bannerData = [
    { id: 1, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fxerox923520.jpg&w=3840&q=100" },
    { id: 2, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2FLGtv923520.jpg&w=3840&q=100" },
    { id: 3, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520MAC.jpg&w=3840&q=100" },
    { id: 4, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520ipad.JPG&w=3840&q=100" },
    { id: 5, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520nau.jpg&w=3840&q=100" },
    { id: 6, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520midea.jpg&w=3840&q=100" },
    { id: 7, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2Fphilips923520.jpg&w=3840&q=100" },
    { id: 8, image: "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fpage%2Fslider%2F923520.jpg&w=3840&q=100" },
  ];

  const html = bannerData.map(
    (it) => `
      <div class="swiper-slide rounded-4xl overflow-hidden">
        <img src="${it.image}" alt="banner-${it.id}" class="w-full h-full object-cover" />
      </div>`
  ).join("");

  SWIPER_WRAPPER.innerHTML = html;
}
bannerFactory();
swiperVariants("mySwiper", 1, 0, 3000);

const DARK_MODE_BTN = document.querySelector("#themeBtn");
const circle = DARK_MODE_BTN && DARK_MODE_BTN.querySelector(".circle");
DARK_MODE_BTN?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  circle?.classList.toggle("translate-x-[24px]");
});


const ADMIN_FORM = document.querySelector("#productForm");
const NAME_INPUT = document.querySelector("#productName");
const PRICE_INPUT = document.querySelector("#productPrice");
const CATEGORY_INPUT = document.querySelector("#productCategory");
const DISCOUNT_PRICE_INPUT = document.querySelector("#productdiscountprice");
const IMAGE_INPUT = document.querySelector("#productImage");

ADMIN_FORM?.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    id: crypto.randomUUID(),
    name: NAME_INPUT.value.trim(),
    price: Number(PRICE_INPUT.value || 0),
    category: CATEGORY_INPUT.value.trim(),
    discountPrice: Number(DISCOUNT_PRICE_INPUT.value || 0),
    image: IMAGE_INPUT.value.trim(),
  };

  api.PostNewData("products", payload).then(() => {
    NAME_INPUT.value = "";
    PRICE_INPUT.value = "";
    CATEGORY_INPUT.value = "";
    DISCOUNT_PRICE_INPUT.value = "";
    IMAGE_INPUT.value = "";
    adminProducts();
    productRender();
  });
});


const ADMIN_PRODUCT_WRAPPER = document.querySelector("#productTableBody");

function adminProducts() {
  if (!ADMIN_PRODUCT_WRAPPER) return;
  api.getApiData("products").then((data) => {
    const rows = data.map((item) => `
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${item.id}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">${item.name}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₼${item.price}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">${item.category}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <img src="${item.image}" alt="${item.name}" class="w-[70px] h-[70px] object-contain"/>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
          <button data-edit data-id="${item.id}" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition">Redaktə</button>
          <button data-del  data-id="${item.id}" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition">Sil</button>
        </td>
      </tr>
    `).join("");

    ADMIN_PRODUCT_WRAPPER.innerHTML = rows;
  });
}
adminProducts();

ADMIN_PRODUCT_WRAPPER?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.hasAttribute("data-del")) {
    api.DeleteData(`products/${id}`).then(() => {
      adminProducts();
      productRender();
    });
  }

  if (btn.hasAttribute("data-edit")) {
    const newName = prompt("Yeni ad:");
    if (!newName) return;
    api.UpdateData(`products/${id}`, { name: newName }).then(() => {
      adminProducts();
      productRender();
    });
  }
});


const PRODUCT_WRAPPER_CLIENT = document.querySelector("#productWrapper");

function productRender() {
  if (!PRODUCT_WRAPPER_CLIENT) return;
  api.getApiData("products").then((data) => {
    const html = data.map((item) => `
      <div class="cards mt-20 relative flex flex-col gap-5 bg-[#F5F5F5] rounded-[24px] pt-[22px] pr-[22px] pb-[32px] pl-[23px] overflow-visible">
        <div class="relative -mt-18 rounded-[24px] bg-[#FFFFFF] shadow-xl h-[240px]">
          <span class="absolute left-4 top-4 z-10 inline-flex items-center rounded-[10px] bg-[#ea2427] text-white px-2 py-1 text-[12px] font-medium">- 80 ₼</span>
          <button class="absolute right-4 top-4 z-10 w-10 h-[30px] rounded-[32px] bg-white grid place-items-center shadow hover:shadow-md transition">
            <!-- icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 26 25" fill="none"><path d="M6.45 16.25c-1.83 0-3.33-1.607-3.33-3.571 0-1.607 2.167-7.232 2.583-8.393.083-.357.417-.535.75-.535s.333.178.417.535c.417 1.161 2.583 6.786 2.583 8.393 0 1.964-1.5 3.571-3.333 3.571Z" fill="currentColor"/></svg>
          </button>
          <div class="absolute inset-0 flex items-center justify-center">
            <img class="w-full h-[210px] object-contain" src="${item.image}" alt="${item.name}" />
          </div>
        </div>

        <div class="text-[14px] leading-5 font-normal text-[#333333]">${item.name}</div>

        <div class="grid grid-cols-12 gap-2.5">
          <div class="col-span-6">
            <div class="text-[14px] text-[#9CA3AF] font-medium leading-5 line-through">${item.price} ₼</div>
            <div class="text-[20px] font-bold text-[#333333] leading-8">${item.discountPrice} ₼</div>
          </div>
          <div class="col-span-6">
            <div class="text-[13px] text-[#9CA3AF]">6 ay</div>
            <div class="text-[20px] font-extrabold text-[#1A1A1A]">48.33 ₼</div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="flex-1 h-[48px] rounded-[14px] bg-[#E1E1E1] hover:bg-[#ea2427] hover:text-white transition grid place-items-center text-[15px] font-semibold text-[#111827]"
            data-add-to-cart
            data-id="${item.id}"
            data-name="${item.name}"
            data-price="${Number(item.discountPrice || item.price)}"
            data-image="${item.image}"
          >
            <span class="inline-flex items-center gap-2 text-[14px]">Səbətə əlavə et</span>
          </button>

          <button class="w-[48px] h-[48px] rounded-[14px] bg-[#E1E1E1] hover:bg-[#ea2427] hover:text-white grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.894 12.082C2.776 8.592 4.083 4.603 7.746 3.423c1.927-.622 4.054-.255 5.656.95 1.515-1.172 3.72-1.567 5.646-.95 3.664 1.18 4.979 5.168 3.862 8.658-1.74 5.531-9.508 9.792-9.508 9.792s-7.71-4.196-9.508-9.792Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
        </div>
      </div>
    `).join("");

    PRODUCT_WRAPPER_CLIENT.innerHTML = html;
  });
}
productRender();



const CART_KEY = "shopping_cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(arr) {
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
  window.dispatchEvent(new CustomEvent("cart:change", { detail: cartSnapshot() }));
}
function cartCount() {
  return getCart().reduce((t, i) => t + (i.quantity || 0), 0);
}
function cartTotal() {
  return getCart().reduce((t, i) => t + Number(i.price || 0) * (i.quantity || 0), 0);
}
function cartSnapshot() {
  return { items: getCart(), count: cartCount(), total: cartTotal() };
}
function addToCartItem({ id, name = "", price = 0, image = "" }, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex((x) => String(x.id) === String(id));
  if (idx > -1) {
    cart[idx].quantity += qty;
    if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  } else {
    cart.push({ id, name, price: Number(price) || 0, image, quantity: Math.max(1, qty | 0) });
  }
  saveCart(cart);
}


const fmtAZN = (n) =>
  Number(n || 0).toLocaleString("az-AZ", { style: "currency", currency: "AZN", maximumFractionDigits: 2 });

function updateQty(id, delta) {
  const it = getCart().find((x) => String(x.id) === String(id));
  if (!it) return;
  addToCartItem(it, delta);
}
function setQty(id, qty) {
  qty = Math.max(0, parseInt(qty, 10) || 0);
  const cart = getCart();
  const idx = cart.findIndex((x) => String(x.id) === String(id));
  if (idx === -1) return;
  if (qty <= 0) cart.splice(idx, 1);
  else cart[idx].quantity = qty;
  saveCart(cart);
}
function removeItem(id) {
  const cart = getCart().filter((x) => String(x.id) !== String(id));
  saveCart(cart);
}



function renderCartList() {
  const listEl = document.querySelector("[data-cart-items]");
  if (!listEl) return;

  const { items } = cartSnapshot();

  if (!items.length) {
    listEl.innerHTML = `
      <div class="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
        <div class="text-sm text-gray-500">Səbət boşdur</div>
      </div>`;
    return;
  }

  listEl.innerHTML = items.map((i) => `
    <div class="flex items-center justify-between bg-gray-50 p-4 rounded-xl" data-cart-row="${i.id}">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-xl overflow-hidden bg-white flex items-center justify-center">
          <img src="${i.image || ""}" alt="${i.name || ""}" class="object-cover w-full h-full">
        </div>
        <div>
          <p class="font-medium text-lg">${i.name || "Məhsul"}</p>
          <div class="flex items-center gap-3 mt-1">
            <!-- original price yoxdursa gizlənmiş kimi saxlayırıq -->
            <span class="line-through text-gray-400 text-sm hidden"></span>
            <span class="text-xl font-bold">${fmtAZN(i.price)}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center"
                data-cart-dec="${i.id}">-</button>
        <input type="number" min="0" step="1" value="${i.quantity}"
               class="w-14 h-10 rounded-lg border text-center"
               data-cart-qty="${i.id}">
        <button class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center"
                data-cart-inc="${i.id}">+</button>
        <button class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-red-500"
                data-cart-remove="${i.id}">
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    </div>
  `).join("");
}


function renderSummary() {
  const linesEl   = document.querySelector("[data-summary-lines]");
  const countEl   = document.querySelector("[data-summary-count]");
  const discountEl= document.querySelector("[data-summary-discount]");
  const totalEl   = document.querySelector("[data-cart-total]");

  const { items, count, total } = cartSnapshot();
  if (linesEl) {
    if (!items.length) {
      linesEl.innerHTML = `<div class="text-sm text-gray-500">Siyahı boşdur</div>`;
    } else {
      linesEl.innerHTML = items.map((i) => `
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium w-[60%] line-clamp-2">${i.name}</p>
          <div class="text-right">
            <p class="line-through text-gray-400 text-sm hidden"></p>
            <p class="font-bold">${fmtAZN(i.price * i.quantity)}</p>
          </div>
        </div>
      `).join("");
    }
  }
  if (countEl)   countEl.textContent = `${count} ədəd`;
  if (discountEl) discountEl.textContent = `0 ₼`;
  if (totalEl)   totalEl.textContent = fmtAZN(total);
}


const CART_COUNT_EL = document.querySelector("#cartCount");
function renderCartCount() {
  if (CART_COUNT_EL) CART_COUNT_EL.textContent = String(cartCount());
}


function syncCartUI() {
  renderCartList();
  renderSummary();
  renderCartCount();
}


document.addEventListener("click", (e) => {
  const addBtn = e.target.closest("[data-add-to-cart]");
  if (addBtn) {
    addToCartItem(
      {
        id: addBtn.dataset.id,
        name: addBtn.dataset.name || "",
        price: Number(addBtn.dataset.price || 0),
        image: addBtn.dataset.image || "",
      },
      1
    );
    return;
  }

  const inc = e.target.closest("[data-cart-inc]");
  if (inc) {
    updateQty(inc.getAttribute("data-cart-inc"), +1);
    return;
  }

 
  const dec = e.target.closest("[data-cart-dec]");
  if (dec) {
    updateQty(dec.getAttribute("data-cart-dec"), -1);
    return;
  }


  const rm = e.target.closest("[data-cart-remove]");
  if (rm) {
    removeItem(rm.getAttribute("data-cart-remove"));
    return;
  }
});


document.addEventListener("change", (e) => {
  const qtyInput = e.target.closest("input[data-cart-qty]");
  if (qtyInput) {
    setQty(qtyInput.getAttribute("data-cart-qty"), qtyInput.value);
  }
});

window.addEventListener("cart:change", syncCartUI);


document.addEventListener("DOMContentLoaded", () => {
  syncCartUI();
});



const CHECKOUT_FORM = document.querySelector("#personal-info-form");
const CHECKOUT_NAME_INPUT = document.querySelector("#name");
const CHECKOUT_SURNAME_INPUT = document.querySelector("#surname");
const CHECKOUT_PHONE_INPUT = document.querySelector("#telefon");
const CHECKOUT_EMAIL_INPUT = document.querySelector("#email");

CHECKOUT_FORM && CHECKOUT_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const cart = getCart();
  const checkoutPayload = {
    name: CHECKOUT_NAME_INPUT?.value || "",
    surname: CHECKOUT_SURNAME_INPUT?.value || "",
    phone: CHECKOUT_PHONE_INPUT?.value || "",
    email: CHECKOUT_EMAIL_INPUT?.value || "",
    orderStatus: "Gözləmədə",
    orderItem: cart,
    totalAmount: cart.reduce((t, i) => t + Number(i.price || 0) * (i.quantity || 0), 0),
  };

  api.PostNewData("orders", checkoutPayload).then((data) => {
    if (data) {
      localStorage.removeItem(CART_KEY);
      window.dispatchEvent(new CustomEvent("cart:change", { detail: cartSnapshot() }));
      setTimeout(() => { window.location.href = "/"; }, 2000);
    } else {
      console.log("Error occurred during order placement.");
    }
    console.log(data);
  });
});


const SCROLL_TO_TOP = document.querySelector("#Topbutton");
SCROLL_TO_TOP?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function setProgress() {
  if (!SCROLL_TO_TOP) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const deg = pct * 3.6;
  SCROLL_TO_TOP.style.setProperty("--p", deg + "deg");
}
setProgress();
window.addEventListener("scroll", setProgress, { passive: true });
window.addEventListener("resize", setProgress);
