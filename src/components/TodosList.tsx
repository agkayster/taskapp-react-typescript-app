import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface PropsInterface {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	completedTodos: Todo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodosList: React.FC<PropsInterface> = ({
	todos,
	setTodos,
	completedTodos,
	setCompletedTodos,
}) => {
	return (
		<div className='container'>
			<Droppable droppableId='TodosList'>
				{/* we pass the "Active Tasks" elements into a callback function inside the Droppable wrapper */}
				{(provided, snapshot) => (
					<div
						className={`todos ${
							snapshot.isDraggingOver ? 'dragctive' : ''
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						<span className='todos__heading'>Active Tasks</span>
						{todos.map((todo, index) => (
							<SingleTodo
								index={index}
								todo={todo}
								key={todo.id}
								todos={todos}
								setTodos={setTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId='TodosRemove'>
				{(provided, snapshot) => (
					<div
						className={`todos remove ${
							snapshot.isDraggingOver ? 'dragcomplete' : ''
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						<span className='todos__heading'>Completed Tasks</span>
						{completedTodos.map((todo, index) => (
							<SingleTodo
								index={index}
								todo={todo}
								key={todo.id}
								todos={completedTodos}
								setTodos={setCompletedTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
		// <div className='todos'>
		// 	{todos.map((todo) => (
		// 		<SingleTodo
		// 			todo={todo}
		// 			key={todo.id}
		// 			todos={todos}
		// 			setTodos={setTodos}
		// 		/>
		// 	))}
		// </div>
	);
};

export default TodosList;
