export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  createdAt: Date;
}

export interface Column {
  id: TaskStatus;
  title: string;
  description: string;
  color: string;
}

export const columns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    description: 'Tasks that need to be started',
    color: 'bg-blue-100 border-blue-300',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    description: 'Tasks currently being worked on',
    color: 'bg-yellow-100 border-yellow-300',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Tasks ready for review',
    color: 'bg-purple-100 border-purple-300',
  },
  {
    id: 'done',
    title: 'Done',
    description: 'Completed tasks',
    color: 'bg-green-100 border-green-300',
  },
];

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage',
    description: 'Create wireframes and mockups for the homepage',
    status: 'todo',
    priority: 'high',
    assignee: 'Alex Johnson',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Implement auth system',
    description: 'Set up user authentication and authorization',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sam Wilson',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints and usage',
    status: 'review',
    priority: 'medium',
    assignee: 'Taylor Swift',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '4',
    title: 'Fix mobile responsive issues',
    description: 'Address layout problems on mobile devices',
    status: 'done',
    priority: 'medium',
    assignee: 'Jordan Lee',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '5',
    title: 'Add dark mode support',
    description: 'Implement dark/light theme toggle',
    status: 'todo',
    priority: 'low',
    assignee: 'Casey Smith',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '6',
    title: 'Optimize database queries',
    description: 'Improve performance of slow database queries',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Morgan Reed',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '7',
    title: 'Update dependencies',
    description: 'Upgrade packages to latest versions',
    status: 'review',
    priority: 'low',
    assignee: 'Riley Chen',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '8',
    title: 'Write unit tests',
    description: 'Add comprehensive test coverage',
    status: 'done',
    priority: 'medium',
    assignee: 'Drew Patel',
    createdAt: new Date('2024-01-08'),
  },
];