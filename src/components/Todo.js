import React, { memo, useState } from 'react'
import {
    getTodoEditingId,
    onEditTodo,
    markCompleted,
    removeTodo
} from './../store/actions'
import { connect } from 'react-redux'

const Todo = memo(props => {
    const { todo, getTodoEditingId, todoEditingId, onEditTodo, index, markCompleted, removeTodo } = props
    const [text, setText] = useState(todo.text)
    const isEditing = todoEditingId === todo.id
    const editTodo = () => {
        onEditTodo({
            ...todo,
            text
        }, index)
    }

    return (
        <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
            {!isEditing ?
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => markCompleted(todo.id)}
                    />
                    <label onDoubleClick={() => getTodoEditingId(todo.id)}>{todo.text}</label>
                    <button className="destroy" onClick={() => removeTodo(todo.id)}></button>
                </div> :
                <input
                    className="edit"
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onBlur={editTodo}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            editTodo()
                        }
                    }}
                />
            }
        </li>
    )
})

const mapStateToProps = (state, ownProps) => {
    return {
        todoEditingId: state.todos.todoEditingId,
        ...ownProps
    }
}

const mapDispatchToProps = {
    getTodoEditingId,
    onEditTodo,
    markCompleted,
    removeTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)