import { useEffect, useId, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vendorID, setVendorID] = useState("");
  const [error, setError] = useState<string>('');
  const { register } = useAuth();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    await register(email, password, vendorID)
    .catch((err: Error) => {
      setError(err.message);
    });
  } 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vendor = urlParams.get('vendor');
    if (vendor) {
      setVendorID(vendor);
    } else {
      setError('Please get a valid registration link');
    }
  }, []);

  return(
    <div className='border-2 border-white rounded-2xl bg-white p-4 w-[320px]'>
      <h2 className='text-4xl text-center mb-2 font-normal'>Register</h2>
      <div>
        <label htmlFor="email" className='text-2xl font-light' >Email:</label><br/>
        <input 
          type="email" 
          id={useId()} 
          name="email" 
          placeholder="john@atth.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleRegister(e);
            }
          }}
          className='border-2 border-gray-300 rounded-lg p-2 w-full mb-8'
        />
      </div>
      <div>
        <label htmlFor="password" className='text-2xl font-light' >Password:</label><br/>
        <input 
          id={useId()} 
          type="password" 
          name="password" 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleRegister(e);
            }
          }}
          className='border-2 border-gray-300 rounded-lg p-2 w-full mb-4'
        />
      </div>
      {
        // my jank ass solution :) pt. 2
        error ? <p className="text-red-500 text-sm mb-2">{error}</p> : <p className='text-white text-sm mb-2'>nothing to see here</p>
      }
      <button
        type="button"
        onClick={handleRegister}
        className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-6 text-xl text-white w-full font-medium 
                   hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
      >
        Register
      </button>
    </div>
  );
}