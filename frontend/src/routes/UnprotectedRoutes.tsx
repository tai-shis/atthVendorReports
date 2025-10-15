import { Outlet } from "react-router";

// this is essentially a header lol.
export default function UnprotectedRoutes() {
  return (
    <div className='max-h-screen bg-gray-100'>
      <header className='py-6 px-16 bg-white'>
        <a href='/' className='text-4xl font-medium text-center md:hidden'>ATTH Vendor Dashboard</a>
        <a href='/' className='text-4xl font-medium text-center hidden md:block'>All Through The House Vendor Dashboard</a>
      </header>
      <Outlet />
      <footer className='bg-white text-md fixed bottom-0 left-0 w-full px-16 py-6 flex flex-row'>
        <p className='mr-auto opacity-75'>&copy; All Through The House - All Rights Reserved</p>
        <a className='ml-auto opacity-75 hover:underline' href='/admin'>Admin Login</a>
      </footer>
    </div>
  );
}
