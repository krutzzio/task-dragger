import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'

export default function Board() {
    const [completed, setCompleted] = useState([])
    const [incompleted, setIncompleted] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => {
                setCompleted(json.filter((task) => task.completed));
                setIncompleted(json.filter((task) => !task.completed));
            })
            .catch(err => console.log(err));
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result

        console.log(source.droppableId, typeof source.droppableId, incompleted)

        if (source.droppableId === destination.droppableId) return

        if (source.droppableId == 2) {
            setCompleted(removeItemById(draggableId, completed))
        } else {
            setIncompleted(removeItemById(draggableId, incompleted))
        }

        const task = findItemById(draggableId, [...incompleted, ...completed])

        if (source.droppableId == 2) {
            setIncompleted([{ ...task, completed: !task.completed }, ...incompleted])
        } else {
            setCompleted([{ ...task, completed: task.completed }, ...completed])
        }
    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }


    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='flex gap-16'>
                    <Column title={"TO DO"} tasks={incompleted} id={"1"} />
                    <Column title={"DONE"} tasks={completed} id={"2"} />
                </div>
            </DragDropContext>
        </div>
    )
}
