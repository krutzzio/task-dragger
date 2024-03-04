import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {
    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided, snapshot) => (
                <div className="w-full h-16 bg-pink-500"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <h1>{task.title}</h1>
                </div>
            )}
        </Draggable>
    )
}
