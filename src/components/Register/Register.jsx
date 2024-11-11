import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handelRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const terms = event.target.terms.checked;

    console.log(email, password, name, photo, terms);

    // setDefault value
    setErrorMessage("");
    setSuccess(false);

    if (password.length < 6) {
      return setErrorMessage("Password should be 6 character or longer.");
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!regex.test(password)) {
      return setErrorMessage("Give strong password!");
    }

    if(!terms){
      return setErrorMessage("Please accept out terms and conditions.")
     }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((restlt) => {
        console.log(restlt.user);
        setSuccess(true);

        // send verification email address
        sendEmailVerification(auth.currentUser)
        .then(()=> {
          console.log('Verification email send.');
        });

        // update profile name and profile
        const profile = {
          displayName:name,
          photoURL:photo,
        }
        updateProfile(auth.currentUser, profile)
        .then(()=>{
          console.log('User profile updated.');
        })
        .catch((error)=> {
          console.log('Profile updated error.');
        })

      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div>
      <h3 className="text-4xl text-center my-5">Register</h3>
      <form
        onSubmit={handelRegister}
        className="flex flex-col gap-5 max-w-2xl mx-auto border py-12 px-7 border-gray-700 rounded-lg shadow-xl"
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            name="name"
            className="grow"
            placeholder="Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            name="photo"
            className="grow"
            placeholder="Photo url"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="grow"
            placeholder="Password"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 bg-transparent"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </label>
        <div className="form-control">
          <label className="label justify-start gap-5 cursor-pointer">
            <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text">Accept our terms and condition?</span>
          </label>
        </div>
        <button className="btn btn-block">Submit</button>
      </form>
      {errorMessage && (
        <p className="text-red-500 text-center my-5">{errorMessage}</p>
      )}
      {success && (
        <p className="text-green-500 text-center my-5">
          Successfully created user!
        </p>
      )}
      <p className="text-center my-5">
        Already have an accout? Please <Link to={"/login"} className="text-green-600 font-bold">Login</Link>
      </p>
    </div>
  );
};

export default Register;
