import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AppRouter from "./router";
// import ConnectionStatus from "../components/layout/ConnectionStatus";

export default function App() {
  return (
    <BrowserRouter>
      {/* <ConnectionStatus /> */}
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}
