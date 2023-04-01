import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth } from "../firebase";

const initialState = {
  firstName: "",
  lastName: "",
  eamil: "",
  password: "",
  confirmPassword: ""
};
export default function Auth({ setActive }) {
  const [state, setState] = useState(initialState);
  const [register, setRegister] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e["target"].name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!register) {
      if(email && password){
        const {user} = await signInWithEmailAndPassword(auth , email , password);
        setActive("home")
      }else {
        return toast.error("All fields are required")
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password not match");
      } else if(password.length < 6){
        return toast.error('Password must be 6 or more characters')
      }
      if (firstName && email && lastName && password && confirmPassword) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive("home");
      } else{
        return toast.error("All fields are required")
      }
    }
    navigate("/")
  };
  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!register ? "Login" : "SignUp"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-item-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {register && (
                <>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      id=""
                    />
                  </div>
                  <div className="col-6 py-3">
                    <input
                      type="text"
                      className="form-control input-text-box"
                      placeholder="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      id=""
                    />
                  </div>
                </>
              )}
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  id=""
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="Passowrd"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  id=""
                />
              </div>
              {register && (
                <>
                  <div className="col-12 py-3">
                    <input
                      type="password"
                      className="form-control input-text-box"
                      placeholder="Confirm Passowrd"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="col-12 text-center py-3">
                <button
                  className={`btn ${!register ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                >
                  {!register ? "signin" : "signup"}
                </button>
              </div>
            </form>
          </div>
          <div>
            {!register ? (
              <>
                <div className="text-center justify-content-center mt-2 py-2">
                  <p className="small fw-bold mt-2 py-2 mb-0">
                    Don't have an account?
                    <span
                      className="link-danger"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                      onClick={() => setRegister(true)}
                    >
                      Signup
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center justify-content-center mt-2 py-2">
                  <p className="small fw-bold mt-2 py-2 mb-0">
                    Already have an account?
                    <span
                      className="link-danger"
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => setRegister(false)}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
