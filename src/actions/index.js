import * as constants from "../constants/index";

export const findAllWidgets = dispatch => {
    let HOST = 'https://webdev-java-server.herokuapp.com';
    fetch(HOST + '/api/widgets')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }));
};

export const findWidgetsForLessonTopic = (dispatch, lessonId, topicId) => {
    let HOST = 'https://webdev-java-server.herokuapp.com';
    fetch(HOST + '/api/lessons/' + lessonId + '/topics/' + topicId + '/widgets')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_WIDGETS_FOR_LESSON_TOPIC,
            widgets: widgets
        }));
};

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);

export const save = dispatch => (
    dispatch({type: constants.SAVE})
);

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
        size: updatedSize
    })
);