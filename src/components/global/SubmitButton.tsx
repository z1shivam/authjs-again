import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  isPending: boolean;
}

export default function SubmitButton({
  children,
  className,
  isPending,
}: SubmitButtonProps) {
  return (
    <Button className={cn(className)} type="submit">
      {isPending && (
        <AiOutlineLoading3Quarters className="mx-3 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}
