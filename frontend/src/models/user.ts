export class User {
  id: string;
  email: string;
  vendor_id: string;
  vendor_name: string;

  constructor(data: { id: string; email: string; vendor_id: string; vendor_name: string }) {
    this.id = data.id;
    this.email = data.email;
    this.vendor_id = data.vendor_id;
    this.vendor_name = data.vendor_name;
  }
};