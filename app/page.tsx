"use client"

import React, { useState } from 'react'
import Status from '../components/Status'
import Task from '../components/Task'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import Steps from '../components/Steps'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function Home() {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>(['Backlog', 'To Do', 'Doing', 'Tests', 'Done']);
  const [tasks, setTasks] = useState<{ title: string; description: string; status?: string }[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<{ title: string, description: string; stepIndex: any; }>({
    title: '',
    description: '',
    stepIndex: [],
  });

  const handleEditStep = (index: number, newStepTitle: string) => {
    const updateSteps = [...steps];
    updateSteps[index] = newStepTitle;
    setSteps(updateSteps);
  };

  const addTask = (stepIndex: number) => {
    setShowDialog(true);
    setNewTask({ title: '', description: '', stepIndex });
  };

  const handleAddStep = (newStepTitle: string) => {
    if (newStepTitle) {
      setSteps([...steps, newStepTitle]);
    }
  };

  const addStatus = () => {
    const newStatus = prompt('Enter the status name:');
    if (newStatus) {
      setStatuses([...statuses, newStatus]);
    }
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const createTask = () => {
    setTasks([...tasks, { ...newTask, status: steps[newTask.stepIndex] }]);
    setNewTask({ title: '', description: '', stepIndex: -1 });
    closeDialog();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Kanban App</h1>
      </div>
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex justify-center">
          {steps.map((step, index) => (
            <div key={index} className="p-4 m-4 text-center flex-1">
              <Card className="w-[300px]">
                <h2 className="text-lg font-semibold">{step}</h2>
                <div className="overflow-y-auto h-auto">
                  {tasks
                    .filter((task) => task.status === step)
                    .map((task, taskIndex) => (
                      <Card key={taskIndex} className="p-4 m-4 bg-white">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                      </Card>
                    ))}
                </div>
                <Button
                  variant="secondary"
                  className="gap-1 m-4 hover:bg-slate-200"
                  onClick={() => addTask(index)}
                >
                  Add Task
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </main>
      {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Card className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">Create a task</h2>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                  <Button onClick={createTask}>Create</Button>
                  <Button onClick={closeDialog}>Cancel</Button>
                </Card>
              </div>
      )}
    </div>
  );
}