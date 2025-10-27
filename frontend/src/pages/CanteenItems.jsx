import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function CanteenItems() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await api.get(`/canteens/${id}/items`);
      setItems(res.data);
    }
    fetchItems();
  }, [id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
      {items.map((item) => (
        <div key={item.id} className="product-card">
          <img src={item.image} alt={item.name} className="product-image" />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p>
            ₹{item.price} • Stock: {item.stock}
          </p>
        </div>
      ))}
    </div>
  );
}
