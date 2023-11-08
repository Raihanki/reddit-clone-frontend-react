import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiRequest from "../../api/RequestConfig";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, authenticatedUser } = useAuth();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginMutation = useMutation({
    mutationFn: (user) => ApiRequest.post("/auth/login", user),
    onSuccess: (data) => {
      navigate("/");
      login(data.data.user);
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(data);
  };

  return (
    <>
      <div className="shadow p-5 max-w-full lg:max-w-2xl">
        <div className="border-b pb-2">
          <h3 className="text-xl font-medium">Login</h3>
          <span className="text-sm text-gray-500">
            Don't Have an Account?{" "}
            <Link to={"/register"} className="text-orange-600">
              Register Here
            </Link>
          </span>
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
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
          <div>
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
          <button
            type="submit"
            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm capitalize shadow-sm text-gray-50 mt-5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-75"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
