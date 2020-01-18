import { 
    ADD_TODO,
    GET_TODO_EDITING_ID,
    ON_EDIT_TODO,
    MARK_COMPLETED,
    CHECK_ALL_TODOS,
    REMOVE_TODO,
    SET_STATUS_FILTER,
    CLEAR_COMPLETED
} from './../actions'
import { isNotCheckedAll, filterByStatus } from './../../helpers/todosHelper'

const INITIAL_STATE = {
    todosList: [{
        id: 1,
        text: 'todo 1',
        isCompleted: false
    }, {
        id: 2,
        text: 'todo 2',
        isCompleted: false
    }],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
}

const todosReducers = (state = INITIAL_STATE, action) => {
    const { todosList, isCheckedAll } = state
    const list = JSON.parse(JSON.stringify(todosList))
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todosList: [...list, action.todo]
            })
        case GET_TODO_EDITING_ID:
            return Object.assign({}, state, {
                todoEditingId: action.id
            })
        case ON_EDIT_TODO:
            if (action.index >= 0) {
                list.splice(action.index, 1, action.todo)
            }
            return Object.assign({}, state, {
                todosList: list,
                todoEditingId: ''
            })
        case MARK_COMPLETED:
            const updatedList = todosList.map(todo => todo.id === action.id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo)
            return Object.assign({}, state, {
                todosList: updatedList,
                isCheckedAll: !isNotCheckedAll(updatedList)
            })
        case CHECK_ALL_TODOS:
            return Object.assign({}, state, {
                todosList: todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll })),
                isCheckedAll: !isCheckedAll
            })
        case REMOVE_TODO:
            return Object.assign({}, state, {
                todosList: filterByStatus(todosList, 'REMOVE', action.id)
            })
        case SET_STATUS_FILTER:
            return Object.assign({}, state, {
                status: action.status
            })
        case CLEAR_COMPLETED:
            return Object.assign({}, state, {
                todosList: filterByStatus(todosList, 'ACTIVE')
            })
        default:
            return state
    }
}

export default todosReducers