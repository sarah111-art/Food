import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/Login.png";

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      toast.success("Check your email for the reset token!");
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error sending email");
    }
    setIsLoading(false);
  };

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        {/* Image side */}
        <div className="w-1/2 hidden sm:block">
          <img
            src={loginImg}
            alt="Forgot Password"
            className="object-cover aspect-square h-full w-full"
          />
        </div>
        {/* Form side */}
        <div className="flex w-full sm:w-1/2 justify-start items-start pl-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
            <div className="w-full mb-4">
              <h3 className="bold-36  text-blue-600">Forgot Password</h3>
            </div>
            <div>
              <label htmlFor="email" className="medium-14">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-dark w-full mt-5 !py-[7px] !rounded disabled:opacity-60"
            >
              {isLoading ? "Processing..." : "Send Reset Token"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;