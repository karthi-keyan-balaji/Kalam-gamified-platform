import React from 'react';
import { Calendar, Clock, Star, CheckCircle2, XCircle } from 'lucide-react';

export default function Tasks({ dailyTasks, weeklyTasks, onCompleteTask }) {
  const TaskList = ({ tasks, type }) => (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {type === 'daily' ? (
            <Clock className="w-5 h-5 text-blue-500" />
          ) : (
            <Calendar className="w-5 h-5 text-purple-500" />
          )}
          <h2 className="text-lg font-semibold text-foreground">
            {type === 'daily' ? 'Daily' : 'Weekly'} Tasks
          </h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {tasks.filter(t => t.completed).length}/{tasks.length} Completed
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onCompleteTask(task.id)}
                className={`transition-colors ${
                  task.completed ? 'text-green-500' : 'text-muted-foreground'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </button>
              <span className={`font-medium ${
                task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
              }`}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {task.deadline && (
                <span className="text-sm text-muted-foreground">
                  {task.deadline}
                </span>
              )}
              <span className="text-sm font-medium text-primary">
                {task.reward}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TaskList tasks={dailyTasks} type="daily" />
      <TaskList tasks={weeklyTasks} type="weekly" />
    </div>
  );
}