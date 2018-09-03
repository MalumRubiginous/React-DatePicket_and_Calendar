# react-Datepicker & Calendar

## Install & Demo

```
    $ npm i
    $ npm run serve
```
Demo: http://localhost:8080

## Usage

```
class Demo extends React.Component {
    constructor(props) {
        super(props);

        const selected = initDate();
        this.state = { selected };
    }

    render() {
        return (
            <div>
                <DatePicker
                    selected={this.state.selected}
                    setSelectedDate={(selected) => {
                        this.setState({ selected });
                    }}
                />
            </div>
        );
    }
}
```

## Props

#### DatePicker

Prop            | Type           | Default  | Description
----------------|----------------|----------|----------------------------------------------------------------------
locale          | string         | 'en'     | Change language of calendar, see locale/langueges.js
selectedDate    | boolean/object | false    | Controll state at parent component. Should be initial by the helper.
setSelectedDate | function       | () => {} | A callback for child component to set state: selectedDate.

#### Calendar

Prop            | Type           | Default  | Description
----------------|----------------|----------|----------------------------------------------------------------------
shouldShow      | boolean        | true     | Controll calendar component displaying.
closeCalendar   | function       | () => {} | A callback for child component to set state: shouldShow.
locale          | string         | 'en'     | Change language of calendar, see locale/langueges.js
selectedDate    | boolean/object | false    | Controll state at parent component. Should be initial by the helper.
setSelectedDate | function       | () => {} | A callback for child component to set state: selectedDate.

