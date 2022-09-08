import React, { useState } from 'react';
import './App.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import InputField from './components/InputField';
import TodosList from './components/TodosList';
import { Todo } from './model';

// this is a react functional component type
const App: React.FC = () => {
	/* used <string> to explicitly define our type for todo state */
	const [todo, setTodo] = useState<string>('');

	/* our todos state has a type of array of objects coming from out Todo model */
	const [todos, setTodos] = useState<Todo[]>([]);

	/* completedTodos state has an array of objects using the Todo model */
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		/* if we type something inside of todo input and todo is not an empty string */
		if (todo) {
			setTodos([
				...todos,
				{ id: Date.now(), todo, isDone: false },
			]); /* our todos state is from "Todo" in model.ts which is an array of objects */
			setTodo(''); /* once we submit, the input should be empty */
		}
	};

	const onDragEnd = (result: DropResult) => {
		// console.log('get result =>', result);
		/* destructure source and destination from result */
		const { source, destination } = result;

		/* if draggable element is dropped in a non droppable zone, do nothing */
		if (!destination) return;

		/* if draggable element is dropped in the same droppable zone, do nothing */
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add,
			active = todos,
			complete = completedTodos;

		if (source.droppableId === 'TodosList') {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		if (destination.droppableId === 'TodosList') {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);
	};

	// console.log('get todos =>', todos);
	// console.log('get to do =>', todo);
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='App'>
				<span className='heading'>Taskify</span>
				<InputField
					todo={todo}
					setTodo={setTodo}
					handleAdd={handleAdd}
				/>
				<TodosList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
