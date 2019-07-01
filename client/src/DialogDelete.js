import React from 'react'
import {Dialog, DialogTitle, DialogActions, Button} from '@material-ui/core'

function ConfirmDelete(props) {
  return (
    <Dialog
      open={props.open}
    >
      <DialogTitle>Are you sure you want to delete "{props.title}"</DialogTitle>
      <DialogActions>
        <Button onClick={props.onClickClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onClickConfirm} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDelete
