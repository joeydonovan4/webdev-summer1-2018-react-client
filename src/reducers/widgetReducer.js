import * as constants from "../constants/index";

export const widgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
        case constants.SELECT_WIDGET_TYPE:
            console.log(action);
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.className = action.className
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState));
        case constants.SAVE:
            let HOST = 'https://webdev-java-server.herokuapp.com';
            fetch(HOST + '/api/widgets/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;
        case constants.FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            }
        case constants.FIND_WIDGETS_FOR_LESSON_TOPIC:
            return {
                widgets: action.widgets
            }
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length + 1,
                        text: 'New Widget', widgetType: 'Paragraph' }
                ]
            }
        case constants.HEADING_TEXT_UPDATED:
            console.log(action);
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget);
                })
            }
        default:
            return state;
    }
}