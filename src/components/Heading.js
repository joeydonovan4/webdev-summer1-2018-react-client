import React from 'react';
import { connect } from "react-redux";
import { headingTextUpdated, headingSizeUpdated } from "../actions/index";

const Heading = ({widget, headingTextUpdated, headingSizeUpdated}) => {
    let headingText;
    let headingSize;
    return (
        <form>
            <div className="form-group">
                <input className="form-control" placeholder="Heading text"
                    value={widget.text}
                    onChange={() => headingTextUpdated(widget.id, headingText.value)}
                    ref={node => headingText = node}/>
            </div>
            <div className="form-group">
                <select className="form-control" id="heading-size-select" value={widget.size}
                    onChange={() => headingSizeUpdated(widget.id, headingSize.value)}
                    ref={node => headingSize = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
            </div>
        </form>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    headingTextUpdated: (widgetId, updatedText) =>
        headingTextUpdated(dispatch, widgetId, updatedText),
    headingSizeUpdated: (widgetId, updatedSize) =>
        headingSizeUpdated(dispatch, widgetId, updatedSize)
});

const HeadingContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Heading)
export default HeadingContainer;