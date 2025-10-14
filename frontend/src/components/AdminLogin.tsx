// Its essentially a page, just not routed

import { useId, useState } from 'react';

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

export default function AdminLogin({setIsAdmin, setAdminToken}: {
  setIsAdmin: (isAdmin: boolean) => void, 
  setAdminToken: (token: string) => void
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(username == ADMIN_USERNAME && password == ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminToken(ADMIN_TOKEN);
    } else {
      // Scare em off, ooooh so spooky
      alert("Invalid admin credentials. Alerting administrators.");
    }
  }

  return (
    <div className='border-2 border-white rounded-2xl bg-white p-4 w-[320px]'>
      <h2 className='text-4xl text-center mb-2 font-normal'>Admin Login</h2>
      <div>
        <label htmlFor="Username" className='text-2xl font-light' >Username:</label><br/>
        <input 
          type="text" 
          id={useId()} 
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdminLogin(e);
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
              handleAdminLogin(e);
            }
          }}
          className='border-2 border-gray-300 rounded-lg p-2 w-full mb-4'
        />
      </div>
      <button
        type="button"
        onClick={handleAdminLogin}
        className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-6 text-xl text-white w-full font-medium 
                    hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
      >
        Log In
      </button>
    </div>
  );
}