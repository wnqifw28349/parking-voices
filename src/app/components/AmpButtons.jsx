"use client";

import { FaBroadcastTower } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

export default function AmpButtons({
  toggleAmp,
  amplifiersCount,
  existingAmp,
  isSignedIn,
}) {
  const [count, setCount] = useState(amplifiersCount);
  const [ampState, setAmpState] = useState(!!existingAmp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleAmp = async () => {
    setLoading(true);
    setError(null);

    try {
      await toggleAmp();
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
        onClick={isSignedIn ? handleToggleAmp : undefined}
        disabled={!isSignedIn || loading}
        className="focus:outline-none"
        title={!isSignedIn ? "Sign in to amplify" : ""}
      >
        {ampState ? (
          <FaBroadcastTower
            size={24}
            className="text-[#c1a0e0] hover:text-[#8464a2]"
          />
        ) : (
          <FaBroadcastTower
            size={24}
            className={`${
              isSignedIn
                ? "text-gray-500 hover:text-[#c1a0e0]"
                : "text-gray-300"
            }`}
          />
        )}
      </button>
      <span className="flex items-center justify-center ml-2 mb-4 text-center bg-[#c1a0e0] text-white w-6 h-6 rounded-full shadow-md">
        {loading ? <FaSpinner className="animate-spin" /> : count}
      </span>
      {error && <p className="text-red-500 text-sm ml-3">{error}</p>}
    </div>
  );
}
