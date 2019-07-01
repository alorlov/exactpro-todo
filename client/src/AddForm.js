import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import DatePicker from './DatePicker'

class AddForm extends Component {
  state = {
    description: '',
    date: Math.floor(Date.now()/1000 + 3600 * 24),
    warning: false
  }


  handleChangeText (e) {
    if (this.state.warning) this.setState({warning: false})

    this.setState({description: e.target.value})
  }

  handleChangeDate (date) {
    this.setState({date: date})
  }

  handleSubmit () {
    if (this.state.description.length == 0) {
      this.setState({warning: true})
      return
    }

    let date = this.state.date
    this.props.onNewItem(this.state.description, date)
  }

  render () {
    let warn = this.state.warning

    return (
      <div>
        <Grid container justify="space-around">
          <TextField
            value={this.state.description}
            onChange={this.handleChangeText.bind(this)}
            margin="normal"
            placeholder="Type new todo"
            autoFocus
            error={warn && true}
            helperText={(warn && "Cannot be empty") || " "}
            />
          <DatePicker
            onChangeDate={this.handleChangeDate.bind(this)}
            value={this.state.date}
            />
          <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}>
          Add
          </Button>
        </Grid>
      </div>
    )
  }
}

export default AddForm
