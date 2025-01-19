import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userType = useSelector((state: any) => state.user.userType);
  console.log(userType, "type of user.....");
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
    <div
      className="min-h-screen mt-[4rem] "
      style={{ backgroundColor: "#161718" }}
    >
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="p-4">
        <h2 className="text-3xl font-bold text-start mb-4 text-white">
          Inventory Stats
        </h2>
        <div className="flex flex-row gap-x-2 mb-[12px]">
          <div
            className="p-8 border rounded-lg w-[25%] flex justify-center items-center flex-col shadow-md text-white"
            style={{ backgroundColor: "#243325" }}
          >
            <h4 className="text-sm font-medium text-white">Total Products</h4>
            <p className="text-2xl font-semibold">{inventory.length}</p>
          </div>
          <div
            className="p-8 border rounded-lg w-[25%] flex justify-center items-center flex-col shadow-md text-white"
            style={{ backgroundColor: "#243325" }}
          >
            <h4 className="text-sm font-medium text-white">
              Total Store Value
            </h4>
            <p className="text-2xl font-semibold">
              {inventory
                .reduce(
                  (total, item) =>
                    total + parseFloat(item.value.replace("$", "")),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <div
            className="p-8 border rounded-lg w-[25%] flex justify-center items-center flex-col shadow-md text-white"
            style={{ backgroundColor: "#243325" }}
          >
            <h4 className="text-sm font-medium text-white">
              Total Out of Stock
            </h4>
            <p className="text-2xl font-semibold">
              {inventory.filter((item) => item.quantity === 0).length}
            </p>
          </div>
          <div
            className="p-8 border rounded-lg w-[25%] flex justify-center items-center flex-col shadow-md text-white"
            style={{ backgroundColor: "#243325" }}
          >
            <h4 className="text-sm font-medium text-white">
              Number of Categories
            </h4>
            <p className="text-2xl font-semibold">
              {
                Array.from(new Set(inventory.map((item) => item.category)))
                  .length
              }
            </p>
          </div>
        </div>
        <table
          className="min-w-full table-auto border-collapse border border-gray-300 text-white rounded-[4px] "
          style={{ backgroundColor: "#212124" }}
        >
          <thead className="rounded-[4px]">
            <tr>
              <th className="px-4 py-5 border-b border-gray-300 text-left">
                <span className="bg-black text-yellow-500 px-3 py-2  rounded-[4px] text-sm font-medium inline-block">
                  Name
                </span>
              </th>
              <th className="px-4 py-5 border-b border-gray-300 text-left">
                <span className="bg-black text-yellow-500 px-3 py-2  rounded-[4px] text-sm font-medium inline-block">
                  Category
                </span>
              </th>
              <th className="px-4 py-5 border-b border-gray-300 text-left">
                <span className="bg-black text-yellow-500 px-3 py-2  rounded-[4px] text-sm font-medium inline-block">
                  Price
                </span>
              </th>
              <th className="px-4 py-5 border-b border-gray-300 text-left">
                <span className="bg-black text-yellow-500 px-3 py-2  rounded-[4px] text-sm font-medium inline-block">
                  Quantity
                </span>
              </th>
              <th className="px-4 py-5 border-b border-gray-300 text-left">
                <span className="bg-black text-yellow-500 px-3 py-2  rounded-[4px] text-sm font-medium inline-block">
                  Value
                </span>
              </th>
              <th className="px-4 py-5 border-b border-gray-300 text-left">
                <span className="bg-black text-yellow-500 px-3 py-2  rounded-[4px] text-sm font-medium inline-block">
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="rounded-[4px]">
            {inventory.length > 0 ? (
              inventory.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 border-b border-gray-300 rounded-[4px]">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 rounded-[4px]">
                    {item.category}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 rounded-[4px]">
                    {item.price}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 rounded-[4px]">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 rounded-[4px]">
                    {item.value}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 rounded-[4px]">
                    <div className="flex space-x-2">
                      <button className="text-blue-500">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="text-red-500">
                        <i className="fa fa-trash"></i>
                      </button>
                      <button className="text-gray-500">
                        <i className="fa fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-white px-4 py-2">
                  No inventory items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
