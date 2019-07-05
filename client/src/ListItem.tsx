import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import { formatDuein } from './actions/date'

interface Props {
  description: string,
  duein: number,
  onClickEdit: any,
  onClickDelete: any
}


export const Item = (props: Props) => {
  return (
      <ListItem button>
        <ListItemText primary={props.description}/>
        <ListItemText secondary={formatDuein(new Date(), new Date(props.duein))} />
        <ListItemSecondaryAction>
          <IconButton onClick={props.onClickEdit} edge="end" aria-label="Comments">
            <InboxIcon />
          </IconButton>
          <IconButton onClick={props.onClickDelete} edge="end" aria-label="Comments">
            <InboxIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
  )
}
