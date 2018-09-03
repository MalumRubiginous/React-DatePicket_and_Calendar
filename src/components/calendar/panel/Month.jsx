import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { STYLE } from '../../../constants/index.js';

const Container = styled.div`
    display: ${(props) => props.shouldShow ? 'block' : 'none'};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 70px;
`;

const Cell = styled.div`
    margin: 10px 0;
    width: 50px;
    border-radius: 50%;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    cursor: pointer;

    ${(props) => props.active ? `
        background: ${STYLE.COLOR.HIGHLIGHT};
        color: ${STYLE.COLOR.WHITE};
    ` : ''}

    &:hover {
        background: ${STYLE.COLOR.HIGHLIGHT};
        color: ${STYLE.COLOR.WHITE};
    }
`;

export default class MonthPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            shouldShow,
            monthsLang,
            calendarYear,
            calendarMonth,
            selectedDate,
            select
        } = this.props;
        const isSelectedYear = selectedDate.year === calendarYear;

        let content = [];
        for (let i = 0; i < 3; i++) {
            let eachRow = [];
            for (let j = 0; j < 4; j++) {
                const key = (i * 4) + j;
                eachRow.push(
                    <Cell
                        key={`mon_cell_${key}`}
                        active={isSelectedYear && calendarMonth === key}
                        onClick={() => { select().month(calendarYear, key); }}
                    >{monthsLang[key]}</Cell>
                );
            }
            content.push(<Row key={`mon_row_${i}`}>{eachRow}</Row>);
        }

        return (
            <Container shouldShow={shouldShow}>{content}</Container>
        );
    }
}
