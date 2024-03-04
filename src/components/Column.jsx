import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

export default function Column({ title, tasks, id }) {
    return (
        <div className=' bg-gray-400 w-96 h-96 '>
            <h1 className='text-center'>{title}</h1>
            <Droppable droppableId={id}>
                {
                    (provided, snapshot) => (
                        <div ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                            {...provided.droppableProps}
                        >
                            {
                                tasks.map((task, index) => <Task key={index} task={task} index={index} />)
                            }
                        </div>
                    )
                }
            </Droppable >
        </div >
    )
}
