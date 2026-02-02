"use client";

import { useState } from "react";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent, 
  PointerSensor, 
  useSensor, 
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { Plus, Filter, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskForm } from "./components/task-form";
import { Column } from "./components/column";
import { TaskCard } from "./components/task-card";
import { Task, TaskStatus, columns, initialTasks } from "@/lib/types";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // If dropped on a column
    const columnIds = columns.map(col => col.id);
    if (columnIds.includes(overId as TaskStatus)) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === activeId 
            ? { ...task, status: overId as TaskStatus }
            : task
        )
      );
    }
    
    setActiveTask(null);
  };
  
  const handleAddTask = (columnId?: string) => {
    setDefaultStatus(columnId as TaskStatus || "todo");
    setEditingTask(null);
    setIsTaskFormOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      // Update existing task
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: new Date(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  };
  
  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `kanban-tasks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedTasks = JSON.parse(event.target?.result as string);
          // Validate and merge with existing tasks
          if (Array.isArray(importedTasks)) {
            setTasks(prev => {
              const existingIds = new Set(prev.map(t => t.id));
              const newTasks = importedTasks.filter((t: Task) => !existingIds.has(t.id));
              return [...prev, ...newTasks];
            });
          }
        } catch (error) {
          console.error('Error importing tasks:', error);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
            <p className="text-gray-600 mt-2">
              Drag and drop tasks between columns to manage your workflow
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => handleAddTask()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">{totalTasks}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">{inProgressTasks}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">{completedTasks}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={getTasksByStatus(column.id)}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            ))}
          </div>
          
          <DragOverlay>
            {activeTask && (
              <div className="rotate-3 opacity-80">
                <TaskCard 
                  task={activeTask} 
                  onDelete={handleDeleteTask} 
                  onEdit={handleEditTask}
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </main>
      
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitTask}
        initialData={editingTask}
        defaultStatus={defaultStatus}
      />
      
      <footer className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            <p>Drag tasks between columns to update their status</p>
            <p className="mt-1">Click on a task to edit or delete it</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span>High Priority</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span>Medium Priority</span>
            </span>
            <span className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>Low Priority</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}