import React from "react";

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border rounded px-3 py-2 w-full ${className}`}
    />
  );
};
export default Input;