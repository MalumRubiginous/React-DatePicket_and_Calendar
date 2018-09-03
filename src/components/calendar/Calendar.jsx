import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PANEL_KEYS, STYLE } from '../../constants/index.js';
import { initDate } from '../../helper/handleDate.js';
import lang from '../../locale/languages.js';
import Header from './Header'
import DatePanel from './panel/Date';
import MonthPanel from './panel/Month';
import YearPanel from './panel/Year';

const Container = styled.div`
    ${(props) => props.shouldShow ? '' : 'display: none;'}
    position: absolute;
    padding: 10px 0;
    width: 267px;
    border: 1px solid ${STYLE.COLOR.FADE_GRAY};
    color: ${STYLE.COLOR.PRIMARY_TEXT};
    font-family: monospace;
`;

const Content = styled.div`
    width: 100%;
    padding: 0 10px;
`;

export default class Calendar extends PureComponent {
    constructor (props) {
        super(props);

        if (!props.selectedDate) {
            const selectedDate = initDate();
            const calendarMonth = selectedDate.month;
            const calendarYear = selectedDate.year;
            const firstYear = Math.floor(calendarYear / 10) * 10;

            this.state = {
                panelKey: PANEL_KEYS.DATE,
                selectedDate,
                calendarMonth,
                calendarYear,
                firstYear,
            };
        } else {
            const { month, year } = props.selectedDate;
            this.state = {
                panelKey: PANEL_KEYS.DATE,
                selectedDate: false,
                calendarMonth: month,
                calendarYear: year,
                firstYear: Math.floor(year / 10) * 10,
            };
        }

        this.zoomOutPanel = this.zoomOutPanel.bind(this);
        this.zoomInPanel = this.zoomInPanel.bind(this);
        this.updateSelectedDate = this.updateSelectedDate.bind(this);
        this.changePanel = this.changePanel.bind(this);
        this.select = this.select.bind(this);
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.selectedDate.raw !== this.props.selectedDate.raw) {
            const { month, year } = this.props.selectedDate;
            this.changePanel().year(year);
            this.changePanel().month(month);
        }
    }

    zoomOutPanel () {
        const { panelKey } = this.state;
        if (panelKey === PANEL_KEYS.YEAR) { return; }
        this.setState({
            panelKey: panelKey === PANEL_KEYS.DATE ? PANEL_KEYS.MONTH : PANEL_KEYS.YEAR
        });
    }

    zoomInPanel (key) {
        this.setState({
            panelKey: key
        });
    }

    updateSelectedDate (selectedDate) {
        if (this.state.selectedDate) {
            this.setState({ selectedDate });
        } else {
            this.props.setSelectedDate(selectedDate);
        }
    }

    changePanel () {
        const updateYear = (year) => {
            if (year < 1970) { return; }

            this.setState({
                calendarYear: year,
                firstYear: Math.floor(year / 10) * 10
            });
        }

        const updateMonth = (month) => {
            const { calendarYear } = this.state;

            if (month < 0) {
                month = 11;
                updateYear(calendarYear - 1);
            } else if (month > 11) {
                month = 0;
                updateYear(calendarYear + 1);
            }
            this.setState({
                calendarMonth: month,
            });
        }

        return {
            year: updateYear,
            month: updateMonth
        };
    }

    select () {
        const selectedDate = this.state.selectedDate ?
            this.state.selectedDate : this.props.selectedDate;

        const updateYear = (year) => {
            this.zoomInPanel(PANEL_KEYS.MONTH);
            this.changePanel().year(year);
            this.updateSelectedDate(
                initDate(`${year}-${selectedDate.month + 1}-${selectedDate.date}`)
            );
        };

        const updateMonth = (year, month) => {
            this.zoomInPanel(PANEL_KEYS.DATE);
            this.changePanel().month(month);
            this.updateSelectedDate(
                initDate(`${year}-${month + 1}-${selectedDate.date}`)
            );
        };

        const updateDate = (year, month, date) => {
            this.updateSelectedDate(
                initDate(`${year}-${month + 1}-${date}`)
            );
            this.props.closeCalendar();
        };

        return {
            year: updateYear,
            month: updateMonth,
            date: updateDate,
        };
    }

    render () {
        const { locale, shouldShow } = this.props;
        const { panelKey, calendarMonth, calendarYear, firstYear } = this.state;
        const selectedDate = this.state.selectedDate ?
            this.state.selectedDate : this.props.selectedDate;

        return (
            <Container shouldShow={shouldShow}>
                <Header
                    panelKey={panelKey}
                    zoomOutPanel={this.zoomOutPanel}
                    changePanel={this.changePanel}
                    calendarYear={calendarYear}
                    calendarMonth={calendarMonth}
                    monthsLang={lang[locale].months}
                    firstYear={firstYear}
                />
                <Content>
                    <DatePanel
                        shouldShow={panelKey === PANEL_KEYS.DATE}
                        select={this.select}
                        selectedDate={selectedDate}
                        calendarYear={calendarYear}
                        calendarMonth={calendarMonth}
                        daysLang={lang[locale].days}
                    />
                    <MonthPanel
                        shouldShow={panelKey === PANEL_KEYS.MONTH}
                        select={this.select}
                        selectedDate={selectedDate}
                        calendarYear={calendarYear}
                        calendarMonth={calendarMonth}
                        monthsLang={lang[locale].months}
                    />
                    <YearPanel
                        shouldShow={panelKey === PANEL_KEYS.YEAR}
                        select={this.select}
                        selectedDate={selectedDate}
                        calendarYear={calendarYear}
                        firstYear={firstYear}
                    />
                </Content>
            </Container>
        );
    }
}

Calendar.propTypes = {
    locale: PropTypes.string,
    setSelectedDate: PropTypes.func,
    closeCalendar: PropTypes.func,
    shouldShow: PropTypes.bool
};

Calendar.defaultProps = {
    locale: 'en',
    selectedDate: false,
    setSelectedDate: () => {},
    closeCalendar: () => {},
    shouldShow: true
};
