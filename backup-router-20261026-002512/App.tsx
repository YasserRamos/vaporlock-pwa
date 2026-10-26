import './../App.css'
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import AppRouter from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}