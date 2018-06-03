import React from 'react';
import { connect } from "react-redux";
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { listItemsUpdated, listTypeUpdated } from "../actions/index";

const List = ({widget, listItemsUpdated, listTypeUpdated}) => {
    let listItems;
    return (
        <div>
            <div className="form-group">
                <textarea id="list-textarea" className="form-control" placeholder="Enter one list item per line"
                    rows="5"
                    value={widget.listItems}
                    onChange={() => listItemsUpdated(widget.id, listItems.value)}
                    ref={node => listItems = node}></textarea>
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
    listItemsUpdated: (widgetId, updatedItems) =>
        listItemsUpdated(dispatch, widgetId, updatedItems),
    listTypeUpdated: (widgetId, updatedType) =>
        listTypeUpdated(dispatch, widgetId, updatedType)
});

const ListContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(List)
export default ListContainer;