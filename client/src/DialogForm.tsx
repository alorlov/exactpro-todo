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
  dialogTitle: string,
  open: boolean,
  taskNum: number,
  description: string,
  duein: number,
  onClickClose: any,
  onClickConfirm: any
}

function Edit(props: Props) {
  const {onClickClose, onClickConfirm, taskNum} = props
  const [description, setDescription] = React.useState(props.description)
  const [duein, setDuein] = React.useState(props.duein)
  const [warning, setWarning] = React.useState(false)

  function handleChangeDate(date: number) {
    setDuein(date)
  }

  function handleChangeText(e: any) {
    if (warning) setWarning(false)
    setDescription(e.target.value)
  }

  function handleClickConfirm () {
    if (description.length == 0) {
      setWarning(true)
      return
    }

    setDescription("")
    onClickConfirm(description, duein)
  }

  return (
    <Dialog
      open={props.open}
    >
      <DialogTitle>{props.dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          value={description}
          onChange={handleChangeText}
          margin="normal"
          placeholder="Type new todo"
          autoFocus
          error={warning && true}
          helperText={(warning && "Cannot be empty") || " "}
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
        <Button onClick={handleClickConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Edit
