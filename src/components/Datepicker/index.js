import { ErrorMessage } from "components/ErrorMessage";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Datepicker({
  placeholder = "Select date",
  className,
  value,
  dateFormat = "dd/MM/yyyy",
  onChange,
  errors = [],
  ...restProps
}) {
  const [selectedDate, setSelectedDate] = React.useState(value);

  const onDateChange = (value) => {
    setSelectedDate(value);
    onChange?.(value.toISOString());
  };

  return (
    <>
      <div className={className}>
        <DatePicker
          dateFormat={dateFormat}
          placeholderText={placeholder}
          selected={selectedDate}
          onChange={onDateChange}
          {...restProps}
        />
      </div>
      <ErrorMessage errors={errors} />
    </>
  );
}

function DatePickerRange({
  startDate,
  endDate,
  placeholder = "Select range",
  className,
  dateFormat = "dd/MM/yyyy",
  onChange,
  errors = [],
  ...restProps
}) {
  const [startDateValue, setStartDate] = React.useState(startDate);
  const [endDateValue, setEndDate] = React.useState(endDate);

  const onDateChange = ([start, end]) => {
    setStartDate(start);
    setEndDate(end);
    onChange?.([start.toISOString(), end.toISOString()]);
  };

  return (
    <>
      <div className={className}>
        <DatePicker
          dateFormat={dateFormat}
          placeholderText={placeholder}
          startDate={startDateValue}
          endDate={endDateValue}
          onChange={onDateChange}
          selectsRange
          {...restProps}
        />
      </div>
      <ErrorMessage errors={errors} />
    </>
  );
}

Datepicker.Range = DatePickerRange;
Datepicker.DateTime = (props) => (
  <Datepicker dateFormat="dd/MM/yyyy h:mm aa" showTimeSelect {...props} />
);
Datepicker.Time = (props) => (
  <Datepicker
    dateFormat="h:mm aa"
    showTimeSelect
    showTimeSelectOnly
    {...props}
  />
);
