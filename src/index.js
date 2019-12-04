import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'

function Inputbox (props) {
  function handleInputChange (e) {
    props.onInputChange(e.target.value)
  }
  return (
    <div className='inputBox'>
      <input type='text' value={props.inputText} onChange={handleInputChange} name='ToDo' className='input' />
      <button onClick={props.onAddItem}>Add</button>
    </div>
  )
}

class TodoList extends React.Component {
  render () {
    return (<ul className='items'>
      {this.props.todoitems.map((item, index) => (
        <li key={index} id={index}>
          <input type='checkbox' checked={item.check} onClick={() => this.props.onChecked(index)} />
          <label style={(item.check) ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{item.name}</label>
        </li>
      ))}
    </ul>)
  }
}

class Todoapp extends React.Component {
  constructor (props) {
    super(props)
    this.state = { inputText: '', list: [{ name: 'First item', check: false }, { name: 'second item', check: true }] }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
  }

  handleAddItem (list) {
  	this.setState({
  		inputText: '',
  		list: this.state.list.concat({ name: this.state.inputText, check: false })
  	})
  }

  handleInputChange (inputText) {
  	this.setState({
  		inputText: inputText
  	})
  }

  handleCheckChange (index) {
  	const newlist = this.state.list.map((item, j) => {
  		if (j === index) {
        	item.check = !item.check
        return item
      } else {
        return item
      }
  	})
  	this.setState({
  		list: newlist
  	})
  }

  render () {
    return (
      <div>
        <h1>My ToDo list</h1>
        <Inputbox
          inputText={this.state.inputText}
          onAddItem={this.handleAddItem}
          onInputChange={this.handleInputChange} />
        <TodoList
          todoitems={this.state.list}
          onChecked={this.handleCheckChange} />
      </div>
    )
  }
}

ReactDOM.render(
  <Todoapp />,
  document.getElementById('root')
)
