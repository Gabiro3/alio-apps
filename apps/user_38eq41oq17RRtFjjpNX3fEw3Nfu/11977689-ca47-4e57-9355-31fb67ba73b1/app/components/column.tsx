"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Column as ColumnType, Task } from "@/lib/types";
import { SortableTaskCard } from "./sortable-task-card";
import { cn } from "@/lib/utils";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export function Column({ 
  column, 
  tasks, 
  onAddTask, 
  onDeleteTask, 
  onEditTask 
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });
  
  return (
    <div className="flex flex-col h-full">
      <Card className={cn(
        "flex-1 flex flex-col border-2 transition-colors duration-200",
        column.color,
        isOver && "border-dashed border-gray-400 bg-gray-50/50"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">
                {column.title}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {column.description}
              </p>
            </div>
            <span className="text-sm font-medium bg-white/50 px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 pb-4">
          <div 
            ref={setNodeRef}
            className={cn(
              "flex-1 space-y-3 min-h-[200px] transition-all duration-200",
              isOver && "bg-gray-50/30 rounded-lg p-2"
            )}
          >
            <SortableContext 
              items={tasks.map(task => task.id)} 
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <SortableTaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              ))}
            </SortableContext>
            
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No tasks yet</p>
                <p className="text-xs mt-1">Drag tasks here or add new ones</p>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 hover:bg-white/50"
            onClick={() => onAddTask(column.id)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}