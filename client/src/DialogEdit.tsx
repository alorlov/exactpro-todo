import * as React from 'react'
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button} from '@material-ui/core'
import { DatePicker } from './DatePicker'

interface Props {
  open: boolean,
  taskNum: number,
  description: string,
  duein: number,
  onClickClose: any,
  onClickEdit: any
}

function Edit(props: Props) {
  const {onClickClose, onClickEdit, taskNum} = props
  const [description, setDescription] = React.useState(props.description)
  const [duein, setDuein] = React.useState(props.duein)
  const [warn, setWarning] = React.useState(false)

  function handleChangeDate(date: number) {
    setDuein(date)
  }

  function handleChangeText(e: any) {
    setDescription(e.target.value)
  }

  function handleSubmit () {
    if (description.length == 0) {
      setWarning(true)
      return
    }

    onClickEdit(taskNum, description, duein)
  }

  return (
    <Dialog
      open={props.open}
    >
      <DialogTitle>Edit your todo</DialogTitle>
      <DialogContent>
        <TextField
          value={description}
          onChange={handleChangeText}
          margin="normal"
          placeholder="Type new todo"
          autoFocus
          error={warn && true}
          helperText={(warn && "Cannot be empty") || " "}
          />
        <DatePicker
          onChangeDate={handleChangeDate}
          value={duein}
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Edit
