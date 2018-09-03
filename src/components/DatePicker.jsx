import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { STYLE } from '../constants/index.js';
import { bindClickOutside } from '../helper/bindClickOutside.js';
import { initDate, isLegalDate, simpleTimeFormat } from '../helper/handleDate.js';
import Calendar from './calendar/Calendar';

const Container = styled.div`
    display: inline;
`;

const DateInput = styled.input`
    font-family: monospace;
    width: 130px;
    padding: 5px 10px 5px 30px;
    outline: none;
    border: 1px solid ${STYLE.COLOR.FADE_GRAY};
    border-radius: 2px;
    font-size: 14px;
    background: url(icon/calendar.svg) 5px/17px no-repeat;

    ${(props) => props.isCalendarShow ? `
        border-color: ${STYLE.COLOR.INPUT_HIGHLIGHT};
        background: url(icon/calendar_active.svg) 5px/17px no-repeat;
    ` : ''}

`;

export default class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props);

        if (!props.selectedDate) {
            const selectedDate = initDate();
            this.state = {
                isCalendarShow: false,
                selectedDate,
            };
        } else {
            const { month, year } = props.selectedDate;
            this.state = {
                isCalendarShow: false,
                selectedDate: false,
            };
        }

        this.setDatePicker = this.setDatePicker.bind(this);
        this.handleKeyIn = this.handleKeyIn.bind(this);
    }

    setDatePicker (selectedDate) {
        if (this.state.selectedDate) {
            this.setState({ selectedDate });
        } else {
            this.props.setSelectedDate(selectedDate);
        }
        this.dateInput.value = simpleTimeFormat(selectedDate.raw);
    }

    handleKeyIn (evt) {
        const date = isLegalDate(evt.target.value);
        if (date) {
            this.setDatePicker(initDate(date));
        } else {
            const selectedDate = this.state.selectedDate ?
                this.state.selectedDate : this.props.selectedDate;
            evt.target.value = simpleTimeFormat(selectedDate.raw);
        }
    }

    render() {
        const { locale } = this.props;
        const { isCalendarShow } = this.state;
        const selectedDate = this.state.selectedDate ?
            this.state.selectedDate : this.props.selectedDate;

        return (
            <Container innerRef={(elem) => { this.datePickerElem = elem; }}>
                <DateInput
                    innerRef={(elem) => { this.dateInput = elem; }}
                    type="text"
                    defaultValue={simpleTimeFormat(selectedDate.raw)}
                    isCalendarShow={isCalendarShow}
                    onKeyPress={(evt) => {
                        if (evt.key === 'Enter') {
                            this.handleKeyIn(evt);
                        }
                    }}
                    onBlur={this.handleKeyIn}
                    onFocus={() => {
                        this.setState({ isCalendarShow: true });
                        bindClickOutside(this.datePickerElem, () => {
                            this.setState({ isCalendarShow: false });
                        });
                    }}
                />
                <Calendar
                    locale={locale}
                    selectedDate={selectedDate}
                    setSelectedDate={this.setDatePicker}
                    shouldShow={isCalendarShow}
                    closeCalendar={() => { this.setState({ isCalendarShow: false }); }}
                />
            </Container>
        );
    }
}

DatePicker.propTypes = {
    locale: PropTypes.string,
    setSelectedDate: PropTypes.func,
};

DatePicker.defaultProps = {
    locale: 'en',
    selectedDate: false,
    setSelectedDate: () => {},
};
