import { Outlet, Link } from "react-router";
// this is essentially a header lol.
export default function UnprotectedRoutes() {
  return (
    <div className='max-h-screen bg-gray-50'>
      <header className='py-6 px-16 bg-white border-b border-gray-200'>
        <Link to='/' className='text-4xl font-medium text-center md:hidden'>ATTH Vendor Dashboard</Link>
        <Link to='/' className='text-4xl font-medium text-center hidden md:block'>All Through The House Vendor Dashboard</Link>
      </header>
      <Outlet />
      <footer className='bg-white border-t border-gray-200 text-md fixed bottom-0 left-0 w-full px-16 py-6 flex flex-row'>
        <p className='mr-auto opacity-75'>&copy; All Through The House - All Rights Reserved</p>
        <Link to='/admin'className='ml-auto opacity-75 hover:underline' >Admin Login</Link>
      </footer>
    </div>
  );
}
