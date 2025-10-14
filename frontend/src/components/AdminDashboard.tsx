// Its essentially a page, just not routed

import AdminVendors from "./AdminVendors";
import AdminUsers from "./AdminUsers";
import AdminCreateVendor from "./AdminCreateVendor";

export default function AdminDashboard({ adminToken }: { adminToken: string }) {
  return (
    <div className='md:w-5xl'>
      <h1 className='text-3xl font-normal text-center mb-2'>Admin Dashboard</h1>
      <div className="flex flex-row">
        <AdminVendors adminToken={adminToken}/>
        <AdminUsers adminToken={adminToken}/>
      </div>
      <AdminCreateVendor adminToken={adminToken} />
    </div>
  );
}