import { useField } from "remix-validated-form";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

export interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const FormInput = ({ name, label, type, placeholder, value, defaultValue }: FormInputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className="grid w-full items-center gap-1.5 my-8">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={type}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`border-transparent shadow-[0_4px_8px_rgba(0,0,0,0.4)] ${error ? "ring ring-red-500" : ""}`}
          {...getInputProps({ id: name, placeholder, value })}
        />
        {error && (
          <div className="absolute right-0 top-0 mt-10 text-sm text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
