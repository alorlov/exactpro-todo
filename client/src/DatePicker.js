import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = React.useState(props.value * 1000);

  function handleChangeDate(date) {
    setSelectedDate(date)
    // return a unix-time
    props.onChangeDate(Math.floor(Date.parse(date) / 1000))
  }
  console.log(props.value);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={selectedDate}
          disablePast
          onChange={handleChangeDate}
          label="Due in"
          showTodayButton
        />
    </MuiPickersUtilsProvider>
  );
}
