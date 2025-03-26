import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { DatePicker, Input, Select } from "@/components/form-fields";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
    Select,
    DatePicker,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
