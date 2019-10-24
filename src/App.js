import React, { PureComponent } from 'react';
import TodoList from './components/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'

import './css/Todo.css'

const filterByStatus = (listTodos = [], status = '') => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter(item => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter(item => item.isCompleted)
    default:
      return listTodos
  }
}

const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter(item => !item.isCompleted)
}

class App extends PureComponent {
  state = {
    listTodos: [],
    isCheckedAll: false,
    status: 'ALL'
  }

  addTodos = (todo = {}) => {
    this.setState(preState => ({
      listTodos: [...preState.listTodos, todo]
    }))
  }

  markCompleted = (id = '') => {
    const { listTodos } = this.state
    let isCheckedAll = true
    const updatedListTodos = listTodos.map(item => {
      if ((!item.isCompleted && item.id !== id) || (item.isCompleted && item.id === id)) {
        isCheckedAll = false
        console.log('isCheckedAll ', isCheckedAll)
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    this.setState({
      isCheckedAll,
      listTodos: updatedListTodos
    })
  }

  checkAll = () => {
    const { listTodos, isCheckedAll } = this.state
    const updatedListTodos = listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll }))
    this.setState(preState => ({
      isCheckedAll: !preState.isCheckedAll,
      listTodos: updatedListTodos
    }))
  }

  clearCompleted = () => {
    this.setState(preState => ({
      listTodos: filterTodosLeft(preState.listTodos)
    }))
  }

  render() {
    const { listTodos, isCheckedAll, status } = this.state
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodos}
        />
        <TodoList
          listTodos={filterByStatus(listTodos, status)}
          markCompleted={this.markCompleted}
          checkAll={this.checkAll}
          isCheckedAll={isCheckedAll}

        />
        <Footer
          activeButton={status}
          setStatusFilter={(status) => this.setState({ status })}
          clearCompleted={this.clearCompleted}
          numOfTodosLeft={filterTodosLeft(listTodos).length}
          numOfTodos={listTodos.length}
        />
      </div>
    );

  }
}

export default App;
