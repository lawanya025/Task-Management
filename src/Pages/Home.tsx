import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Card className="p-8 shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out bg-white rounded-lg">
        <CardContent className="text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 mb-6 animate-pulse">
            Welcome to Task Manager
          </h1>
          <p className="text-lg text-gray-600 mb-6">Your ultimate task management tool</p>
          <div className="space-x-6">
            <Link to="/login">
              <Button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold rounded-full shadow-md transform hover:scale-105 transition-all duration-200">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xl font-semibold rounded-full shadow-md transform hover:scale-105 transition-all duration-200">
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
