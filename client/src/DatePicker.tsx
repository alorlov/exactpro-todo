import 'date-fns';
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';

interface Props {
  value: number;
  onChangeDate: (newDate: number) => any;
}

export function DatePicker(props: Props) {
  // const [selectedDate, setSelectedDate] = React.useState(props.value * 1000);
  const selectedDate = props.value * 1000

  function handleChangeDate(newDate: any) {
    props.onChangeDate(Math.floor(Date.parse(newDate) / 1000))
  }

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
