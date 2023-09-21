"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Steps from "../components/Steps";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  // Estado para os passos (steps) e tarefas (tasks)
  const [steps, setSteps] = useState<string[]>(["To Do", "Doing", "Done"]);
  const [tasks, setTasks] = useState<{ title: string; description: string; status?: string }[]>([]);

  // Estado para o diálogo de criação/edição de tarefa
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    stepIndex: number;
  }>({
    title: "",
    description: "",
    stepIndex: -1,
  });

  // Estado para a edição de tarefa
  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);

  // Função para editar um passo (step)
  const handleEditStep = (index: number, newStepTitle: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = newStepTitle;
    setSteps(updatedSteps);
  };

  // Função para adicionar uma tarefa (task)
  const addTask = (stepIndex: number) => {
    setShowDialog(true);
    setNewTask({ title: "", description: "", stepIndex });
  };

  // Função para adicionar um passo (step)
  const handleAddStep = (newStepTitle: string) => {
    if (newStepTitle) {
      const updatedSteps = [...steps, newStepTitle];
      setSteps(updatedSteps);
    }
  };

  // Função para remover um passo (step)
  const removeStep = (index: number) => {
    if (steps.length > 2) {
      const updatedSteps = [...steps];
      updatedSteps.splice(index, 1);
      setSteps(updatedSteps);
    }
  };

  // Função para criar uma tarefa (task)


  const createTask = () => {
    if (editTaskIndex !== null) {
      // Se editTaskIndex não for nulo, significa que estamos editando uma tarefa existente
      const updatedTasks = [...tasks];
      updatedTasks[editTaskIndex] = { ...newTask, status: steps[newTask.stepIndex] };
      setTasks(updatedTasks);
      setEditTaskIndex(null); // Limpa o índice de edição
    } else {
      // Caso contrário, estamos criando uma nova tarefa
      setTasks([...tasks, { ...newTask, status: steps[newTask.stepIndex] }]);
    }
    setNewTask({ title: "", description: "", stepIndex: -1 });
    setShowDialog(false); // Fecha o diálogo após criar ou editar
  };

  // Função para remover uma tarefa (task)
  const removeTask = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
  };

  // Função para editar uma tarefa (task)
    const editTask = (taskIndex: number) => {
     setEditTaskIndex(taskIndex); // Define o taskIndex que está sendo editado
     setShowDialog(true);
     setNewTask({
       title: tasks[taskIndex].title, // Carrega o título atual da tarefa
       description: tasks[taskIndex].description, // Carrega a descrição atual da tarefa
       stepIndex: steps.findIndex((step) => step === tasks[taskIndex].status), // Encontra o índice do status atual da tarefa
     });
   };
 

  return (
    <div className="min-h-screen">
      <div className="py-4 px-6 bg-stone-800/20">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">Kanban</h1>
      </div>
      <Separator className="bg-stone-500/40" />
      <Button
        variant="default"
        className="gap-1 m-4 hover:bg-stone-200 rounded"
        onClick={() => {
          const newStepTitle = prompt("Enter the new step name: ");
          if (newStepTitle) {
            handleAddStep(newStepTitle);
          }
        }}
      >
        Add Step
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
                      <Card key={taskIndex} className="p-4 m-4 hover:" onClick={() => {}}>
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
                        <DialogTitle>{editTaskIndex !== null ? "Edit Task" : "Create Task"}</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 rounded shadow">
                        <h2 className="text-lg font-semibold p-2 m-2">Task Details</h2>
                        <Input
                          className="p-2 m-2"
                          type="text"
                          placeholder="Title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <Textarea
                          className="p-2 m-2"
                          placeholder="Description"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          className=" m-2 rounded"
                          onClick={createTask}
                        >
                          Create Task
                        </Button>
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
