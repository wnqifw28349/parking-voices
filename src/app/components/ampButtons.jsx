"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { MdCampaign } from "react-icons/md";
import { FaCloudversify } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

export default function AmpButtons({ amp, damp, amps, existingAmps }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      <button formAction={amp}>
        {existingAmps?.vote === 1 ? (
          <MdCampaign
            size={30}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingAmps?.vote === 1,
            })}
          />
        ) : (
          <MdCampaign
            size={30}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingAmps?.vote === 1,
            })}
          />
        )}
      </button>
      <span className="w-6 text-center tabular-nums">
        {pending ? (
          <span className="animate-spin h-6  w-6 flex items-center justify-center">
            <FaSpinner />
          </span>
        ) : (
          amps
        )}
      </span>
      {/* <button formAction={damp}>
        {existingAmps?.vote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingAmps?.vote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingAmps?.vote === -1,
            })}
          />
        )}
      </button> */}
    </>
  );
}
