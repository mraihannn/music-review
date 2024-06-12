import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
