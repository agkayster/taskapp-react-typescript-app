import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import './styles.css';

type PropsType = {
	index: number;
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: PropsType) => {
	const [editInput, setEditInput] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	/* our handleDone function matches the id of the component that we click on to the id in the function. And if it matches it executes the code block */
	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	/* we use filter method to find the id's that do not match the todo.id  and we pass those ones that do not match into the todos array of objects for display on the browser/UI */
	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	/* we match the todo.id with the id of the component that was edited and if it matches, we set todo.todo to editTodo which is {todo.todo} 
  we make changes to the todo property in a single todo object and setTodos updates todos state with the object
  which is then mapped back to {todo.todo}
  */
	const handleEditForm = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, todo: editTodo } : todo
			)
		);
		setEditInput(false);
	};

	/* we pass inputRef into the <input/> element we want to implement ref/focus in. <HTMLInputElement> is the type obtained from the <input/> we want to pass the ref in */
	const inputRef = useRef<HTMLInputElement>(null);

	/* whenever our editInput boolean state changes to true, we automatically want to focus into the <input/> element */
	useEffect(() => {
		inputRef.current?.focus();
	}, [editInput]);

	// console.log('check edit =>', editInput);
	// console.log('get single to do =>', todo);

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided, snapshot) => (
				<form
					className={`todos__single ${
						snapshot.isDragging ? 'drag' : ''
					}`}
					onSubmit={(e) => handleEditForm(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					{/* if editInput is true, we get an <input/> element else if todo.isDone is true, it implements the "strike" html element else it does nothing */}
					{editInput ? (
						<input
							ref={inputRef}
							value={editTodo}
							onChange={(e) => setEditTodo(e.target.value)}
							className='todos__single--text'
						/>
					) : todo.isDone ? (
						<s className='todos__single--text'>{todo.todo}</s>
					) : (
						<span className='todos__single--text'>{todo.todo}</span>
					)}

					<div>
						<span
							className='icon'
							onClick={() => {
								if (!editInput && !todo.isDone) {
									setEditInput((editInput) => !editInput);
								}
							}}>
							<AiFillEdit />
						</span>
						<span
							className='icon'
							onClick={() => handleDelete(todo.id)}>
							<AiFillDelete />
						</span>
						<span
							className='icon'
							onClick={() => handleDone(todo.id)}>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleTodo;
