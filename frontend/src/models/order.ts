export type Order = {
  id: string;
  item_id: string;
  vendor_name: string;
  gross_sales: bigint;
  total_sales: bigint;
  closed_at: Date;
}