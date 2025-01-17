import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Delay function for retry logic
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Retry API call with exponential backoff

  const retryFetch = async (retries: number = 3, delayMs: number = 1000) => {
    try {
      const response = await axios.get(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      setInventory(response.data);
      console.log(response.data, "invetory");
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        // Rate limit error
        if (retries > 0) {
          console.log(`Rate limit exceeded, retrying in ${delayMs}ms...`);
          await delay(delayMs);
          retryFetch(retries - 1, delayMs * 2); // Retry with exponential backoff
        } else {
          setError("Too many requests. Please try again later.");
          setLoading(false);
        }
      } else {
        setError("Failed to fetch inventory.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    retryFetch();
  }, []);

  return (
    <div className="min-h-screen mt-[4rem] bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-4 text-white">
        Inventory Page
      </h2>
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="p-4">
        <ul>
          {inventory.length > 0 ? (
            inventory.map((item, index) => (
              <li
                key={index}
                className="mb-2 p-4 border rounded-lg shadow-md bg-white"
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </li>
            ))
          ) : (
            <p className="text-center text-white">
              No inventory items available.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InventoryPage;
