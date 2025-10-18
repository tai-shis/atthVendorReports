import { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "../services/admin";
import { RefreshCw } from "lucide-react";

import type { User } from "../models/user";

export default function AdminUsers({ adminToken }: { adminToken: string }) {
  const [users, setUsers] = useState<User[]>([]);

  async function refresh() {
    await handleUsersFetch();
  }

  const handleUsersFetch = useCallback(async () => {
    try {
      setUsers(await fetchUsers(adminToken));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, [adminToken]);

  useEffect(() => {
    

    handleUsersFetch();
  }, [handleUsersFetch]);

  return(
    <div className="border border-white rounded-xl p-4 m-2 bg-white w-2/3 h-96">
      <div className='flex flex-row border border-white border-b-black'>
        <h2 className='text-xl font-light pb-2'>Registered Users</h2>
        <button 
          className="ml-auto text-xl pb-2 font-light hover:underline hover:cursor-pointer" 
          onClick={refresh}
        >
            <RefreshCw />
        </button>
      </div>
      <div className="overflow-y-auto">
        {users && users.map((user) => (
          <div className="p-2 border border-gray-500 font-light flex flex-row">
            <p className='truncate float'>{user.vendor_name} : {user.email} : {user.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}