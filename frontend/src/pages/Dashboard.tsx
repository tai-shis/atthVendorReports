import Nav from "../components/Nav";
import { Outlet } from "react-router";

export default function Dashboard() { 
  return (
    <div className="flex flex-row max-h-screen min-h-screen bg-gray-50">
      <Nav/>
      <Outlet/>
    </div>
  );
}