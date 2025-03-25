import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { Input } from "@/components/form-fields";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
