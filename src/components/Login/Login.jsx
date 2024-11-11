import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();
  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // default value
    setSuccess(false);
    setLoginError("");

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        if (!result.user.emailVerified) {
          setLoginError("Please verify your email");
        } else {
          setSuccess(true);
        }
      })

      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const handelForgetPassword = () => {
    console.log("object", emailRef.current.value);
    const email = emailRef.current.value;

    if (!email) {
      console.log("Please provide a valid email.");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Reset email sent, please check you email address.");
      });
    }
  };
  return (
    <div>
      <h3 className="text-3xl text-center my-5">Login</h3>
      <form
        onSubmit={handelLogin}
        className="max-w-2xl mx-auto border py-12 px-7 border-gray-700 rounded-lg shadow-xl"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label onClick={handelForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {success && (
        <p className="text-green-500 text-center my-5">Login Successfully</p>
      )}
      {loginError && (
        <p className="text-red-500 text-center my-5">Login failed</p>
      )}
      <p className="text-center my-5">
        New to this website plese{" "}
        <Link to={"/register"} className="text-green-600 font-bold">
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default Login;
