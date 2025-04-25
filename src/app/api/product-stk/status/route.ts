// app/api/transaction-status/route.ts

import { dbCon } from '@/libs/mongoose/dbCon';
import { Transaction } from '@/models/Transaction';

export async function GET(req: Request) {
  try {
    await dbCon();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const tx = await Transaction.findById(id);
    if (!tx) return new Response('Not found', { status: 404 });

    return Response.json({ status: tx.status });
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
