import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomFormFieldProps {
  control: any;
  isPending: boolean;
  formLabel: string;
  name: string;
  type: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  placeholder: string;
}

export default function CustomFormField({
  control,
  isPending,
  formLabel,
  name,
  type,
  placeholder,
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}:</FormLabel>
          <FormMessage className="pl-2" />
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              disabled={isPending}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
