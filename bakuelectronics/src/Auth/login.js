import axiosService from "../Api/api";
const postUserData = () => {
  const api = new axiosService("https://dummyjson.com/auth");
  const LoginForm = document.querySelector("#loginForm");
  const UsernameInput = document.querySelector("#username");
  const PaSSwordInput = document.querySelector("#password");

  LoginForm   &&
  LoginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const loginPayload = {
        username: UsernameInput.value,
        password: PaSSwordInput.value,
      };
      api.PostNewData("/login", loginPayload).then((data) => {
        console.log(data);
        if (data) {
          Swal.fire({
            title: "Done!",
            icon: "success",
            draggable: true,
          });
        } else { 
          Swal.fire({
            title: "Oops!",
            icon: "error",
            draggable: true,
          });
        }

        localStorage.setItem("token", data.accessToken);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      });
      console.log(loginPayload);
    });
};

export default postUserData;
