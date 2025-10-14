// could add quantity?
export interface Order {
  id: string;
  item_id: string;
  vendor_name: string;
  gross_sales: number;
  total_sales: number;
  closed_at: Date;
}