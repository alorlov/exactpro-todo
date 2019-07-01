import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

var Item = (props) => {
  return (
      <ListItem button>
        <ListItemText primary={props.description} secondary={props.duein} />
        <button onClick={props.onClickEdit}>Edit</button>
        <button onClick={props.onClickDelete}>Delete</button>
      </ListItem>
  );
}

export default Item
