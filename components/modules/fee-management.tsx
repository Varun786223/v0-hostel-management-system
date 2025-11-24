"use client"

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchFees } from "@/lib/data"
import { useState } from "react"

export function FeeManagement() {
  const { data: fees, isLoading } = useSWR("fees", fetchFees, { revalidateOnFocus: true, revalidateInterval: 3000 })

  const [selectedFee, setSelectedFee] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)

  const stats = fees
    ? {
        totalFees: fees.reduce((sum, f) => sum + f.amount, 0),
        paidFees: fees.filter((f) => f.status === "PAID").reduce((sum, f) => sum + f.amount, 0),
        pendingFees: fees.filter((f) => f.status === "PENDING").reduce((sum, f) => sum + f.amount, 0),
        overdueFees: fees.filter((f) => f.status === "OVERDUE").reduce((sum, f) => sum + f.amount, 0),
      }
    : { totalFees: 0, paidFees: 0, pendingFees: 0, overdueFees: 0 }

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  const handlePayClick = (fee: any) => {
    setSelectedFee(fee)
    setShowPayment(true)
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Fee Management</h1>
        <p className="text-gray-500 mt-2">Track and manage student fees</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Total Fees</div>
          <div className="text-2xl font-semibold text-gray-900">₹{(stats.totalFees / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-500 mt-2">All fees combined</div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Paid</div>
          <div className="text-2xl font-semibold text-green-600">₹{(stats.paidFees / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-500 mt-2">Received</div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Pending</div>
          <div className="text-2xl font-semibold text-gray-900">₹{(stats.pendingFees / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-500 mt-2">Awaiting payment</div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-500 mb-2 font-medium">Overdue</div>
          <div className="text-2xl font-semibold text-red-600">₹{(stats.overdueFees / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-500 mt-2">Past due date</div>
        </Card>
      </div>

      {/* Fee Records Table */}
      <Card className="p-6 overflow-hidden bg-white border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Fee Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Student</th>
                <th className="text-left p-3 font-semibold text-gray-700">Fee Type</th>
                <th className="text-left p-3 font-semibold text-gray-700">Amount</th>
                <th className="text-left p-3 font-semibold text-gray-700">Due Date</th>
                <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {fees && fees.length > 0 ? (
                fees.map((fee) => (
                  <tr key={fee.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{fee.studentName}</td>
                    <td className="p-3 text-gray-600">{fee.feeType.replace(/_/g, " ")}</td>
                    <td className="p-3 font-semibold text-gray-900">₹{fee.amount}</td>
                    <td className="p-3 text-gray-600 text-xs">{fee.dueDate}</td>
                    <td className="p-3">
                      <Badge
                        className={`text-xs ${
                          fee.status === "PAID"
                            ? "bg-green-100 text-green-800"
                            : fee.status === "OVERDUE"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {fee.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {fee.status === "PENDING" && (
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-900 text-white text-xs"
                          onClick={() => handlePayClick(fee)}
                        >
                          Pay
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No fees
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Modal */}
      {showPayment && selectedFee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white border border-gray-200">
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Pay Fee</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedFee.studentName}</p>
              </div>

              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Amount Due</p>
                  <p className="text-2xl font-semibold text-gray-900">₹{selectedFee.amount}</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500">Fee Type</p>
                  <p className="text-sm font-medium text-gray-900">{selectedFee.feeType.replace(/_/g, " ")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-black hover:bg-gray-900 text-white">Pay with Stripe</Button>
                <Button
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
