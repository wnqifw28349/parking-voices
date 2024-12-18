"use client";

import { FaBroadcastTower } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

export default function AmpButtons({
  toggleAmp,
  amplifiersCount,
  existingAmp,
}) {
  const [count, setCount] = useState(amplifiersCount);
  const [ampState, setAmpState] = useState(!!existingAmp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleAmp = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the server action
      await toggleAmp();

      // Update local state optimistically
      if (ampState) {
        setCount(count - 1);
        setAmpState(false);
      } else {
        setCount(count + 1);
        setAmpState(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleToggleAmp}
        className="focus:outline-none"
        disabled={loading}
      >
        {ampState ? (
          <FaBroadcastTowerFilled
            size={24}
            className="text-red-500 hover:text-red-600"
          />
        ) : (
          <FaBroadcastTower
            size={24}
            className="text-gray-500 hover:text-gray-600"
          />
        )}
      </button>
      <span className="ml-2 text-center">
        {loading ? <FaSpinner className="animate-spin" /> : count}
      </span>
      {error && <p className="text-red-500 text-sm ml-3">{error}</p>}
    </div>
  );
}
