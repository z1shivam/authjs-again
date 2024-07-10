import { useState } from "react";
import { IoMdClose } from "react-icons/io";
interface FormErrorProps {
  message?: string;
}

export const ErrorToast = ({ message }: FormErrorProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;
  return (
    <div className="w-full bg-red-50 text-red-700 border-2 border-red-400 px-3 py-3 rounded-md flex text-base items-center">
     <p>⚠️ {message}</p>
      <IoMdClose className="ml-auto cursor-pointer" onClick={() => setIsVisible(false)}/>
    </div>
  );
};
