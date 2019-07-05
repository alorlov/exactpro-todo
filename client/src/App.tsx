import * as React from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import { AddForm } from './AddForm'
import { TasksList } from './TasksList'

import { Actions as api } from './actions/api'
import { Task } from './types/Task'

export function App() {
  const [list, setList] = React.useState(null)

  function handleNewItem(description: string, duein: number) {
    api.create(description, duein)
    .then((id: number) => {
      let newList = list.slice()
      newList.push({id, description, duein})
      setList(newList)
    })

    .catch((error: string) => alert(error))
  }

  function handleDeleteItem(i: number) {
    api.deleteTask(list[i].id)
    .then(() => {
      let newList = list.slice()
      newList.splice(i, 1)
      setList(newList)
    })
    .catch((error: string) => alert(error))
  }

  function handleEditItem(i: number, description: string, duein: number) {
    let task = list[i]
    api.updateTask(task.id, description, duein)
    .then(() => {
      let newList = list.slice()
      newList[i] = {
        ...newList[i],
        description,
        duein
      }
      setList(newList)
    })
    .catch((error: string) => alert(error))
  }

  function getTasks() {
      api.getAll().then((tasks: Task[]) => {setList(tasks)})
      .catch((error: string) => alert(error))
      setList([])
    }

  if (!list) {
    getTasks()
  }

  return (
      <div className="app">
        <Paper className="form-add">
          <AddForm
            onNewItem={handleNewItem}
            />
        </Paper>
        <Paper>
          <TasksList
            list={list}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            />
        </Paper>
      </div>
  );
}
