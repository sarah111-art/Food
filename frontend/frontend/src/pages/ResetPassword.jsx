import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/Login.png";

const ResetPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${backendUrl}/api/user/reset-password`, {
        email,
        token,
        newPassword,
      });
      toast.success("Password reset successfully! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error resetting password");
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
            alt="Reset Password"
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
              <h3 className=" text-blue-600 bold-36">Reset Password</h3>
            </div>
            <div>
              <label htmlFor="email" className="medium-14">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
            </div>
            <div>
              <label htmlFor="token" className="medium-14">
                Reset Token
              </label>
              <input
                type="text"
                placeholder="Reset token"
                value={token}
                required
                onChange={e => setToken(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="medium-14">
                New Password
              </label>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                required
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-1 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-dark w-full mt-5 !py-[7px] !rounded disabled:opacity-60"
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;