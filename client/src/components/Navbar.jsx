import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-primary flex justify-between items-center px-10 sm:px-40 py-2 text-white">
      <Link to="/">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src="/logo.jpeg"
            className="w-16 h-16 rounded-full object-cover object-center scale-150"
            alt="logo"
          />
        </div>
      </Link>

      <button
        className="text-xl "
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </nav>
  );
}
