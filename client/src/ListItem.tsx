import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  description: string,
  duein: number,
  onClickEdit: any,
  onClickDelete: any
}
export const Item = (props: Props) => {
  return (
      <ListItem button>
        <ListItemText primary={props.description} secondary={props.duein} />
        <button onClick={props.onClickEdit}>Edit</button>
        <button onClick={props.onClickDelete}>Delete</button>
      </ListItem>
  )
}
