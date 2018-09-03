import React from 'react';
import ReactDOM from 'react-dom';
import { initDate } from './helper/handleDate.js'
import DatePicker from './components/DatePicker';
import Calendar from './components/calendar/Calendar';
import { injectGlobal } from 'styled-components';

injectGlobal`
    *, *:before, *:after {
        box-sizing: border-box;
    }
`;

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        const selectedDate = initDate();
        this.state = { selectedDate };
    }

    render() {
        return (
            <div>
                <DatePicker
                    selectedDate={this.state.selectedDate}
                    setSelectedDate={(selectedDate) => {
                        this.setState({ selectedDate });
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Index></Index>,
    document.getElementById('root')
);
