import React from 'react';
import { connect } from "react-redux";

const Preview = ({widget}) => {
    return (
        <div>
            {widget.className === 'Heading' && <HeadingPreview heading={widget}/>}
            {widget.className === 'Paragraph' && <ParagraphPreview paragraph={widget}/>}
            {widget.className === 'List' && <ListPreview list={widget}/>}
            {/* {widget.className === 'Image' && <ImageContainer widget={widget}/>}
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

const ParagraphPreview = ({paragraph}) => {
    return <p>{paragraph.text}</p>
};

const ListPreview = ({list}) => {
    if (list.listItems) {
        let itemNumber = 0;
        let listItems = list.listItems.split("\n").map((item) => (
            <li key={++itemNumber}>{item}</li>
        ));
        if (list.listType === 'UNORDERED') {
            return (
                <ul>
                    {listItems}
                </ul>
            )
        } else if (list.listType === 'ORDERED') {
            return (
                <ol>
                    {listItems}
                </ol>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }
}

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