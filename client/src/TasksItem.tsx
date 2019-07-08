import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import IconEdit from '@material-ui/icons/Edit';
import IconDelete from '@material-ui/icons/Delete';
import { formatDuein } from './actions/date'

interface Props {
  description: string,
  duein: number,
  onClickEdit: any,
  onClickDelete: any
}


export const Item = (props: Props) => {
  return (
      <ListItem>
        <Grid container>
          <Grid item xs={8}>
            <ListItemText primary={props.description}/>
          </Grid>
          <Grid item xs={2}>
            <ListItemText secondary={formatDuein(new Date(), new Date(props.duein))} />
          </Grid>
          <Grid item xs={2}>
            <ListItemSecondaryAction>
            <IconButton onClick={props.onClickEdit} edge="end" aria-label="Comments">
            <IconEdit />
            </IconButton>
            <IconButton onClick={props.onClickDelete} edge="end" aria-label="Comments">
            <IconDelete />
            </IconButton>
            </ListItemSecondaryAction>
          </Grid>
        </Grid>
      </ListItem>
  )
}
