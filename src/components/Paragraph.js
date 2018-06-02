import React from 'react';
import { connect } from "react-redux";
import { paragraphTextUpdated } from "../actions/index";
import '../styles/Widgets.css';

const Paragraph = ({widget, paragraphTextUpdated}) => {
    let paragraphText;
    return (
        <div className="form-group">
            <textarea id="paragraph-textarea" className="form-control" placeholder="Paragraph text"
                rows="5"
                value={widget.text}
                onChange={() => paragraphTextUpdated(widget.id, paragraphText.value)}
                ref={node => paragraphText = node}></textarea>
        </div>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    paragraphTextUpdated: (widgetId, updatedText) =>
        paragraphTextUpdated(dispatch, widgetId, updatedText)
});

const ParagraphContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Paragraph)
export default ParagraphContainer;