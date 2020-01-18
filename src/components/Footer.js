import React, { memo } from 'react'
import { connect } from 'react-redux'
import { filterByStatus } from './../helpers/todosHelper'
import { setStatusFilter, clearCompleted } from './../store/actions'

const Footer = memo(props => {
    const { status, setStatusFilter, numOfTodosLeft, numOfTodos, clearCompleted } = props
    console.log('status ', status)
    const filterBtns = [{
        title: 'All',
        isActived: status === 'ALL',
        onClick: () => setStatusFilter('ALL'),
        link: ''
    }, {
        title: 'Active',
        isActived: status === 'ACTIVE',
        onClick: () => setStatusFilter('ACTIVE'),
        link: 'active'
    }, {
        title: 'Completed',
        isActived: status === 'COMPLETED',
        onClick: () => setStatusFilter('COMPLETED'),
        link: 'completed'
    }]
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numOfTodosLeft}</strong>
                <span> </span>
                <span>{numOfTodosLeft <= 1 ? 'item' : 'items'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {
                    filterBtns.map(btn => (
                        <FilterBtn
                            key={`btn${btn.title}`}
                            {...btn}
                        />
                    ))
                }
            </ul>
            {numOfTodos > numOfTodosLeft && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>}
        </footer>
    )
})

const FilterBtn = memo(props => {
    const { title, onClick, link, isActived } = props
    return (
        <>
            <li>
                <a
                    href={`#/${link}`}
                    className={`${isActived ? 'selected' : ''}`}
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
            <span></span>
        </>
    )
})

const mapStateToProps = (state) => {
    const { todosList, status } = state.todos
    return {
        status,
        numOfTodos: todosList.length,
        numOfTodosLeft: filterByStatus(todosList, 'ACTIVE').length
    }
}

const mapDispatchToProps = {
    setStatusFilter, 
    clearCompleted
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)