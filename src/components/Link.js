import React from 'react';
import { connect } from "react-redux";
import { linkTextUpdated, hrefUpdated } from "../actions/index";

const Link = ({widget, linkTextUpdated, hrefUpdated}) => {
    let linkText, href;
    return (
        <div>
            <div className="form-group">
                <input className="form-control" placeholder="Link text"
                    value={widget.text}
                    onChange={() => linkTextUpdated(widget.id, linkText.value)}
                    ref={node => linkText = node}/>
            </div>
            <div className="form-group">
                <input className="form-control" placeholder="Link URL"
                    value={widget.href}
                    onChange={() => hrefUpdated(widget.id, href.value)}
                    ref={node => href = node}/>
            </div>
        </div>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    linkTextUpdated: (widgetId, updatedText) =>
        linkTextUpdated(dispatch, widgetId, updatedText),
    hrefUpdated: (widgetId, updatedHref) =>
        hrefUpdated(dispatch, widgetId, updatedHref)
});

const LinkContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Link)
export default LinkContainer;