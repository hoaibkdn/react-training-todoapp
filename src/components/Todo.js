import React, { memo } from 'react'

const Todo = memo(props => {
    const { todo, markCompleted } = props
    return (
        <li className="">
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => markCompleted(todo.id)}
                />
                <label>{todo.text}</label>
                <button className="destroy" />
            </div>
            <input className="edit" value={todo.text} />
        </li>
    )
})

export default Todo