import type { PropsWithChildren } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./ui/form";
import { Input as InputField } from "./ui/input";
import { Select as SelectField } from "./ui/select";
import { DatePicker as DatePickerField } from "./ui/date-picker";

type FormFieldProps = {
  label: string;
  labelProps?: Omit<React.ComponentProps<typeof FormLabel>, "children">;
};

export function Input({
  label,
  labelProps,
  inputProps,
}: FormFieldProps & {
  inputProps?: React.ComponentProps<typeof InputField>;
}) {
  const { field } = useFormField<string>();
  return (
    <FormItem>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <FormControl>
        <InputField
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export function Select({
  label,
  labelProps,
  children,
}: PropsWithChildren<FormFieldProps>) {
  const { field } = useFormField<string>();

  return (
    <FormItem>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <FormControl>
        <SelectField
          value={field.state.value}
          onValueChange={(v) => field.handleChange(v)}
        >
          {children}
        </SelectField>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export function DatePicker({ label, labelProps }: FormFieldProps) {
  const { field } = useFormField<Date | undefined>();

  return (
    <FormItem>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <FormControl>
        <DatePickerField
          date={field.state.value}
          onChange={(v) => field.handleChange(v)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
