import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";
import { useState } from "react";

export default function Admin() {
  // true for testing
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  
  return (
    <div className='h-dvh py-4 flex flex-col items-center'>
      {isAdmin 
      ?
        <AdminDashboard adminToken={adminToken} />
      :
        <AdminLogin setIsAdmin={setIsAdmin} setAdminToken={setAdminToken}/>
      }
    </div>
  );
}