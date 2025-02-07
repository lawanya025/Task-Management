import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Button from "../components/button";
import Card from "../components/ui/card";
import CardContent from "../components/ui/CardContent";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";

interface Tasks {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Due";
}

const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // Colors for Completed, In Progress, Due

// Initial tasks (Hardcoded)
const initialTasks: Tasks[] = [
  { id: 1, name: "Review Applications", description: "Check resumes and shortlist", dueDate: "2025-02-10", priority: "High", status: "In Progress" },
  { id: 2, name: "Interview Scheduling", description: "Schedule interviews for candidates", dueDate: "2025-02-12", priority: "Medium", status: "Due" },
  { id: 3, name: "Finalize Offers", description: "Prepare offer letters", dueDate: "2025-02-15", priority: "Low", status: "Completed" },
];

const TaskList = () => {
  const [tasks, setTasks] = useState<Tasks[]>(initialTasks);
  const [filter, setFilter] = useState({ status: "", priority: "", search: "" });
  const [editingTask, setEditingTask] = useState<Tasks | null>(null); // Track the task being edited
  const navigate = useNavigate();

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5194/api/tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks([...initialTasks, ...data]); // Merge initial tasks with fetched tasks
        } else {
          console.error("Failed to fetch tasks.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTasks = async (e: React.FormEvent, task: Tasks) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch("http://localhost:5194/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id, // Sending the task id to be deleted
        }),
      });
  
      if (response.ok) {
        console.log("Task deleted successfully");
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id)); // Remove task from state
      } else {
        const errorText = await response.text(); // Get backend response message
        console.error("Failed to delete task:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTasks = async (e: React.FormEvent, task: Tasks) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (!editingTask) return;
  
    try {
      const response = await fetch(`http://localhost:5194/api/tasks/${editingTask.id}`, { // Make sure to include the task ID in the URL
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingTask.id, // Include the task ID
          status: editingTask.status,
          priority: editingTask.priority,
          // You can add any other fields here if needed (e.g., name, description, dueDate)
        }),
      });
  
      if (response.ok) {
        console.log("Task updated successfully");
  
        // Update the task in the state with the updated data
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === task.id ? { ...task, ...editingTask } : task
          )
        );
  
        setEditingTask(null); // Clear editing state after saving
      } else {
        const errorText = await response.text(); // Get the backend response message
        console.error("Failed to update task:", errorText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  const filteredTasks = tasks.filter((task) =>
    (filter.status ? task.status.toLowerCase().includes(filter.status.toLowerCase()) : true) &&
    (filter.priority ? task.priority.toLowerCase().includes(filter.priority.toLowerCase()) : true) &&
    (filter.search ? task.name.toLowerCase().includes(filter.search.toLowerCase()) : true)
  );

  const taskCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.keys(taskCounts).map((status) => ({
    name: status,
    value: taskCounts[status],
  }));

  const handleEdit = (task: Tasks) => {
    setEditingTask(task); // Set the task to be edited
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Task List</h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <Label>Search</Label>
          <Input
            placeholder="Search tasks..."
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        <div>
          <Label>Status</Label>
          <Input
            placeholder="Enter status (Completed/In Progress/Due)"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          />
        </div>
        <div>
          <Label>Priority</Label>
          <Input
            placeholder="Enter priority (High/Medium/Low)"
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          />
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
        filteredTasks.map((task) => {
          return (
            <Card key={task.id} className="mb-3">
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h3 className="font-semibold">{task.name}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-xs text-gray-400">
                    Due: {task.dueDate} | Priority: {task.priority} | Status: {task.status}
                  </p>
                </div>
                <div>
                  {/* Form for Delete Action */}
                  <form onSubmit={(e) => handleDeleteTasks(e, task)}>
                    <button
                      type="submit"
                      className="w-full p-2 bg-indigo-600 text-black rounded-md hover:bg-indigo-700"
                    >
                      Delete
                    </button>
                  </form>
                  {/* Button for Edit Action */}
                  <button
                    className="w-full mt-2 p-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  {editingTask && editingTask.id === task.id && (
                  <div className="mt-2">
                    <form onSubmit={(e) => handleUpdateTasks(e, task)}>

                    <Label>Status</Label>
                    <Input
                      value={editingTask.status}
                        onChange={(e) =>
                        setEditingTask({ ...editingTask, status: e.target.value })
                      }
                    />
                    <Label>Priority</Label>
                    <Input
                       value={editingTask.priority}
                       onChange={(e) =>
                         setEditingTask({ ...editingTask, priority: e.target.value })
                       }
                     />
                       <button
                         type="submit"
                         className="w-full p-2 bg-green-600 text-black rounded-md hover:bg-green-700 mt-2"
                       >
                         Save Changes
                       </button>
                     </form>
                   </div>
                 )}
               </div>
             </CardContent>
           </Card>
         );
       })
     ) : (
       <p>No tasks found.</p>
     )}
   </div>
 );
};

export default TaskList;
