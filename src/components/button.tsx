import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="px-6 py-2 bg-blue-500 text-black rounded hover:bg-blue-600">
      {children}
    </button>
  );
};

export default Button;
