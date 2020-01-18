import React, { memo } from 'react'
import Todo from './Todo'
import { connect } from 'react-redux'
import { checkAllTodos } from './../store/actions'
import { filterByStatus } from './../helpers/todosHelper'

const TodoList = memo(props => {
    const { todosList, isCheckedAll, checkAllTodos } = props
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" checked={isCheckedAll} />
            <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
            <ul className="todo-list">
                {
                    todosList.map((todo, index) => <Todo key={`todo${todo.id}`} {...{ todo }} {...props} index={index} />)
                }
            </ul>
        </section>
    )
})

const mapStateToProps = (state) => {
    return {
        todosList: filterByStatus(state.todos.todosList, state.todos.status),
        isCheckedAll: state.todos.isCheckedAll
    }
}

const mapDispatchToProps = {
    checkAllTodos
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)