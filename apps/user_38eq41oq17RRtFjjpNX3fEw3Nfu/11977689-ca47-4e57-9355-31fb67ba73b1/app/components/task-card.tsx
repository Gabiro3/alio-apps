"use client";

import { useState } from "react";
import { GripVertical, Trash2, Edit2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onDelete, onEdit, isDragging }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-blue-100 text-blue-800 border-blue-200",
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card 
      className={cn(
        "relative transition-all duration-200 hover:shadow-md cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 rotate-2",
        "border-l-4",
        task.priority === 'high' ? "border-l-red-500" :
        task.priority === 'medium' ? "border-l-yellow-500" :
        "border-l-blue-500"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-1">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-sm leading-tight truncate">
                {task.title}
              </h3>
              
              {isHovered && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onEdit(task)}
                    className="h-6 w-6"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onDelete(task.id)}
                    className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full border",
                  priorityColors[task.priority]
                )}>
                  {task.priority}
                </span>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="h-3 w-3" />
                  <span className="truncate max-w-[80px]">{task.assignee}</span>
                </div>
              </div>
              
              <span className="text-xs text-gray-500">
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}