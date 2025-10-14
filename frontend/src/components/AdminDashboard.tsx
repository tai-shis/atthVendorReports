import AdminVendors from "./AdminVendors";
import AdminUsers from "./AdminUsers";
// import AdminOrders from "./AdminOrders";

export default function AdminDashboard({ adminToken }: { adminToken: string }) {
  return (
    <div className='md:w-5xl'>
      <h1 className='text-3xl font-normal text-center mb-2'>Admin Dashboard</h1>
      <div className="flex flex-row">
        <AdminVendors adminToken={adminToken}/>
        <AdminUsers adminToken={adminToken}/>
      </div>
    </div>
  );
}