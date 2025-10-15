// could add quantity?
export interface Order {
  id: string;
  item_id: string;
  vendor_name: string;
  // to get actual money do Number(bigint) / 100
  gross_sales: bigint;
  total_sales: bigint;
  closed_at: Date;
}