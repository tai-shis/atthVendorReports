import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';


export async function fetchOrders(authToken: string, start_time: string, end_time: string, limit: number, sort_by: string) {
  // placeholder values for range
  try {
    await axios.post(
      `${apiURL}/vendor/update-orders`, 
      null,
      { headers: { Authorization: `Bearer ${authToken}` } }
    ); 
  
    const res = await axios.post(
      `${apiURL}/vendor/fetch-orders`,
       {start_time, end_time, limit, sort_by},
       { headers: { Authorization: `Bearer ${authToken}` } } 
      );
      
      console.log(res.data);

      return res.data.orders; 
  } catch(err: any) {
    throw new Error(err.response? err.response.data.error : err);
  }
}
