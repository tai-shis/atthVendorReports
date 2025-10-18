import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchOrders } from '../services/vendor';

import type { Order } from '../models/order';

export  default function DashboardOrders() {
  const { authToken, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [startTime, setStartTime] = useState<string>('2024-10-16');
  const [endTime, setEndTime] = useState<string>('2025-10-16');
  const [limit, setLimit] = useState<number>(100);
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('DESC');
  

  useEffect(() => {
    // Fetch orders from backend
    async function handleFetchOrders() {
      if (!authToken) {
        return <Navigate to="/login" replace />;
      }

      try {
        const fetchedOrders: Order[] = await fetchOrders(authToken, startTime, endTime, limit, sortBy);
        console.log(fetchedOrders);
        setOrders(fetchedOrders);
      } catch (error: unknown) {
        console.error('Error fetching orders:', error);
      }
    }

    handleFetchOrders();
  }, [authToken, startTime, endTime, limit, sortBy]);

  return (
    <div className=" mx-auto w-xl">
      <h1 className='my-4 text-2xl font-medium'>Order History</h1>
      <div className='border border-gray-200 bg-white p-6 rounded-xl'>
        <h2 className='text-lg pb-4 font-medium'>Overview</h2>
        <div className='text-lg font-normal border-b border-gray-200 flex flex-row gap-4'>
          <p className='w-48'>Date</p>
          <p className='w-36'>Gross Sales</p>
          <p className='w-36'>Total Sales</p>
        </div>
        <div className='h-72 overflow-y-auto border-t border-gray-400'>
          {orders && orders.map((order) => (
            <div key={order.id} className='py-4 border-b border-gray-200 rounded-lg flex flex-row gap-4'>
              <p className='font-normal w-48'>
                {new Date(order.closed_at).toLocaleString('en-US', { timeZone: 'America/Denver'})}
              </p>
              <p className='font-light w-36'>${(Number(order.gross_sales)/100).toFixed(2)}</p>
              <p className='font-light w-36'>${(Number(order.total_sales)/100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}