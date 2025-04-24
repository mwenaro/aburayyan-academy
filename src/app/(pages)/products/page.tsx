"use client";
import { useState, useEffect } from "react";

export default function PayPage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    if (!transactionId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/product-stk/status?id=${transactionId}`);
      const data = await res.json();

      if (data.status === "Success") {
        setMessage("Payment successful!");
        clearInterval(interval);
      } else if (data.status === "Failed") {
        setMessage("Payment failed. Try again.");
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [transactionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const [pId, pName] = productId.split("->");

    const res = await fetch("/api/product-stk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone:phone.startsWith("254")?phone:`254${phone.substring(1)}`, productId: pId, productName: pName }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.transactionId) {
      setTransactionId(data.transactionId);
      setMessage("STK Push sent! Please enter M-Pesa PIN on your phone.");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Buy a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select a Product --</option>
          {products.map((p: any) => (
            <option key={p.id} value={`${p.id}->${p.title}`}>
              {p.title} - KES {p.price}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Buy Now"}
        </button>
      </form>
      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}
