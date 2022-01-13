import React, {useState, useEffect} from 'react'

const Todo = () => {
    const [todos,setTodos] = useState([])
    const [todo,setTodo] = useState('')
    const [todoEdit, setTodoEdit] = useState(null)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        const temp = localStorage.getItem('data')
        const loadedTodos = JSON.parse(temp)

        if(loadedTodos) {
            setTodos(loadedTodos)
        }
    }, [])

    useEffect(() => {
        const temp = JSON.stringify(todos)
        localStorage.setItem('data', temp)
    }, [todos])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false,
        }
        
        setTodos([...todos].concat(newTodo))
        setTodo('')
    }

    const deleteTodo = (id) => {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id)

        setTodos(updatedTodos)
    }

    const toggleComplete = (id) => {
        const updatedTodos = [...todos].map((todo) => {
            if(todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })

        setTodos(updatedTodos)
    } 

    const editTodo = (id) => {
        const updatedTodos = [...todos].map((todo) => {
            if(todo.id === id){
                todo.text = editText
            }
            return todo
        })
        setTodos(updatedTodos)
        setTodoEdit(null)
        setEditText('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type = 'text' onChange={(e) => setTodo(e.target.value)} value = {todo}></input>
                <button type = 'submit'>Add</button>
            </form>
            {todos.map((todo) => <div key = {todo.id}>
                    
                    {todoEdit === todo.id 
                    ? (<input type = 'text' onChange={(e) => setEditText(e.target.value)} value = {editText}></input>) 
                    : (<div>{todo.text}</div>)}

                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    <input type = 'checkbox' onChange={() => toggleComplete(todo.id)} checked = {todo.completed}></input>
                    {todoEdit === todo.id 
                    ? (<button onClick={() => editTodo(todo.id)}>Submit Edit</button>) 
                    : (<button onClick={() => setTodoEdit(todo.id)}>Edit</button>)}
                    
                    

                </div>)}
        </div>
    )
}

export default Todo
