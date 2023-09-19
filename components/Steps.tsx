import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'

interface StepsProps {
    steps: string[];
    onEditStep: (stepIndex: number, newStepTitle: string) => void;
    onAddStep: (newStepTile: string) => void;
}

const Steps: React.FC<StepsProps> = ({ steps, onEditStep, onAddStep }) => {
    const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null)
    const [newStep, setNewStep] = useState<string>('')

    const handleEditStepClick = (index: number) => {
        setEditingStepIndex(index)
    }

    const handleSaveStepClick = (index: number, newTitle: string) => {
        onEditStep(index, newTitle)
        setEditingStepIndex(null)
    }

    const handleAddStep = () => {
        onAddStep(newStep)
        setNewStep('');
    }

    return (
        <div>
            {steps.map((step, index) => (
                <div key={index}>
                    {editingStepIndex === index ? (
                        <div>
                            <Input
                                type='text'
                                value={step}
                                onChange={(e) => onEditStep(index, e.target.value)}
                            />
                            <Button onClick={() => handleSaveStepClick(index, step)}>Save</Button>
                        </div>
                    ) : (
                        <div>
                            <span>{step}</span>
                            <Button onClick={() => handleEditStepClick(index)}>Edit</Button>
                        </div>
                    )}
                </div>
            ))}
            <div>
                <Input
                type='text'
                placeholder='New Step'
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                />
                <Button onClick={handleAddStep}>Add Step</Button>
            </div>
        </div>
    )
}
export default Steps;