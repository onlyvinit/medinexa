"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, CreditCard, Package, User, Mail, Phone, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Truck, UserCheck } from "lucide-react";
import { getOrderById, updateOrderStatus } from "@/app/lib/orderService";
import { Order } from "@/app/types/order";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (params.id) {
        try {
          const data = await getOrderById(params.id as string);
          setOrder(data);
        } catch (error) {
          console.error("Failed to fetch order", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrder();
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: any) => {
    if (!order) return;
    setUpdating(true);
    try {
      const updatedOrder = await updateOrderStatus(order.id, newStatus);
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-gray-400">
          <Package size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Order not found</h2>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Go back to orders
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-700 border-blue-200";
      case "approved": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "pending_review": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "declined": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-5 h-5" />;
      case "shipped": return <Truck className="w-5 h-5" />;
      case "approved": return <CheckCircle className="w-5 h-5" />;
      case "pending_review": return <Clock className="w-5 h-5" />;
      case "declined": return <XCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Order #{order.id.substring(0, 8)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status.replace('_', ' ')}</span>
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Placed on {new Date(order.createdAt || "").toLocaleDateString('en-US', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            disabled={updating}
            value={order.status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border bg-white shadow-sm"
          >
            <option value="pending_review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-500" />
                Order Items
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{order.product?.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{order.product?.reason}</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ${order.product?.price?.toFixed(2)}
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">${order.product?.price?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-gray-900">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold mt-4 pt-4 border-t border-gray-100">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">${order.product?.price?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Intake Answers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-gray-500" />
                Medical Intake
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {order.intakeAnswers && Object.entries(order.intakeAnswers).map(([question, answer]: [string, any], index) => (
                <div key={index} className="p-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Question {index + 1}</p>
                  <p className="text-base text-gray-900">{String(answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                Customer Details
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {order.patientInfo?.firstName?.[0]}{order.patientInfo?.lastName?.[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {order.patientInfo?.firstName} {order.patientInfo?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${order.userEmail}`} className="text-blue-600 hover:underline">
                    {order.userEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{order.patientInfo?.phone || "No phone provided"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                Shipping Address
              </h3>
            </div>
            <div className="p-6">
              <address className="not-italic text-sm text-gray-700 space-y-1">
                <p className="font-medium text-gray-900">
                  {order.patientInfo?.firstName} {order.patientInfo?.lastName}
                </p>
                <p>{order.patientInfo?.address}</p>
                <p>{order.patientInfo?.city}, {order.patientInfo?.state} {order.patientInfo?.zipCode}</p>
                <p className="mt-2 text-gray-500 text-xs uppercase tracking-wider font-medium">United States</p>
              </address>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                Payment Information
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {order.payment?.status || "Paid"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Method</span>
                <span className="text-sm font-medium text-gray-900">Credit Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
