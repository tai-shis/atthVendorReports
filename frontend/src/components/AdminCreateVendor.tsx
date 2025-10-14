import { useState } from "react";
import { createVendor } from "../services/admin";

export default function AdminCreateUser({ adminToken }: { adminToken: string }) {
  const [vendorName, setVendorName] = useState<string>("");

  async function handleCreateVendor(e: React.FormEvent) {
    e.preventDefault();
    await createVendor(adminToken, vendorName)
    .catch((err: Error) => {
      console.error("Error creating vendor:", err.message);
    });
  }

  return(
    <div className="border border-white rounded-xl p-4 m-2 bg-white w-1/2 h-32">
      <div className='flex flex-row border border-white border-b-black'>
        <h2 className='text-xl font-light pb-2'>Create Vendor</h2>
      </div>
      <div className='flex flex-row mt-4'>
        <input 
          type="vendor_name"
          placeholder="Vendor Name"
          className="border border-gray-300 rounded-md p-2 mr-2 w-2/3" 
          value={vendorName}
          onChange={(e) => {
            setVendorName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCreateVendor(e);
            }
          }}
        />
        <button
          type="button"
          onClick={handleCreateVendor}
          className='border-2 border-blue-500 rounded-xl bg-blue-500 py-2 px-6 text-white w-1/3 font-normal 
                     hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300'
        >
          Create Vendor
        </button>
      </div>
    </div>
  );
}