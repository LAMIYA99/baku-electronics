import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../lib/firebase.js";
const register = () => {
    const REGISTER_FORM = document.querySelector('#registerForm');
    const EMAIL_INPUT = document.querySelector('#register_email');
    const PASSWORD_INPUT = document.querySelector('#register_password');

    REGISTER_FORM && REGISTER_FORM.addEventListener('submit', (e) => {
        e.preventDefault();

        const registPayload = {
            email: EMAIL_INPUT.value,
            password: PASSWORD_INPUT.value
        }
        createUserWithEmailAndPassword(auth, registPayload.email, registPayload.password).then((res) => {
            console.log(res);
            if (res) {
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
            setTimeout(() => {
                window.location.href = "/login"
            }, 1000);
        })
    })

}

export default register;    