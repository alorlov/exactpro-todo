import React from "react";
import "./App.css";
import { MuiThemeProvider } from '@material-ui/core/styles'
import AddForm from "./AddForm"
import TasksList from "./TasksList"

import api from './api-actions'

function App() {
  const [list, setList] = React.useState(null)

  function handleNewItem(description, duein) {
    api.create(description, duein)
    .then(id => {
      let newList = list.slice()
      newList.push({id, description, duein})
      setList(newList)
    })
    .catch(error => alert(error))
  }

  function handleDeleteItem(i) {
    api.deleteTask(list[i].id)
    .then(() => {
      let newList = list.slice()
      newList.splice(i, 1)
      setList(newList)
    })
    .catch(error => alert(error))
  }

  function handleEditItem(i, description, duein) {
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
    .catch(error => alert(error))
  }

  function getTasks() {
      api.getAll().then(tasks => {setList(tasks)})
      .catch(error => alert(error))
      setList([])
    }

  if (!list) {
    getTasks()
  }

  return (
    <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <AddForm
            onNewItem={handleNewItem}
            />
          <TasksList
            list={list}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            />
        </header>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
