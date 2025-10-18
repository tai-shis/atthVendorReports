import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Link } from "lucide-react";
import { fetchVendors } from "../services/admin";

import type { Vendor } from "../models/vendor";

export default function AdminVendors({ adminToken }: { adminToken: string }) {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  async function refresh() {
    await handleVendorsFetch();
  }

  const handleVendorsFetch = useCallback(async () => {
    try {
      setVendors(await fetchVendors(adminToken));
    } catch(err) {
      console.error("Error fetching vendors:", err);
    }
  }, [adminToken]);

  function copyRegistrationLink(vendor_name: string, vendor_id: string) {
    // create the link
    const link = `${window.location.origin}/register?name=${vendor_name}&id=${vendor_id}`;
    navigator.clipboard.writeText(link);
  }

  useEffect(() => {
    // Fetch vendors from API
    handleVendorsFetch();
  }, [handleVendorsFetch]);

  return (
    <div className="border border-white rounded-xl p-4 m-2 bg-white w-1/3 h-96">
      <div className='flex flex-row border border-white border-b-black'>
        <h2 className="text-xl font-light pb-2 ">Vendors</h2>
        <button 
          className="ml-auto text-xl pb-2 font-light hover:underline hover:cursor-pointer" 
          onClick={refresh}
        >
            <RefreshCw />
        </button>
      </div>
      <div className='overflow-y-auto'>
        {vendors && vendors.map((vendor) => (
          <div className="p-2 border border-gray-500 font-light flex flex-row">
            <p className='truncate float'>{vendor.name} : {vendor.id}</p>
            <button 
              className='w-max hover:underline hover:cursor-pointer'
              onClick={() => copyRegistrationLink(vendor.name, vendor.id)}  
            >
              <Link />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
