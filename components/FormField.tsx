import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  // FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, Controller, Path } from "react-hook-form";

interface FormFieldProps<T> {
  control: Control<T>; // The control object from react-hook-form
  name: Path<T>; // The name of the field
  label: string; // The label for the field
  placeholder?: string; // Optional placeholder text
  type?: "text" | "email" | "password" | "file"; // The type of the input field, default is 'text'
}

function FormField({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;
