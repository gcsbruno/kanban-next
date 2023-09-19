import React from 'react';

interface TaskProps {
  title: string;
  description: string;
}

const Task: React.FC<TaskProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Task;
