import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CoinbaseService } from '@/lib/services/coinbase';

export async function GET(request: NextRequest) {
  try {
    const coinbaseService = new CoinbaseService();
    const marketData = await coinbaseService.getMarketData();
    return NextResponse.json(marketData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}