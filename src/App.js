import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todoTitle: '',
      allSelected: false
    };

    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  componentDidMount() {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const todos = '/todos';

    return fetch(baseUrl + todos)
      .then(data => data.json())
      .then(todos => this.setState({ todos: todos.slice(0, 3) }));
  }

  handleSelect(e, index) {
    const todos = this.state.todos.map((todo, idx) => {
      if (index === idx) {
        return { id: todo.id, title: todo.title, completed: e.target.checked };
      } else {
        return todo;
      }
    });
    this.setState({ todos });
  }

  handleSelectAll(e) {
    const todos = this.state.todos.map(todo => {
      return { id: todo.id, title: todo.title, completed: e.target.checked };
    });
    this.setState({ todos, allSelected: e.target.checked });
  }

  handleRemove(e, i) {
    const todos = this.state.todos.filter((todo, idx) => {
      return idx !== i;
    });
    this.setState({ todos });
  }

  handleAdd(e) {
    e.preventDefault();
    const todo = {
      userId: 'browser_user',
      id: this.state.todos.length + 1,
      title: this.state.todoTitle,
      completed: false
    };
    const todos = this.state.todos;
    if (this.state.todoTitle.length !== 0) {
      todos.unshift(todo);
    }
    this.setState({ todos, todoTitle: '', allSelected: false });
  }

  handleInputChange(e) {
    this.setState({ todoTitle: e.target.value });
  }

  handleRemoveAll() {
    if (window.confirm('Are you sure you want to clear all todos?')) {
      this.setState({ todos: [], allSelected: false });
    }
  }

  render() {
    const todoStyle = {
      border: '1px black',
      borderStyle: 'dotted',
      width: '30%',
      margin: '10px auto',
      padding: 3
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo.js</h1>
        </header>
        <div>
          <h3 style={{ marginBottom: 5 }}>Add a new todo:</h3>
          <form onSubmit={this.handleAdd} style={{ display: 'inline-block' }}>
            <input type="text" style={{ padding: 5 }} onChange={this.handleInputChange} value={this.state.todoTitle} />
          </form>
          <button onClick={this.handleAdd} style={{ marginLeft: 5, display: 'inline-block' }}>
            Add
          </button>
          {this.state.todos.length > 0 && (
            <hr
              style={{
                width: '50%',
                margin: '35px auto',
                borderStyle: 'dashed'
              }}
            />
          )}

          {this.state.todos.length > 1 && (
            <div className="complete-all-wrap clearfix">
              <h4 style={{ float: 'left' }}>Complete All:</h4>
              <input
                type="checkbox"
                onChange={this.handleSelectAll}
                className="complete-all-checkbox"
                checked={this.state.allSelected}
              />
              {this.state.allSelected && (
                <button onClick={this.handleRemoveAll} className="complete-all-checkbox" style={{ right: '10%' }}>
                  Clear Todos
                </button>
              )}
            </div>
          )}

          {this.state.todos.map((todo, idx) => (
            <div key={todo.id} style={todoStyle}>
              <button onClick={e => this.handleRemove(e, idx)} style={{ float: 'right', cursor: 'pointer' }}>
                X
              </button>
              <p>
                <strong>{todo.title}</strong>
              </p>
              <span>Complete:</span>
              <input
                type="checkbox"
                onChange={e => this.handleSelect(e, idx)}
                checked={todo.completed}
                value={todo.completed}
                style={{ cursor: 'pointer', marginLeft: 8 }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
