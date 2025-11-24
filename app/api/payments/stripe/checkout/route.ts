import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { studentId, amount, feeId, feeType } = await request.json()

    // Mock Stripe integration - In production, use actual Stripe API
    const checkoutSession = {
      id: `cs_${Math.random().toString(36).substr(2, 9)}`,
      clientSecret: `${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
      status: "open",
      paymentStatus: "unpaid",
      amount: amount * 100, // Convert to cents
      currency: "inr",
      studentId,
      feeId,
      feeType,
      createdAt: new Date(),
    }

    console.log("[Stripe] Checkout session created:", checkoutSession)

    return NextResponse.json(checkoutSession)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
