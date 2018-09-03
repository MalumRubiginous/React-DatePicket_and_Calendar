import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { STYLE } from '../../../constants/index.js';
import { countDays, getWeekDay } from '../../../helper/handleDate';

const Container = styled.div`
    display: ${(props) => props.shouldShow ? 'block' : 'none'};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const WeekDayCell = styled.div`
    width: 35px;
    line-height: 35px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    cursor: default;
`;

const Cell = styled.div`
    width: 35px;
    border-radius: 50%;
    line-height: 35px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;

    ${(props) => props.isToday ? `color: ${STYLE.COLOR.HIGHLIGHT};` : ''}

    ${(props) => props.offColor ? `
        cursor: default;
        color: ${STYLE.COLOR.FADE_GRAY};
    ` : `cursor: pointer;
        &:hover {
            background: ${STYLE.COLOR.HIGHLIGHT};
            color: ${STYLE.COLOR.WHITE};
        }`
    }

    ${(props) => props.active ? `
        background: ${STYLE.COLOR.HIGHLIGHT};
        color: ${STYLE.COLOR.WHITE};
    ` : ''}
`;

export default class DatePanel extends PureComponent {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            shouldShow,
            daysLang,
            calendarMonth,
            calendarYear,
            selectedDate,
            select
        } = this.props;

        const today = new Date();
        const isTodayInThisMonth = (today.getMonth() === calendarMonth) && today.getFullYear() === calendarYear;
        const isSelectedMonth = selectedDate.month === calendarMonth && selectedDate.year === calendarYear;
        const daysOfPrevMonth = countDays(calendarYear, calendarMonth - 1);
        const daysOfThisMonth = countDays(calendarYear, calendarMonth);
        const firstWeekDay = getWeekDay(calendarYear, calendarMonth, 1);

        const weekDays = daysLang.map((item, index) => (
            <WeekDayCell key={`day_${index}`}>{item}</WeekDayCell>
        ));

        let content = [];
        for (let i = 0; i < 6; i++) {
            let eachRow = [];
            for (let j = 0; j < 7; j++) {
                const key = (i * 7) + j;
                const calendarMonthEnd = daysOfThisMonth + firstWeekDay - 1;

                if (key < firstWeekDay) { // previous month's tail
                    eachRow.push(
                        <Cell
                            key={`date_cell_${key}`}
                            offColor={true}
                        >{daysOfPrevMonth - firstWeekDay + 1 + j}</Cell>
                    );
                } else if (key > calendarMonthEnd) { // next month's head
                    eachRow.push(
                        <Cell
                            key={`date_cell_${key}`}
                            offColor={true}
                        >{key - calendarMonthEnd}</Cell>
                    );
                } else { // this month
                    const date = key - firstWeekDay + 1;
                    eachRow.push(
                        <Cell
                            key={`date_cell_${key}`}
                            isToday={isTodayInThisMonth && today.getDate() === date}
                            active={isSelectedMonth && selectedDate.date === date}
                            onClick={() => { select().date(calendarYear, calendarMonth, date); }}
                        >{date}</Cell>
                    );
                }
            }
            content.push(<Row key={`date_row_${i}`}>{eachRow}</Row>);
        }

        return (
            <Container shouldShow={shouldShow}>
                <Row>{weekDays}</Row>
                {content}
            </Container>
        );
    }
}
