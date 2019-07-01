import React from 'react'
import ReactDOM from 'react-dom'
import Item from './ListItem'

import DialogDelete from './DialogDelete'
import DialogEdit from './DialogEdit'

import List from '@material-ui/core/List';
import axios from 'axios'

class TasksList extends React.Component{
  state = {
    open: false,
    toOpenDelete: false,
    toEdit: false
  }

  activeTask = null

  getTask(i) {
    return this.props.list[i]
  }

  handleOpenDelete(i) {
    this.activeTask = i
    this.setState({open: true})
    this.setState({toOpenDelete: true})
  }

  handleOpenEdit(i) {
    this.activeTask = i
    this.setState({open: true})
    this.setState({toOpenEdit: true})
  }

  handleClose() {
    this.setState({
      open: false,
      toOpenDelete: false,
      toOpenEdit: false
    })
  }

  handleConfirmDelete(i) {
    this.props.onDeleteItem(i)
    this.handleClose()
  }

  handleEdit(i, description, duein) {
    this.props.onEditItem(i, description, duein)
    this.handleClose()
  }

  renderConfirmDelete(i) {
    let task = this.getTask(i)
    return (
      <DialogDelete
        open={this.state.open}
        title={task.description}
        onClickClose={this.handleClose.bind(this)}
        onClickConfirm={this.handleConfirmDelete.bind(this, i)}
      />
    )
  }

  renderEdit(i) {
    let task = this.getTask(i)
    return (
      <DialogEdit
        taskNum={i}
        open={this.state.open}
        description={task.description}
        duein={task.duein}
        onClickClose={this.handleClose.bind(this)}
        onClickEdit={this.handleEdit.bind(this)}
      />
    )
  }

  renderItem(task, i) {
    return <Item
      key={i}
      description = {task.description}
      duein = {task.duein}
      onClickEdit = {this.handleOpenEdit.bind(this, i)}
      onClickDelete = {this.handleOpenDelete.bind(this, i)}
      />
  }

  render() {
    return (
      <div>
        <List component="nav">
          {this.props.list.map((task, i) => this.renderItem(task, i))}
        </List>

        {this.state.toOpenDelete && this.renderConfirmDelete(this.activeTask)}
        {this.state.toOpenEdit && this.renderEdit(this.activeTask)}
      </div>
    );
  }
}

export default TasksList
