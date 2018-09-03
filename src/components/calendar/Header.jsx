import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { PANEL_KEYS, STYLE } from '../../constants/index.js';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px 0;
`;

const ShiftBtn = styled.button`
    width: 30px;
    height: 30px;
    padding: 0 10px;
    border: none;
    outline: none;
    border-radius: 50%;
    line-height: 30px;
    font-size: 20px;
    font-weight: none;
    background: transparent;
    cursor: pointer;
    color: ${STYLE.COLOR.PRIMARY_TEXT};

    ${(props) => `
        &::before {
            content: '${props.icon}';
            display: block;
            transform: translate(0px, -1.5px);
        }
    `}

    &:hover {
        background: ${STYLE.COLOR.HIGHLIGHT};
        color: ${STYLE.COLOR.WHITE};
    }
`;

const ZoomOutBtn = styled.button`
    flex: 1;
    margin: 0 5px;
    height: 30px;
    border: none;
    border-radius: 2px;
    outline: none;
    font-size: 14px;
    font-weight: bolder;
    background: #eee;
    cursor: pointer;
    color: #222;

    &:hover {
        background: #db3d44;
        color: #fff;
    }
`;

export default class Header extends PureComponent {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            panelKey,
            calendarMonth,
            calendarYear,
            firstYear,
            monthsLang,
            changePanel,
            zoomOutPanel
        } = this.props;

        let clickPrev = {};
        clickPrev[PANEL_KEYS.DATE] = () => { changePanel().month(calendarMonth - 1); };
        clickPrev[PANEL_KEYS.MONTH] = () => { changePanel().year(calendarYear - 1); };
        clickPrev[PANEL_KEYS.YEAR] = () => { changePanel().year(calendarYear - 10); };

        let clickNext = {};
        clickNext[PANEL_KEYS.DATE] = () => { changePanel().month(calendarMonth + 1); };
        clickNext[PANEL_KEYS.MONTH] = () => { changePanel().year(calendarYear + 1); };
        clickNext[PANEL_KEYS.YEAR] = () => { changePanel().year(calendarYear + 10); };

        let headerText = {};
        headerText[PANEL_KEYS.DATE] = `${monthsLang[calendarMonth]} ${calendarYear}`;
        headerText[PANEL_KEYS.MONTH] = calendarYear;
        headerText[PANEL_KEYS.YEAR] = `${firstYear}-${firstYear + 9}`;

        return (
            <Container>
                <ShiftBtn icon={'\u2039'} onClick={clickPrev[panelKey]} />
                <ZoomOutBtn onClick={zoomOutPanel}>{headerText[panelKey]}</ZoomOutBtn>
                <ShiftBtn icon={'\u203A'} onClick={clickNext[panelKey]} />
            </Container>
        );
    }
}
