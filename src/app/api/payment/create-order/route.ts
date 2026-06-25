import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export async function POST(request: NextRequest) {
  if (!razorpay) {
    return NextResponse.json(
      { error: "Payment service not configured" },
      { status: 503 }
    );
  }

  try {
    const { amount, tier } = await request.json();

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        tier: tier,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
