import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Item } from './ListItem'
import { Task } from './types/Task'

import DialogDelete from './DialogDelete'
import DialogEdit from './DialogEdit'

import List from '@material-ui/core/List';
import axios from 'axios'

interface Props {
  list: Task[];
  onEditItem: (listNum: number, description: string, duein: number) => any;
  onDeleteItem: (listNum: number) => any;
}

export const TasksList = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  const [toOpenDelete, setToOpenDelete] = React.useState(false)
  const [toOpenEdit, setToOpenEdit] = React.useState(false)
  const [activeTask, setActiveTask] = React.useState(null)

  function getTask(i: number): Task {
    return props.list[i]
  }

  function handleOpenDelete(i: number) {
    setActiveTask(i)
    setOpen(true)
    setToOpenDelete(true)
  }

  function handleOpenEdit(i: number) {
    setActiveTask(i)
    setOpen(true)
    setToOpenEdit(true)
  }

  function handleClose() {
    setOpen(false)
    setToOpenDelete(false)
    setToOpenEdit(false)
  }

  function handleConfirmDelete(i: number) {
    props.onDeleteItem(i)
    handleClose()
  }

  function handleEdit(i: number, description: string, duein: number) {
    props.onEditItem(i, description, duein)
    handleClose()
  }

  function renderConfirmDelete(i: number) {
    let task: Task = getTask(i)
    return (
      <DialogDelete
        open={open}
        title={task.description}
        onClickClose={handleClose}
        onClickConfirm={handleConfirmDelete.bind(this, i)}
      />
    )
  }

  function renderEdit(i: number) {
    let task = getTask(i)
    return (
      <DialogEdit
        taskNum={i}
        open={open}
        description={task.description}
        duein={task.duein}
        onClickClose={handleClose}
        onClickEdit={handleEdit}
      />
    )
  }

  function renderItem(task: Task, i: number) {
    return <Item
      key={i}
      description = {task.description}
      duein = {task.duein}
      onClickEdit = {handleOpenEdit.bind(this, i)}
      onClickDelete = {handleOpenDelete.bind(this, i)}
      />
  }

  return (
    <div>
      <List component="nav">
        {props.list.map((task, i) => renderItem(task, i))}
      </List>

      {toOpenDelete && renderConfirmDelete(activeTask)}
      {toOpenEdit && renderEdit(activeTask)}
    </div>
  )
}

export default TasksList
