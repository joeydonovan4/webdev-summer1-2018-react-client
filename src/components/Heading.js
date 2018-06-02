import React from 'react';
import { connect } from "react-redux";
import { FormGroup, FormControl } from "react-bootstrap";
import { headingTextUpdated } from "../actions/index";

const Heading = ({widget, headingTextUpdated}) => {
    let headingText;
    return (
        <form>
            <div className="form-group">
                <input className="form-control" placeholder="Heading text"
                    value={widget.text}
                    onChange={() => headingTextUpdated(widget.id, headingText.value)}
                    ref={node => headingText = node}/>
            </div>
        </form>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    headingTextUpdated: (widgetId, updatedText) =>
        headingTextUpdated(dispatch, widgetId, updatedText)
});

const HeadingContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Heading)
export default HeadingContainer;