import { FIND_ALL_WIDGETS, ADD_WIDGET, DELETE_WIDGET, SAVE, SELECT_WIDGET_TYPE, FIND_WIDGETS_FOR_LESSON_TOPIC } from "../constants/index";

export const widgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
        case SELECT_WIDGET_TYPE:
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
        case SAVE:
            let HOST = 'https://webdev-java-server.herokuapp.com';
            fetch(HOST + '/api/widgets/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            });
            return state;
        case FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            }
        case FIND_WIDGETS_FOR_LESSON_TOPIC:
            return {
                widgets: action.widgets
            }
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length + 1,
                        text: 'New Widget', widgetType: 'Paragraph' }
                ]
            }
        default:
            return state;
    }
}