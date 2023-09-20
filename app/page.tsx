"use client"

import React, { useState } from 'react'
import Status from '../components/Status'
import Task from '../components/Task'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Steps from '../components/Steps'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const [statuses, setStatuses] = useState<string[]>([]);
  const defaultSteps = ['To Do', 'Doing', 'Done'];
  const [steps, setSteps] = useState<string[]>(defaultSteps);
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
      const updatedSteps = [...steps, newStepTitle];
      setSteps(updatedSteps);
    }
  };

  const removeStep = (index: number) => {
    if (steps.length > 2) {
      const updatedSteps = [...steps];
      updatedSteps.splice(index, 1);
      setSteps(updatedSteps);
    }
  };

  const addStatus = () => {
    const newStatus = prompt('Enter the status name:');
    if (newStatus) {
      setStatuses([...statuses, newStatus]);
    }
  };

  const createTask = () => {
    setTasks([...tasks, { ...newTask, status: steps[newTask.stepIndex] }]);
    setNewTask({ title: '', description: '', stepIndex: -1 });
  };

  return (
    <div className="min-h-screen">
      <div className="py-4 px-6 bg-stone-800/20">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Kanban</h1>
      </div>
      <Separator className='bg-stone-500/40' />
      <Button
        variant='default'
        className='gap-1 m-4 hover:bg-stone-200 rounded'
        onClick={() => {
          const newStepTitle = prompt('Enter the new step name: ')
          if (newStepTitle){
            handleAddStep(newStepTitle)
          }
        }}
      >Add Step
      </Button>
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex justify-center">
          {steps.map((step, index) => (
            <div key={index} className="p-4 m-4 text-center flex-1">
              <Card className="w-[300px] bg-stone-800/20">
                <h2 className="text-lg font-semibold m-2">{step}</h2>
                <div className="overflow-y-auto h-auto">
                  {tasks
                    .filter((task) => task.status === step)
                    .map((task, taskIndex) => (
                      <Card key={taskIndex} className="p-4 m-4">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                      </Card>
                    ))}
                </div>
                <Button
                  variant="secondary"
                  className="gap-1 m-4 hover:bg-stone-200 rounded"
                  onClick={() => addTask(index)}
                >
                  Add Task
                </Button>
                <Button
                  variant="destructive"
                  className="gap-1 m-4 hover:bg-stone-200 rounded"
                  onClick={() => removeStep(index)}
                >
                  Remove Step
                </Button>
                {showDialog && newTask.stepIndex === index && (
                  <Dialog>
                    <DialogTrigger>
                      <div className="">Create</div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create a task</DialogTitle>
                      </DialogHeader>
                      <div className='p-4 rounded shadow'>
                        <h2 className='text-lg font-semibold p-2 m-2'>New task</h2>
                        <Input
                          className='p-2 m-2'
                          type='text'
                          placeholder='Title'
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                        <Textarea
                          className='p-2 m-2'
                          placeholder='Description'
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <Button
                          type='submit'
                          variant='secondary'
                          className=' m-2 rounded'
                          onClick={createTask}>Create</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}