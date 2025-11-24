"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PaymentModalProps {
  fee: any
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({ fee, onClose, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/payments/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: fee.studentId,
          amount: fee.amount,
          feeId: fee.id,
          feeType: fee.feeType,
        }),
      })

      const session = await response.json()
      console.log("[Payment] Session created:", session)

      // In production, redirect to Stripe checkout
      // window.location.href = session.url;

      // Mock success for demo
      alert(`Payment of ₹${fee.amount} initiated. Session ID: ${session.id}`)
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Payment failed:", error)
      alert("Payment failed. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-light">Payment Details</h2>
          <p className="text-sm text-muted-foreground mt-2">Complete your payment securely</p>
        </div>

        {/* Fee Information */}
        <div className="space-y-3 p-4 bg-muted/30 rounded">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee Type:</span>
            <span className="font-medium">{fee.feeType.replace(/_/g, " ")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Due Date:</span>
            <span className="font-medium">{fee.dueDate}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between text-base">
            <span className="font-medium">Amount:</span>
            <span className="text-lg font-light">₹{fee.amount}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="text-sm font-medium block mb-3">Payment Method</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Credit/Debit Card</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">UPI</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:bg-muted/30">
              <input
                type="radio"
                value="netbanking"
                checked={paymentMethod === "netbanking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">Net Banking</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handlePayment} className="flex-1" disabled={loading}>
            {loading ? "Processing..." : `Pay ₹${fee.amount}`}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">Your payment is secure and processed through Stripe</p>
      </Card>
    </div>
  )
}

export function PaymentWidget({ fee }: { fee: any }) {
  const [showPayment, setShowPayment] = useState(false)

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setShowPayment(true)} className="text-xs">
        Pay Now
      </Button>
      {showPayment && <PaymentModal fee={fee} onClose={() => setShowPayment(false)} onSuccess={() => {}} />}
    </>
  )
}
