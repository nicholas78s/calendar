import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const now = new Date(2017, 2, 8);
const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

function dayOfWeekName(now) {
  let dayName = now.toLocaleDateString('ru-RU', { weekday: 'long' });
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

function monthName(now) {
  let monthName = now.toLocaleDateString('ru-RU', { month: 'long' });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

const CalendarDay = (props) => {
  let calendarDate = new Date(props.firstDate);
  calendarDate.setDate(calendarDate.getDate() + props.pos);
  let className = (calendarDate.getMonth() === props.selectedDate.getMonth()) ? '' : 'ui-datepicker-other-month';
  className = (calendarDate.getTime() === props.selectedDate.getTime()) ? 'ui-datepicker-today' : className;

  return (
    <td className={className}>
      {calendarDate.getDate()}
    </td>
    
  );
}

const CalendarRow = (props) => {
  return (
    <tr>
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={0} />
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={1} />
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={2} />
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={3} />
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={4} />
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={5} />
      <CalendarDay firstDate={props.firstDate} selectedDate={props.selectedDate} pos={6} />
    </tr>
  );
}

const Calendar = (props) => {
  let firstDate = new Date (props.date.getFullYear(), props.date.getMonth(), 1);
  let dayOfWeek = (firstDate.getDay() == 0) ? 7 : firstDate.getDay() - 1;
  console.log('firstDate', firstDate, firstDate.getDay(), dayOfWeek);
  firstDate.setDate(firstDate.getDate() - dayOfWeek);
  console.log('firstDate', firstDate, firstDate.getDay(), dayOfWeek);

  let weekFirstDays = [];
  while (firstDate.getMonth() + firstDate.getFullYear() * 100 <= props.date.getMonth() + props.date.getFullYear() * 100) {
    if (firstDate.getDay() == 1)
      weekFirstDays.push(new Date (firstDate));
      firstDate.setDate(firstDate.getDate() + 1);
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeekName(props.date)}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{props.date.getDate()}</div>
          <div className="ui-datepicker-material-month">{monthNames[props.date.getMonth()]}</div>
          <div className="ui-datepicker-material-year">{props.date.getFullYear()}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthName(props.date)}</span>&nbsp;<span className="ui-datepicker-year">{props.date.getFullYear()}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {weekFirstDays.map((item) => <CalendarRow firstDate={item} selectedDate={props.date} />)}
        </tbody>
      </table>
    </div>
  )
}

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App
