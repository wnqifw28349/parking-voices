import { FaIcons } from "react-icons/fa";
import { FaBroadcastTower } from "react-icons/fa";
import CommentForm from "./CommentForm";
export default function InteractionIcons(username) {
  return (
    <div className="flex">
      <div>
        <button className="flex items-center justify-center bg-[#1da1f2] text-white w-8 h-8 rounded-full shadow-md">
          <i class="fa fa-commenting-o" aria-hidden="true"></i>
        </button>
      </div>
      <div>
        <button className="flex items-center justify-center bg-[#1da1f2] text-white w-8 h-8 rounded-full shadow-md">
          <img
            src="/ampicon.svg"
            alt="amp button"
            className="w-8 h-8 mr-1 items-center"
            color="black"
          />
        </button>
      </div>
      <div>
        <button className="flex items-center justify-center bg-[#022a22] text-white w-8 h-8 rounded-full shadow-md">
          <span className="text-sm text-center font-semibold w-4 h-4 mr-0 mb-1 hover:text-[#c1a0e0]">
            voice.amplifiers_count
          </span>
        </button>
      </div>
    </div>
  );
}
