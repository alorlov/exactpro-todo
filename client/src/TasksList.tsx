import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Item } from './TasksItem'
import { Task } from './types/Task'

import DialogDelete from './DialogDelete'
import DialogForm from './DialogForm'

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import IconAdd from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

interface Props {
  list: Task[];
  onAddItem: (description: string, duein: number) => any;
  onEditItem: (listNum: number, description: string, duein: number) => any;
  onDeleteItem: (listNum: number) => any;
}

export const TasksList = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  const [toOpenAdd, setToOpenAdd] = React.useState(false)
  const [toOpenEdit, setToOpenEdit] = React.useState(false)
  const [toOpenDelete, setToOpenDelete] = React.useState(false)
  const [activeTask, setActiveTask] = React.useState(null)

  function getTask(i: number): Task {
    return props.list[i]
  }

  function handleOpenAdd() {
    setOpen(true)
    setToOpenAdd(true)
  }

  function handleOpenEdit(i: number) {
    setActiveTask(i)
    setOpen(true)
    setToOpenEdit(true)
  }

  function handleOpenDelete(i: number) {
    setActiveTask(i)
    setOpen(true)
    setToOpenDelete(true)
  }

  function handleClose() {
    setOpen(false)
    setToOpenDelete(false)
    setToOpenEdit(false)
  }

  function handleAdd(description: string, duein: number) {
    props.onAddItem(description, duein)
    handleClose()
  }

  function handleEdit(i: number, description: string, duein: number) {
    props.onEditItem(i, description, duein)
    handleClose()
  }

  function handleConfirmDelete(i: number) {
    props.onDeleteItem(i)
    handleClose()
  }

  function renderAdd() {
    return (
      <DialogForm
        dialogTitle="Add what you want todo"
        taskNum={0}
        open={open}
        description=""
        duein={Date.now()}
        onClickClose={handleClose}
        onClickConfirm={handleAdd}
      />
    )
  }

  function renderEdit(i: number) {
    let task = getTask(i)
    return (
      <DialogForm
        dialogTitle="Edit your todo"
        taskNum={i}
        open={open}
        description={task.description}
        duein={task.duein}
        onClickClose={handleClose}
        onClickConfirm={handleEdit.bind(this, i)}
      />
    )
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
      <List component="nav"
        subheader={
          <Grid container justify="flex-end">
            <Button variant="text" onClick={handleOpenAdd}>
              Add Task
              <IconAdd />
            </Button>
          </Grid>
      }>
        {props.list.map((task, i) => renderItem(task, i))}
      </List>

      {toOpenAdd && renderAdd()}
      {toOpenEdit && renderEdit(activeTask)}
      {toOpenDelete && renderConfirmDelete(activeTask)}
    </div>
  )
}

export default TasksList
