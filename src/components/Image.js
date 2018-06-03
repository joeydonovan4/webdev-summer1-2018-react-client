import React from 'react';
import { connect } from "react-redux";
import { srcUpdated } from "../actions/index";

const Image = ({widget, srcUpdated}) => {
    let srcText;
    return (
        <div className="form-group">
            <input className="form-control" placeholder="Image URL"
                value={widget.src}
                onChange={() => srcUpdated(widget.id, srcText.value)}
                ref={node => srcText = node}/>
        </div>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    srcUpdated: (widgetId, updatedSrc) =>
        srcUpdated(dispatch, widgetId, updatedSrc)
});

const ImageContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Image)
export default ImageContainer;