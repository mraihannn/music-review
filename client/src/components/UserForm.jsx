import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function UserForm({
  mode,
  handleSubmit,
  handleCredentialResponse,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ email, password });
      }}
      className="flex flex-col"
    >
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md mb-4 p-1 outline outline-primary"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md mb-4 p-1  outline outline-primary"
      />
      <button
        type="submit"
        className="rounded-md bg-primary text-white mb-4 p-1"
      >
        {mode === "register" ? "Register" : "Login"}
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
      {mode === "register" ? (
        <>
          <p className="mt-4 text-xs text-center">
            Already have account?{" "}
            <Link className="text-primary font-bold" to="/Login">
              Login
            </Link>
          </p>
        </>
      ) : (
        <p className="mt-4 text-xs text-center">
          Dont have account?{" "}
          <Link className="text-primary font-bold" to="/register">
            Register
          </Link>
        </p>
      )}
    </form>
  );
}
