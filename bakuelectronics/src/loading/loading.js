const loading = () => {
    const LOADER = document.querySelector("#Loading");
    setTimeout(() => {
      LOADER && LOADER.classList.add("hidden");
      LOADER && LOADER.classList.remove("flex");
    }, 1000);
  };
  
  export default loading;