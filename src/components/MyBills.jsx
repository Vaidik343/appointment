import React, { useEffect } from "react";
import { useBill } from "../context/BillContext";

const MyBills = ({ patientId }) => {
  const { bills, loading, getPatientBills } = useBill();

  useEffect(() => {
    if (patientId) getPatientBills(patientId);
  }, [patientId]);

  if (loading) return <p>Loading bills...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Bills</h2>

      {bills.length === 0 ? (
        <p className="text-gray-600">No bills found.</p>
      ) : (
        bills.map((bill) => (
          <div
            key={bill.id}
            className="border rounded-xl shadow-sm p-4 mb-5 bg-white"
          >
            {/* --- Bill Summary --- */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-blue-600">
                Bill #{bill.id.slice(0, 8)}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  bill.paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {bill.paid ? "Paid" : "Unpaid"}
              </span>
            </div>

            {/* --- Appointment + Doctor Info --- */}
            {bill.appointment && bill.appointment.doctor && (
              <p className="text-sm text-gray-600">
                Doctor:{" "}
                <span className="font-medium">
                  {bill.appointment.doctor.name}
                </span>{" "}
                | Date:{" "}
                {new Date(bill.appointment.appointment_date).toLocaleDateString()}
              </p>
            )}

            {/* --- Bill Items --- */}
            <div className="mt-3 border-t pt-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Services:
              </h4>
              {bill.items && bill.items.length > 0 ? (
                bill.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-700 mb-1"
                  >
                    <span>
                      {item.service?.name || "Service"} × {item.quantity}
                    </span>
                    <span>₹{item.total_price}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items found</p>
              )}
            </div>

            {/* --- Bill Totals --- */}
            <div className="border-t mt-3 pt-2 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{Number(bill.total_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>₹{Number(bill.discount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{Number(bill.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-700 mt-1">
                <span>Total:</span>
                <span>
                  ₹
                  {(
                    Number(bill.total_amount) +
                    Number(bill.tax) -
                    Number(bill.discount)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBills;
