import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const postUserData = () => {
  const LoginForm = document.querySelector("#loginForm");
  const LOGIN_EMAIL = document.querySelector("#login_email");
  const PaSSwordInput = document.querySelector("#password");

  LoginForm &&
    LoginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const loginPayload = {
        email: LOGIN_EMAIL.value,
        password: PaSSwordInput.value,
      };
      signInWithEmailAndPassword(auth, loginPayload.email, loginPayload.password).then((data) => {
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

        localStorage.setItem("token", data?.user?.accessToken);
        localStorage.setItem("email", data?.user?.email);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      });
      console.log(loginPayload);
    });
};

export default postUserData;
