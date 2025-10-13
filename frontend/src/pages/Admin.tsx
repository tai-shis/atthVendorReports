import AdminLogin from "../components/AdminLogin";
import { useState } from "react";


export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <div className='h-dvh py-16 flex flex-col items-center'>
      {isAdmin 
      ?
        <div className='text-2xl font-light'>Admin dashboard placeholder</div>
      :
        <AdminLogin setIsAdmin={setIsAdmin}/>
      }
    </div>
  );
}