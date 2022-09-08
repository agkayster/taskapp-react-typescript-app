import React, { useRef } from 'react';
import './styles.css';

/* highlight on todo and setTodo to get the types, copy paste them here. handleAdd function returns a type of void */
interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

/* pass the interface Props type for todo and setTodo here */
const InputField = ({ todo, setTodo, handleAdd }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<form
				className='input'
				onSubmit={(e) => {
					handleAdd(e);
					inputRef.current?.blur();
				}}>
				<input
					ref={inputRef}
					value={todo}
					type='input'
					placeholder='Enter a task'
					className='input__box'
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button type='submit' className='input_submit'>
					Go
				</button>
			</form>
		</>
	);
};

//OR
/* pass the interface Props type for todo and setTodo here */
// const InputField: React.FC<Props> = ({ todo, setTodo }) => {
// 	return (
// 		<>
// 			<form className='input'>
// 				<input
// 					type='input'
// 					placeholder='Enter a task'
// 					className='input__box'
// 				/>
// 				<button type='submit' className='input_submit'>
// 					Go
// 				</button>
// 			</form>
// 		</>
// 	);
// };

export default InputField;
