import React, { memo } from 'react'

const Footer = memo(props => {
    const filterBtns = [{
        title: 'All',
        isActived: true,
        onClick: () => { },
        link: ''
    }, {
        title: 'Active',
        isActived: false,
        onClick: () => { },
        link: 'active'
    }, {
        title: 'Completed',
        isActived: false,
        onClick: () => { },
        link: 'completed'
    }]
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>2</strong>
                <span> </span>
                <span>items</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {
                    filterBtns.map(btn => (
                        <FilterBtn key={`btn${btn.title}`} {...btn} />
                    ))
                }
            </ul>
            <button className="clear-completed" >Clear completed</button>
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

export default Footer