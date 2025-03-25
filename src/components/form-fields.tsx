import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input as InputField } from "./ui/input";

type InputProps = {
  labelProps?: Omit<React.ComponentProps<typeof FormLabel>, "children">;
  inputProps?: React.ComponentProps<typeof InputField>;
  children: React.ReactNode;
};
export function Input({ labelProps, inputProps, children }: InputProps) {
  return (
    <FormItem>
      <FormLabel {...labelProps}>{children}</FormLabel>
      <FormControl>
        <InputField {...inputProps} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
