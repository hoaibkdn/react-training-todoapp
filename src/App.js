import React, { PureComponent } from 'react';
import { Provider } from 'react-redux'
import store from './store'

// Components
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

// Css
import './App.css';
import './css/Todo.css'

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)

const filterByStatus = (todos = [], status = '', id = '') => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default:
      return todos
  }
}
class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className="todoapp">
          <Header  />
          <TodoList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
