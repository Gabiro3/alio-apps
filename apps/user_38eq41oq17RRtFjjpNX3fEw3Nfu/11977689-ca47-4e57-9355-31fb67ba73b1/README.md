# Kanban Board with Drag & Drop

A fully functional Kanban board built with Next.js 15, TypeScript, Tailwind CSS, and @dnd-kit for drag-and-drop functionality.

## Features

- **Drag & Drop**: Move tasks between columns using smooth drag-and-drop interactions
- **Task Management**: Add, edit, and delete tasks with detailed information
- **Column Organization**: Four columns (To Do, In Progress, Review, Done) with consistent spacing
- **Priority System**: Tasks have high, medium, or low priority with color coding
- **Assignee Tracking**: Assign tasks to team members
- **Import/Export**: Export tasks as JSON or import from JSON files
- **Responsive Design**: Works on mobile, tablet, and desktop screens
- **Polished UI**: Consistent spacing, hover effects, and smooth animations

## Tech Stack

- **Next.js 15.3.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **@dnd-kit** - Modern drag-and-drop library
- **Shadcn/UI** - Reusable UI components
- **Lucide React** - Icon library

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Docker Support

The project includes a production-ready Dockerfile:

```bash
# Build the Docker image
docker build -t kanban-board .

# Run the container
docker run -p 3000:3000 kanban-board
```

## Usage

1. **Add Tasks**: Click "Add Task" or the "+" button in any column
2. **Edit Tasks**: Click the edit icon on any task card
3. **Delete Tasks**: Click the trash icon on any task card
4. **Move Tasks**: Drag and drop tasks between columns
5. **Export Data**: Click "Export" to download tasks as JSON
6. **Import Data**: Click "Import" to upload tasks from JSON

## Project Structure

```
app/
  components/          # React components
    task-card.tsx     # Individual task card
    sortable-task-card.tsx # Drag-enabled task card
    column.tsx        # Kanban column
    task-form.tsx     # Add/edit task form
  page.tsx           # Main page
lib/
  types.ts           # TypeScript types
  utils.ts           # Utility functions
components/ui/       # Shadcn UI components
```

## License

MIT