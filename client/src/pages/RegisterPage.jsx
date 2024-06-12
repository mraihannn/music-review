import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login-google",
        null,
        {
          headers: {
            google_token: response.credential,
          },
        }
      );

      localStorage.access_token = data.access_token;

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Succes!",
      });
      // navigate("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "errpr",
          title: "Error",
          text: "Somethings Gone Wrong!",
        });
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.access_token = data.access_token;

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Succes!",
      });
      // navigate("/");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Somethings Gone Wrong!",
        });
      }
    }
  };

  return (
    <div className="h-screen bg-slate-300 flex ">
      <div className="flex-1 bg-white flex justify-center items-center">
        <div className="outline outline-[#172741] w-1/2 p-10 rounded-2xl ">
          <h1 className=" mb-4 text-3xl">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" mb-4 p-1 outline outline-[#172741]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" mb-4 p-1  outline outline-[#172741]"
            />
            <button type="submit" className="bg-[#172741] text-white mb-4">
              Register
            </button>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleCredentialResponse(credentialResponse);
              }}
              onError={() => {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Login Failed",
                });
              }}
            />
            ;
          </form>
        </div>
      </div>

      <div className="flex-1 ">
        <img
          src="/cover_login.jpeg"
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
