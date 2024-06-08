import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <ToastContainer />,
    </>
  );
}

export default App;
