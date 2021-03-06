import React from 'react';
import { connect } from "react-redux";

const Preview = ({widget}) => {
    return (
        <div>
            {widget.widgetType === 'Heading' && <HeadingPreview heading={widget}/>}
            {widget.widgetType === 'Paragraph' && <ParagraphPreview paragraph={widget}/>}
            {widget.widgetType === 'List' && <ListPreview list={widget}/>}
            {widget.widgetType === 'Image' && <ImagePreview image={widget}/>}
            {widget.widgetType === 'Link' && <LinkPreview link={widget}/>}
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
};

const ImagePreview = ({image}) => {
    return <img src={image.src} alt="&nbsp;Cannot be rendered"/>
};

const LinkPreview = ({link}) => {
    return <a href={link.href} target="_blank">{link.text}</a>
};

const PreviewContainer = connect()(Preview)
export default PreviewContainer;