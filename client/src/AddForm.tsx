import * as React from 'react'
import * as PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import { DatePicker } from './DatePicker'

interface Props {
  onNewItem: (a: string, b: number) => any;
}
export const AddForm = (props: Props) => {
  const [description, setDescription] = React.useState('')
  const [date, setDate] = React.useState(Math.floor(Date.now()/1000 + 3600 * 24))
  const [warning, setWarning] = React.useState(false)

  function handleChangeText (e: any) {
    if (warning) setWarning(false)

    setDescription(e.target.value)
  }

  function handleChangeDate (newDate: number) {
    setDate(newDate)
  }

  function handleSubmit () {
    if (description.length == 0) {
      setWarning(true)
      return
    }

    props.onNewItem(description, date)
  }

  return (
    <div>
      <Grid container justify="space-around">
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
          value={date}
          />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add
        </Button>
      </Grid>
    </div>
  )
}
