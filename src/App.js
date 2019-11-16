import React, { PureComponent } from 'react';

// Components
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

// Css
import './App.css';
import './css/Todo.css'

class App extends PureComponent {
  state = {
    todosList: [{
      id: 1,
      text: 'todo 1',
      isCompleted: true
    }, {
      id: 2,
      text: 'todo 2',
      isCompleted: false
    }]
  }

  addTodo = (todo = {}) => {
    this.setState(preState => ({
      todosList: [...preState.todosList, todo]
    }))
  }

  render() {

    const { todosList } = this.state
    return (
      <div className="todoapp">
        <Header addTodo={this.addTodo} />
        <TodoList todosList={todosList} />
        <Footer />
      </div>
    );
  }
}

export default App;
