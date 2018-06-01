import { FIND_ALL_WIDGETS, ADD_WIDGET, SAVE } from "../constants/index";

export const findAllWidgets = dispatch => {
    let HOST = 'https://webdev-java-server.herokuapp.com';
    fetch(HOST + '/api/widgets')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets
        }));
};

export const addWidget = dispatch => (
    dispatch({type: ADD_WIDGET})
);

export const save = dispatch => (
    dispatch({type: SAVE})
);