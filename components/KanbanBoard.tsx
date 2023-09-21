import React, { useState } from "react";
import { Button } from "./ui/button";
import PlusIcon from "./icons/PlusIcon";
import { Column, Id } from "@/app/types";
import ColumnContainer from "./ColumnContainer";

export default function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([])
    console.log(columns)
    function createColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        }

        setColumns([...columns, columnToAdd])
    }

    function generateId() {
        return Math.floor(Math.random() * 10001)
    }

    function deleteColumn(id: Id) {
        const filteredColumn = columns.filter((col) => col.id !== id);
        setColumns(filteredColumn)
    }

    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    {columns.map((col) => 
                        <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
                    )}
                </div>
                <Button
                    onClick={() => {
                        createColumn()
                    }}
                    className="flex gap-2 rounded ring-stone-400 hover:ring-2">
                    Add Column
                    <PlusIcon />
                </Button>
            </div>
        </div>
    )
}