import * as constants from "../constants/index";

export const widgetReducer = (state = {widgets: [], preview: "OFF"}, action) => {
    let idx, temp;
    switch (action.type) {
        case constants.PREVIEW_MODE:
            if (state.preview === "OFF") {
                return {
                    widgets: state.widgets,
                    preview: "ON"
                }
            } else {
                return {
                    widgets: state.widgets,
                    preview: "OFF"
                }
            }
        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                }),
                preview: state.preview
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
                widgets: action.widgets,
                preview: state.preview
            }
        case constants.FIND_WIDGETS_FOR_LESSON_TOPIC:
            return {
                widgets: action.widgets,
                preview: state.preview
            }
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )),
                preview: state.preview
            }
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length + 1,
                        widgetType: 'Heading', order: state.widgets.slice(-1).order + 1}
                ],
                preview: state.preview
            }
        case constants.WIDGET_NAME_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.LINK_TEXT_UPDATED:
        case constants.PARAGRAPH_TEXT_UPDATED:
        case constants.HEADING_TEXT_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.HEADING_SIZE_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.size = action.size;
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.LIST_ITEMS_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.listItems = action.listItems;
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.LIST_TYPE_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType;
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.SRC_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.src = action.src;
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.HREF_UPDATED:
            return {
                widgets: state.widgets.map((widget) => {
                    if (widget.id === action.id) {
                        widget.href = action.href;
                    }
                    return Object.assign({}, widget);
                }),
                preview: state.preview
            }
        case constants.MOVE_WIDGET_UP:
            idx = state.widgets.indexOf(action.widget);
            if (idx === 0) {
                return state;
            } else {
                temp = state.widgets[idx-1].order;
                state.widgets[idx-1].order = action.widget.order;
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.id === action.widget.id) {
                            widget.order = temp;
                        }
                        return Object.assign({}, widget);
                    }),
                    preview: state.preview
                }
            }
        case constants.MOVE_WIDGET_DOWN:
            idx = state.widgets.indexOf(action.widget);
            if (idx === state.widgets.length-1) {
                return state;
            } else {
                temp = state.widgets[idx+1].order;
                state.widgets[idx+1].order = action.widget.order;
                return {
                    widgets: state.widgets.map((widget) => {
                        if (widget.id === action.widget.id) {
                            widget.order = temp;
                        }
                        return Object.assign({}, widget);
                    }),
                    preview: state.preview
                }
            }
        default:
            return state;
    }
}