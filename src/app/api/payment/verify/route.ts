import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export async function POST(request: NextRequest) {
  if (!razorpay || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Payment service not configured" },
      { status: 503 }
    );
  }

  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await request.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Verify the payment with Razorpay API
    // 2. Update the payment status in your database
    // 3. Grant premium access to the user

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
