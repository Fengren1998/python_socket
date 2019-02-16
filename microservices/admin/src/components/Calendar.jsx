import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      currentStartDate: null,
      currentEndDate: null,
      currentFocusedInput: null,
    };
  }

  render() {
    const { currentStartDate, currentEndDate, currentFocusedInput } = this.state;
    return (
      <DateRangePicker
        startDate={currentStartDate}
        startDateId="startDateId"
        endDate={currentEndDate}
        endDateId="endDateId"
        onDatesChange={
          ({ startDate, endDate }) => this.setState({
            currentStartDate: startDate,
            currentEndDate: endDate,
          })
        }
        focusedInput={currentFocusedInput}
        onFocusChange={focusedInput => this.setState({ currentFocusedInput: focusedInput })}
        withFullScreenPortal
      />
    );
  }
}

export default Calendar;
