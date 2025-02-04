import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Button from "../components/button";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Due";
}

const initialTasks: Task[] = [
  { id: 1, name: "Review Applications", description: "Check resumes and shortlist", dueDate: "2025-02-10", priority: "High", status: "In Progress" },
  { id: 2, name: "Interview Scheduling", description: "Schedule interviews for candidates", dueDate: "2025-02-12", priority: "Medium", status: "Due" },
  { id: 3, name: "Finalize Offers", description: "Prepare offer letters", dueDate: "2025-02-15", priority: "Low", status: "Completed" },
];

const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // Colors for Completed, In Progress, Due

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState({ status: "", priority: "", search: "" });

  const filteredTasks = tasks.filter(task => 
    (filter.status ? task.status.toLowerCase().includes(filter.status.toLowerCase()) : true) &&
    (filter.priority ? task.priority.toLowerCase().includes(filter.priority.toLowerCase()) : true) &&
    (filter.search ? task.name.toLowerCase().includes(filter.search.toLowerCase()) : true)
  );

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Generate Chart Data (Count tasks by status)
  const taskCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.keys(taskCounts).map(status => ({
    name: status,
    value: taskCounts[status],
  }));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Task List</h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <Label>Search</Label>
          <Input placeholder="Search tasks..." onChange={(e) => setFilter({ ...filter, search: e.target.value })} />
        </div>
        <div>
          <Label>Status</Label>
          <Input placeholder="Enter status (Completed/In Progress/Due)" onChange={(e) => setFilter({ ...filter, status: e.target.value })} />
        </div>
        <div>
          <Label>Priority</Label>
          <Input placeholder="Enter priority (High/Medium/Low)" onChange={(e) => setFilter({ ...filter, priority: e.target.value })} />
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-center mb-2">Task Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Task Cards */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map(task => (
          <Card key={task.id} className="mb-3">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold">{task.name}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${task.status === "Completed" ? "bg-green-200 text-green-800" : 
                      task.status === "In Progress" ? "bg-yellow-200 text-yellow-800" : 
                      "bg-red-200 text-red-800"
                    }`}>
                    {task.status}
                  </span>
                  <p className="text-xs text-gray-400">Due: {task.dueDate} | Priority: {task.priority}</p>
                </div>

              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
