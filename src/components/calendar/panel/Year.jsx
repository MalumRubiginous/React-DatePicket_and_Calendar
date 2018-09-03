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
    font-size: 14px;
    text-align: center;

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

export default class YearPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { shouldShow, calendarYear, firstYear, select, selectedDate } = this.props;
        let content = [];
        for (let i = 0; i < 3; i++) {
            let eachRow = [];
            for (let j = 0; j < 4; j++) {
                const key = (i * 4) + j;
                const year = firstYear + key - 1;
                const isOffColor = (key === 0 || key === 11);
                eachRow.push(
                    <Cell
                        key={`year_cell_${key}`}
                        offColor={isOffColor}
                        active={selectedDate.year === year}
                        onClick={() => (isOffColor ? null : select().year(year))}
                    >{year}</Cell>
                );
            }
            content.push(<Row key={`year_row_${i}`}>{eachRow}</Row>);
        }

        return (
            <Container shouldShow={shouldShow}>{content}</Container>
        );
    }
}
