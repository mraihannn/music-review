import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import musicAPI from "../api/musicAPI";
import UserForm from "../components/UserForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    try {
      const { data } = await musicAPI.post("/api/users/login-google", null, {
        headers: {
          google_token: response.credential,
        },
      });

      localStorage.access_token = data.access_token;

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Succes!",
      });
      navigate("/");
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

  const handleSubmit = async (form) => {
    try {
      await musicAPI.post("/api/users/register", form);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Account created!",
      });
      navigate("/login");
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
    <div className="h-screen bg-slate-300 flex flex-row-reverse">
      <div className="flex-1 bg-white flex justify-center items-center">
        <div className="outline outline-primary w-1/2 p-10 rounded-2xl ">
          <h1 className=" mb-8 font-bold text-3xl text-center">Register</h1>
          <UserForm
            mode="register"
            handleSubmit={handleSubmit}
            handleCredentialResponse={handleCredentialResponse}
          />
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
