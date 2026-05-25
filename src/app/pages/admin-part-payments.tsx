import { useState } from "react";
import { Search, Check, X, MessageCircle, TrendingUp, AlertTriangle, User } from "lucide-react";

interface BookingRequest {
  id: string;
  customer: string;
  email: string;
  phone: string;
  product: string;
  productImage: string;
  productPrice: number;
  originalBooking: number;
  requestedBooking: number;
  customerOrders: number;
  customerSpent: number;
  riskScore: "low" | "medium" | "high";
  notes: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export function AdminPartPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [counterOffer, setCounterOffer] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const requests: BookingRequest[] = [
    {
      id: "BK-10234",
      customer: "Alice Brown",
      email: "alice.b@example.com",
      phone: "+234 801 234 5678",
      product: "MacBook Pro M3",
      productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100",
      productPrice: 1999,
      originalBooking: 600,
      requestedBooking: 400,
      customerOrders: 12,
      customerSpent: 8450,
      riskScore: "low",
      notes: "Regular customer, always pays on time. Would like to reduce booking amount for this purchase.",
      date: "2026-05-23 09:30 AM",
      status: "pending",
    },
    {
      id: "BK-10233",
      customer: "David Martinez",
      email: "d.martinez@example.com",
      phone: "+234 802 345 6789",
      product: "iPhone 15 Pro Max",
      productImage: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=100",
      productPrice: 1299,
      originalBooking: 400,
      requestedBooking: 250,
      customerOrders: 5,
      customerSpent: 2100,
      riskScore: "medium",
      notes: "Customer has made several purchases but requesting significant reduction in booking amount.",
      date: "2026-05-22 03:15 PM",
      status: "pending",
    },
    {
      id: "BK-10232",
      customer: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "+234 803 456 7890",
      product: "Samsung 4K Smart TV",
      productImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100",
      productPrice: 899,
      originalBooking: 300,
      requestedBooking: 150,
      customerOrders: 2,
      customerSpent: 450,
      riskScore: "high",
      notes: "New customer with limited purchase history requesting 50% reduction.",
      date: "2026-05-22 11:20 AM",
      status: "pending",
    },
    {
      id: "BK-10231",
      customer: "Frank Johnson",
      email: "frank.j@example.com",
      phone: "+234 804 567 8901",
      product: "Sony WH-1000XM5",
      productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100",
      productPrice: 329,
      originalBooking: 100,
      requestedBooking: 80,
      customerOrders: 8,
      customerSpent: 3200,
      riskScore: "low",
      notes: "Loyal customer with good payment history.",
      date: "2026-05-21 02:45 PM",
      status: "approved",
    },
  ];

  const filteredRequests = requests.filter((request) =>
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskBadge = (risk: BookingRequest["riskScore"]) => {
    switch (risk) {
      case "low":
        return "bg-success/10 text-success";
      case "medium":
        return "bg-warning/10 text-warning";
      case "high":
        return "bg-destructive/10 text-destructive";
    }
  };

  const getRiskIcon = (risk: BookingRequest["riskScore"]) => {
    switch (risk) {
      case "low":
        return <TrendingUp className="h-4 w-4" />;
      case "medium":
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: BookingRequest["status"]) => {
    switch (status) {
      case "approved":
        return "bg-success/10 text-success";
      case "rejected":
        return "bg-destructive/10 text-destructive";
      case "pending":
        return "bg-warning/10 text-warning";
    }
  };

  const handleApprove = () => {
    console.log("Approved:", selectedRequest?.id);
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    console.log("Rejected:", selectedRequest?.id, "Reason:", rejectReason);
    setShowModal(false);
    setSelectedRequest(null);
    setRejectReason("");
  };

  const handleCounterOffer = () => {
    console.log("Counter offer:", selectedRequest?.id, "Amount:", counterOffer);
    setShowModal(false);
    setSelectedRequest(null);
    setCounterOffer("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Part Payment Approvals</h1>
        <p className="text-muted-foreground">Review and approve booking amount reduction requests</p>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search requests by ID, customer, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product */}
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img src={request.productImage} alt={request.product} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{request.product}</h3>
                  <p className="text-sm text-muted-foreground">Product Price: ${request.productPrice}</p>
                  <span className="inline-block mt-1 px-2 py-1 rounded text-xs font-semibold font-mono">
                    {request.id}
                  </span>
                </div>
              </div>

              {/* Request Details */}
              <div className="flex-1 grid md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold">Customer Information</h4>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <span className="ml-2 font-semibold">{request.customer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="ml-2">{request.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-2">{request.phone}</span>
                    </div>
                    <div className="pt-2 border-t border-border mt-2">
                      <span className="text-muted-foreground">Order History:</span>
                      <span className="ml-2 font-semibold">{request.customerOrders} orders</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Spent:</span>
                      <span className="ml-2 font-semibold text-primary">${request.customerSpent}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div>
                  <h4 className="font-semibold mb-3">Booking Request</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">Original Booking:</span>
                      <span className="font-bold">${request.originalBooking}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm text-primary font-semibold">Requested Booking:</span>
                      <span className="font-bold text-primary">${request.requestedBooking}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                      <span className="text-sm text-warning font-semibold">Reduction:</span>
                      <span className="font-bold text-warning">
                        ${request.originalBooking - request.requestedBooking} (
                        {Math.round(((request.originalBooking - request.requestedBooking) / request.originalBooking) * 100)}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Risk Score:</span>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold ${getRiskBadge(request.riskScore)}`}>
                        {getRiskIcon(request.riskScore)}
                        {request.riskScore.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {request.notes && (
              <div className="mt-4 p-4 bg-muted/30 rounded-xl">
                <span className="text-sm font-semibold">Notes:</span>
                <p className="text-sm text-muted-foreground mt-1">{request.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>Submitted: {request.date}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(request.status)}`}>
                  {request.status.toUpperCase()}
                </span>
              </div>
              {request.status === "pending" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-success/10 text-success rounded-lg font-semibold hover:bg-success/20 transition-all flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-warning/10 text-warning rounded-lg font-semibold hover:bg-warning/20 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Counter Offer
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-semibold hover:bg-destructive/20 transition-all flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Review Booking Request</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Customer: <span className="font-semibold">{selectedRequest.customer}</span><br />
              Request ID: <span className="font-mono font-semibold">{selectedRequest.id}</span>
            </p>

            <div className="space-y-4">
              {/* Approve */}
              <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                <button
                  onClick={handleApprove}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg font-semibold hover:bg-success/90 transition-all"
                >
                  <Check className="h-5 w-5" />
                  Approve ${selectedRequest.requestedBooking} Booking
                </button>
              </div>

              {/* Counter Offer */}
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <label className="block text-sm font-semibold mb-2">Counter Offer Amount (₦)</label>
                <input
                  type="number"
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                  placeholder={`Between ${selectedRequest.requestedBooking} - ${selectedRequest.originalBooking}`}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                />
                <button
                  onClick={handleCounterOffer}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-warning text-warning-foreground rounded-lg font-semibold hover:bg-warning/90 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Counter Offer
                </button>
              </div>

              {/* Reject */}
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <label className="block text-sm font-semibold mb-2">Reason for Rejection</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Explain why this request is being rejected..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring mb-3 resize-none"
                />
                <button
                  onClick={handleReject}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-all"
                >
                  <X className="h-5 w-5" />
                  Reject Request
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                setSelectedRequest(null);
                setCounterOffer("");
                setRejectReason("");
              }}
              className="w-full mt-4 px-4 py-2 bg-muted rounded-lg font-semibold hover:bg-muted/80 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
