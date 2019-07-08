import 'date-fns';
import * as React from 'react';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

import { formatDuein } from './actions/date'

interface Props {
  value: number;
  onChangeDate: (newDate: number) => any;
}

export function DatePicker(props: Props) {
  // const [selectedDate, setSelectedDate] = React.useState(props.value);
  const selectedDate = props.value

  function handleChangeDate(newDate: any) {
    props.onChangeDate(Math.floor(Date.parse(newDate)))
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDateTimePicker
          value={selectedDate}
          ampm={false}
          disablePast
          onChange={handleChangeDate}
          label={`Due in ${formatDuein(new Date(), new Date(selectedDate))}`}
          showTodayButton
          format="YYYY/MM/DD HH:mm"
        />
    </MuiPickersUtilsProvider>
  );
}
