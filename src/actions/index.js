import * as constants from "../constants/index";
import store from '../store/index';

const HOST = 'https://webdev-java-server.herokuapp.com';

export const togglePreviewMode = dispatch => (
    dispatch({type: constants.PREVIEW_MODE})
);

export const findAllWidgets = dispatch => {
    fetch(HOST + '/api/widgets')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }));
};

export const findWidgetsForLessonTopic = (dispatch, lessonId, topicId) => {
    fetch(HOST + '/api/lessons/' + lessonId + '/topics/' + topicId + '/widgets')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_WIDGETS_FOR_LESSON_TOPIC,
            widgets: widgets
        }));
};

export const deleteWidget = (dispatch, widgetId) => {
    fetch(HOST + '/api/widgets/' + widgetId, {
        method: 'delete'
    })
    .then(response => (response.json()))
    .then(widgets => dispatch({
            type: constants.DELETE_WIDGET,
            id: widgetId
    }));
}

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);

export const saveWidgets = (dispatch, topicId) => {
    var widgets = store.getState().widgets;
    for (var i = 0; i < widgets.length; i++) {
        delete widgets[i].createdAt;
        delete widgets[i].updatedAt;
    }
    fetch(HOST + '/api/topics/' + topicId + '/widgets', {
        method: 'post',
        body: JSON.stringify({widgets: widgets}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => (response.json()))
    .then(widgets => dispatch({
        type: constants.SAVE_WIDGETS,
        widgets: widgets
    }));
};

export const widgetTypeUpdated = (dispatch, widgetId, widgetType) => (
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: widgetType
    })
)

export const widgetNameUpdated = (dispatch, widgetId, updatedName) => (
    dispatch({
        type: constants.WIDGET_NAME_UPDATED,
        id: widgetId,
        name: updatedName
    })
)

export const headingTextUpdated = (dispatch, widgetId, updatedText) => (
    dispatch({
        type: constants.HEADING_TEXT_UPDATED,
        id: widgetId,
        text: updatedText
    })
);

export const headingSizeUpdated = (dispatch, widgetId, updatedSize) => (
    dispatch({
        type: constants.HEADING_SIZE_UPDATED,
        id: widgetId,
        size: parseInt(updatedSize, 10)
    })
);

export const paragraphTextUpdated = (dispatch, widgetId, updatedText) => (
    dispatch({
        type: constants.PARAGRAPH_TEXT_UPDATED,
        id: widgetId,
        text: updatedText
    })
);

export const listItemsUpdated = (dispatch, widgetId, updatedItems) => (
    dispatch({
        type: constants.LIST_ITEMS_UPDATED,
        id: widgetId,
        listItems: updatedItems
    })
);

export const listTypeUpdated = (dispatch, widgetId, updatedType) => (
    dispatch({
        type: constants.LIST_TYPE_UPDATED,
        id: widgetId,
        listType: updatedType
    })
);

export const srcUpdated = (dispatch, widgetId, srcUpdated) => (
    dispatch({
        type: constants.SRC_UPDATED,
        id: widgetId,
        src: srcUpdated
    })
);

export const linkTextUpdated = (dispatch, widgetId, updatedText) => (
    dispatch({
        type: constants.LINK_TEXT_UPDATED,
        id: widgetId,
        text: updatedText
    })
);

export const hrefUpdated = (dispatch, widgetId, updatedHref) => (
    dispatch({
        type: constants.HREF_UPDATED,
        id: widgetId,
        href: updatedHref
    })
);

export const moveWidgetUp = (dispatch, widget) => (
    dispatch({
        type: constants.MOVE_WIDGET_UP,
        widget: widget
    })
);

export const moveWidgetDown = (dispatch, widget) => (
    dispatch({
        type: constants.MOVE_WIDGET_DOWN,
        widget: widget
    })
);