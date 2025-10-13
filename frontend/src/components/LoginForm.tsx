import { useId, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>('');
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password)
    .catch((err: Error) => {
      setError(err.message);
    });
  } 

  return(
    <div className='border-2 border-white rounded-2xl bg-white p-4 w-[320px]'>
      <h2 className='text-4xl text-center mb-2 font-normal'>Log In</h2>
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
              handleLogin(e);
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
              handleLogin(e);
            }
          }}
          className='border-2 border-gray-300 rounded-lg p-2 w-full mb-4'
        />
      </div>
      {
        error ? <p className="text-red-500 text-sm mb-2">{error}</p> : <p className='text-white text-sm mb-2'>nothing to see here</p>
      }
      <button
        type="button"
        onClick={handleLogin}
        className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-6 text-xl text-white w-full font-medium 
                   hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
      >
        Log In
      </button>
      <p className="text-md m-4 font-light opacity-80">Don't have an account? Contact us with your vendor name to get your registration link!</p>
    </div>
  );
  
}