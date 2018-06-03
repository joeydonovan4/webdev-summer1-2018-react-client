import React from 'react';
import { connect } from "react-redux";

const Preview = ({widget}) => {
    return (
        <div>
            {widget.className === 'Heading' && <HeadingPreview heading={widget}/>}
            {/* {widget.className === 'Paragraph' && <ParagraphContainer widget={widget}/>}
            {widget.className === 'List' && <ListContainer widget={widget}/>}
            {widget.className === 'Image' && <ImageContainer widget={widget}/>}
            {widget.className === 'Link' && <LinkContainer widget={widget}/>} */}
        </div>
    )
};

const HeadingPreview = ({heading}) => {
    switch (heading.size) {
        case 1:
            return <h1>{heading.text}</h1>
        case 2:
            return <h2>{heading.text}</h2>
        case 3:
            return <h3>{heading.text}</h3>
        default:
            return null;
    }
};

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({

});

const PreviewContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Preview)
export default PreviewContainer;