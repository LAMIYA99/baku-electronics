const loading = () => {
  const LOADER = document.querySelector("#Loading");
  setTimeout(() => {
    LOADER && LOADER.classList.add("hidden");
    LOADER && LOADER.classList.remove("flex");
  }, 2000);
};

export default loading;
