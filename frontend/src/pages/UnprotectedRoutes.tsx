import { Outlet } from "react-router";

// this is essentially a header lol.
export default function UnprotectedRoutes() {
  return (
    <div className='h-screen bg-gray-100'>
      <header className='py-6 px-16 bg-white'>
        <a href='/' className='text-4xl font-medium text-center md:hidden'>ATTH Vendor Dashboard</a>
        <a href='/' className='text-4xl font-medium text-center hidden md:block'>All Through The House Vendor Dashboard</a>
      </header>
      <Outlet />
    </div>
  );
}
