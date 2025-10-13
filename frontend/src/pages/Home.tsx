import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className='h-dvh py-8'>
      {user ? (
        <>
          <h1 className='text 6xl text-center font-normal m-6'>Welcome, {user.vendorName}</h1>
        </>
      ): (
        <div className='flex flex-col items-center my-16'>
          <h1 className='text-5xl text-center font-light m-4'>Welcome to your ATTH Vendor Dashboard</h1>
          <a href="/login" 
            className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-6 text-2xl text-white m-4 font-medium
                     hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
          >
            Log In
          </a>
          <p className="text-lg m-4 font-light opacity-80">Don't have an account? Contact us with your vendor name to get your registration link!</p>
        </div>
      )}
    </div>
  );
}
