import React, { useEffect, useState } from "react";
import ruet_logo from "../assets/ruet-logo.png";
import { useDispatch, useSelector } from "react-redux";
import ruet_library from "../assets/ruet-library.png";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    const data = new FormData();
    data.append("email", email);       // fixed key
    data.append("password", password); // fixed key
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [error, message, dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={ruet_logo} alt="RUET logo" className="h-24 w-auto" />
              </div>
            </div>

            <h1 className="text-4xl font-medium text-center mb-6">
              Welcome back to RUET Smart Library!
            </h1>
            <p className="text-gray-800 text-center mb-8">
              Enter your email and password to log in.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <Link to="/password/forgot" className="font-semibold text-black">
                  Forgot password?
                </Link>
              </div>

              <div className="block md:hidden font-semibold mb-5">
                <p>
                  If you don't have an account, kindly sign up{" "}
                  <Link to="/register" className="text-sm text-gray-500 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading ? "true" : "false"}
                className={`border-2 mt-2 border-black w-full font-semibold py-2 rounded-lg transition
                  ${loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-white hover:text-black"}`}
              >
                {loading ? "Signing in..." : "Log In to Continue"}
              </button>

              <p className="text-sm text-gray-500 text-center mt-3">
                Secure access for students and admins
              </p>
            </form>
          </div>
        </div>

        {/* right side */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img src={ruet_library} alt="RUET library" className="mb-12 h-44 w-auto" />
            </div>
            <p className="text-gray-300 mb-6">
              If you don't have an account, please sign up.
            </p>
            <Link
              to="/register"
              className="border-2 mt-2 border-white px-8 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition inline-block"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
