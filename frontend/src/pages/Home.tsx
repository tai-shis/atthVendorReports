import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className='h-dvh py-8'>
      {user ? (
        <div className='flex flex-col items-center my-16'>
          <h1 className='text-5xl text-center font-nornal m-6'>Welcome!</h1>
          <p className='text-3xl font-light mt-4'>Click below to proceed to your</p>
          <Link to="/dashboard/" 
            className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-8 text-3xl text-white m-4 font-medium
                     hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
          >
            Dashboard
          </Link>
        </div>
      ): (
        <div className='flex flex-col items-center my-16'>
          <h1 className='text-5xl text-center font-normal m-4'>Welcome to your ATTH Vendor Dashboard</h1>
          <Link to="/login" 
            className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-8 text-3xl text-white m-4 font-medium
                     hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
          >
            Log In
          </Link>
          <p className="text-lg m-4 font-light opacity-80">Don't have an account? Contact us with your vendor name to get your registration link!</p>
        </div>
      )}
    </div>
  );
}
