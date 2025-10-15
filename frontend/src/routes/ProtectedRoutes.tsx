import { useAuth } from "../hooks/useAuth";
import { Loader2Icon } from "lucide-react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex justify-center w-screen h-screen items-center'>
        <Loader2Icon className="w-10 h-10 animate-spin" />
      </div>
    );
  } 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}