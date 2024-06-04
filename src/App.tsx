import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/Navbar/NavbarComponent";

function App() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}

export default App;
