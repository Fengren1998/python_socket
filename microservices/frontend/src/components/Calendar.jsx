import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      focused: false,
    };
  }

  render() {
    const { date, focused } = this.state;
    return (
      <SingleDatePicker
        id="datePicker"
        date={date}
        onDateChange={newDate => this.setState({ date: newDate })}
        focused={focused}
        onFocusChange={({ focused: focusedInput }) => this.setState({ focused: focusedInput })}
        withFullScreenPortal
      />
    );
  }
}

export default Calendar;
