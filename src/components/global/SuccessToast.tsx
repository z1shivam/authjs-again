import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface FormErrorProps {
  message?: string;
}

export const SuccessToast = ({ message }: FormErrorProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;

  return (
    <div className="w-full bg-emerald-50 text-emerald-700 border-2 border-emerald-400 px-3 py-3 rounded-md flex text-base items-center">
      <p>✅ {message}</p>
      <IoMdClose className="ml-auto cursor-pointer" onClick={() => setIsVisible(false)} />
    </div>
  );
};

