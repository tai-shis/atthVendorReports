
import queryDB from '../models/database.js';
import { client } from '../models/square.js';
import { randomUUID } from 'crypto';
import type { Order } from '../models/order.js';

export async function vendorExists(vendor_id: string): Promise<boolean> {
  try {
    const res = await queryDB('SELECT * FROM vendor WHERE id = $1', [vendor_id]);
    return res.rowCount != 0;
  } catch(err: any) {
    throw new Error(`Database error when checking vendor: ${err.message}`);
  }
}

export async function getLastCall(): Promise<Date> {
  try {
    const res = await queryDB(`
      SELECT end_time 
      FROM call_history 
      WHERE status = $1 
      ORDER BY end_time DESC 
      LIMIT 1`, 
      ['success']);
    // this table should never be empty, but here
    if (res.rowCount === 0) {
      // offset to yesterday
      const today = new Date();
      return new Date(today.getTime() - 24 * 60 * 60 * 1000);
    }

    return res.rows[0].end_time;
  } catch(err: any) {
    throw new Error(`Database error when fetching last call: ${err.message}`);
  }
}

export async function insertCallAttempt(start_time: Date, end_time: Date): Promise<string> {
  // Inserts the attempted call with status failed, to be updated after call is made and verified
  try {
    const id = randomUUID();
    await queryDB(
      `INSERT INTO call_history(id, start_time, end_time, status)
      VALUES($1, $2, $3, $4)`,
      [id, start_time.toISOString(), end_time.toISOString(), 'failed']
    );
    return id;
  } catch(err: any) {
    throw new Error(`Database error when inserting call time: ${err.message}`);
  }
}

export async function searchOrders(lastCall: Date, callTime: Date) { 
  try {
    const res = await client.orders.search({
      locationIds: [ 
        process.env.SQUARE_LOCATION_ID || '' // dont forget the environment variable >:)
      ],
      query: {
        filter: {
          stateFilter: {
            states: ['COMPLETED']
          },
          dateTimeFilter: {
            createdAt: {
              startAt: lastCall.toISOString(),
              endAt: callTime.toISOString()
            },
          },
        },
      },
      // Without this field (defaults to false), you dont get any price details
      returnEntries: false, // this is a stupid field
    });

    if (!res.orders) {
      return [] as Order[];
    }
    
    // ugly ass parse
    const orders: Order[] = [];
    for (const order of res.orders) {
      for (const item of order.lineItems!) {
        if(!order.id || !item.uid || !item.name || !item.grossSalesMoney || !item.totalMoney || !order.closedAt) { 
          continue;
        }

        if(!item.grossSalesMoney.amount || !item.totalMoney.amount) {
          continue;
        }

        orders.push({
          id: order.id,
          item_id: item.uid,
          vendor_name: item.name,
          gross_sales: item.grossSalesMoney.amount,
          total_sales: item.totalMoney.amount,
          closed_at: new Date(order.closedAt),
        });
      }
    }
    
    return orders;
  } catch(err: any) {
    throw new Error(`Square API error when fetching orders: ${err.message}`);
  }
}


export async function updateCallAttempt(id: string, status: string): Promise<void> {
  try {
    await queryDB(
      `UPDATE call_history
      SET status = $1
      WHERE id = $2`,
      [status, id]
    );
  } catch(err: any) {
    throw new Error(`Database error when updating call status: ${err.message}`);
  } 
}

export async function insertOrders(orders: Order[]): Promise<void> {
  try {
    for (const order of orders) {
      await queryDB(
        `INSERT INTO orders(id, item_id, vendor_name, gross_sales, total_sales, closed_at)
        VALUES($1, $2, $3, $4, $5, $6)`,
        [
          order.id,
          order.item_id,
          order.vendor_name,
          order.gross_sales,
          order.total_sales,
          order.closed_at,
        ]
      );
    }
  } catch(err: any) {
    throw new Error(`Database error when inserting orders: ${err.message}`);
  }
}

export async function getOrders(vendor_name: string, start_time: Date, end_time: Date, limit: number, sort_by: string): Promise<Order[]> {
  try {
    const res = await queryDB(
      `SELECT * 
       FROM orders 
       WHERE 
        vendor_name = $1 AND
        closed_at >= $2::timestamptz AND
        closed_at <= $3::timestamptz
       ORDER BY closed_at ${sort_by}
       LIMIT $4`,
      [vendor_name, start_time.toISOString(), end_time.toISOString(), limit]
    );
    return res.rows;
  } catch(err: any) {
    throw new Error(`Database error when fetching orders: ${err.message}`);
  }
}


// 