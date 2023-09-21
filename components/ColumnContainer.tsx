import { Column, Id } from "@/app/types"
import { Button } from "./ui/button"
import { TrashIcon } from "./icons/TrashIcon"

interface Props {
    column: Column
    deleteColumn: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {

    const { column, deleteColumn } = props

    return (
        <div className="bg-stone-900 w-[350px] h-[500px] max-h-[500px] flex rounded-md flex-col"
        >
            <div className="h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-1 bg-stone-800 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className=" rounded-full flex justify-center items-center bg-stone-600 px-2 py-1 text-sm">
                        0
                    </div>
                    {column.title}
                </div>
                    <Button 
                    onClick={() => {
                        deleteColumn(column.id)
                    }}
                    variant={"ghost"}
                     className="stroke-gray-500 hover:stroke-white rounded px-1 py-2">
                        <TrashIcon />
                    </Button>
            </div>
            <div className="flex flex-grow"> Content</div>
            <div>Footer</div>
        </div>
    )
}