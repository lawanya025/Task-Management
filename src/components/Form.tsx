import React, { useState } from "react";
import Button from "./button";
import Card from "./ui/card";
import CardContent from "./ui/CardContent";
import Label from "./ui/Label";
import Input from "./ui/Input"

interface FormProps {
  title: string;
  buttonText: string;
}

const Form: React.FC<FormProps> = ({ title, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 shadow-lg w-96">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
          {title === "Register" && (
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full">{buttonText}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;