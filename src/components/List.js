import React from 'react';
import { connect } from "react-redux";
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { listTextUpdated, listTypeUpdated } from "../actions/index";

const List = ({widget, listTextUpdated, listTypeUpdated}) => {
    let listText;
    return (
        <div>
            <div className="form-group">
                <textarea id="list-textarea" className="form-control" placeholder="Enter one list item per line"
                    rows="5"
                    value={widget.text}
                    onChange={() => listTextUpdated(widget.id, listText.value)}
                    ref={node => listText = node}></textarea>
            </div>
            <div className="form-group">
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="list-options" value={widget.listType}
                        onChange={listType => {listTypeUpdated(widget.id, listType)}}>
                        <ToggleButton value={"UNORDERED"}>Unordered</ToggleButton>
                        <ToggleButton value={"ORDERED"}>Ordered</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>
            </div>
        </div>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    listTextUpdated: (widgetId, updatedText) =>
        listTextUpdated(dispatch, widgetId, updatedText),
    listTypeUpdated: (widgetId, updatedType) =>
        listTypeUpdated(dispatch, widgetId, updatedType)
});

const ListContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(List)
export default ListContainer;