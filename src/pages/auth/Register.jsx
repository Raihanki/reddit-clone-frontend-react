import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ApiRequest from "../../api/RequestConfig";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerMutation = useMutation({
    mutationFn: (newUser) => ApiRequest.post("/auth/register", newUser),
    onSuccess: (data) => {
      navigate("/");
      console.log(data);
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerMutation.mutate(data);
  };

  return (
    <>
      <div className="shadow p-5 max-w-full lg:max-w-2xl">
        <div className="border-b pb-2">
          <h3 className="text-xl font-medium">Register</h3>
          <span className="text-sm text-gray-500">
            Already Have an Account?{" "}
            <Link to={"/login"} className="text-orange-600">
              Login Here
            </Link>
          </span>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullname" className="text-sm">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="text-sm">
              Password Confirmation
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              onChange={handleChange}
              className="w-full px-3 py-1.5 border rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 mt-5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
