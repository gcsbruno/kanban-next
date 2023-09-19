import React, { ReactNode } from 'react';

interface StatusProps {
    title: string;
    children: ReactNode;
}

const Status: React.FC<StatusProps> = ({ title, children }) => {
    return (
        <div className="bg-gray-200 p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div>{children}</div>
        </div>
    );
};

export default Status;
