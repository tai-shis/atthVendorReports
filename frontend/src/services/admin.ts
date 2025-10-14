import axios from "axios";
import type { Vendor } from "../models/vendor";
import type { User } from "../models/user";

const apiURL = import.meta.env.API_URL || 'http://localhost:8080';

export async function fetchUsers(adminToken: string): Promise<User[]> {
  const res = await axios.get(
    `${apiURL}/admin/fetch-users`,
    {headers: { 'Authorization': adminToken }}
  ).catch((err) => {
    throw new Error(err.response.data.error);
  });
  console.log(res.data.users);
  return res.data.users as User[];
}

export async function fetchVendors(adminToken: string): Promise<Vendor[]> {
  // This header should have Bearer but i skipped it in the backend
  const res = await axios.get(
    `${apiURL}/admin/fetch-vendors`,
    {headers: { 'Authorization': adminToken }}
  ).catch((err) => {
    throw new Error(err.response.data.error);
  });
  return res.data.vendors as Vendor[];
}

export function createVendor() {
  // TODO: creates a new valid vendor in the database
}


