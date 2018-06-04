import React from 'react';
import { connect } from 'react-redux';
import { Panel, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import HeadingContainer from './Heading';
import ParagraphContainer from './Paragraph';
import ListContainer from './List';
import ImageContainer from './Image';
import LinkContainer from './Link';
import PreviewContainer from './Preview';
import { widgetNameUpdated, widgetTypeUpdated, deleteWidget, moveWidgetUp, moveWidgetDown } from '../actions/index';

const Widget = ({widget, widgetNameUpdated, widgetTypeUpdated, deleteWidget, preview, moveWidgetUp, moveWidgetDown}) => {
    let selectElement;
    let widgetName;
    return (
        <Panel id={`widget-${widget.id}`}>
            <Panel.Heading style={{backgroundColor: '#c5cbe3'}}>
                <div className="pull-right">
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button bsStyle="warning" title="Move up" bsSize="xsmall" onClick={() =>
                                moveWidgetUp(widget)}>
                                <span className="fa fa-arrow-up"></span>
                            </Button>
                            <Button bsStyle="warning" title="Move down" bsSize="xsmall" onClick={() =>
                                moveWidgetDown(widget)}>
                                <span className="fa fa-arrow-down"></span>
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={() =>
                                deleteWidget(widget.id)
                            } title="Delete widget">
                                <span className="fa fa-trash"></span>
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <Panel.Title componentClass="h2">
                    <select value={widget.widgetType} style={{marginRight: 5}}
                        onChange={e => widgetTypeUpdated(widget.id, selectElement.value)}
                        ref={node => selectElement = node}>
                        <option value="Heading">Heading</option>
                        <option value="Paragraph">Paragraph</option>
                        <option value="List">List</option>
                        <option value="Image">Image</option>
                        <option value="Link">Link</option>
                    </select>
                    <span>&nbsp;Widget</span>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <div hidden={preview === "ON"}>
                    <form>
                        {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                        {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                        {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
                        {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                        {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
                        <div className="form-group">
                            <input className="form-control" placeholder="Widget name"
                                value={widget.name}
                                onChange={() => widgetNameUpdated(widget.id, widgetName.value)}
                                ref={node => widgetName = node}/>
                        </div>
                    </form>
                    <h3>Preview</h3>
                </div>
                <div id="preview-section">
                    <PreviewContainer widget={widget}/>
                </div>
            </Panel.Body>
        </Panel>
    )
}

const stateToPropertiesMapper = (state) => ({
    preview: state.preview
});

const dispatcherToPropsMapper = dispatch => ({
    widgetNameUpdated: (widgetId, updatedName) =>
        widgetNameUpdated(dispatch, widgetId, updatedName),
    widgetTypeUpdated: (widgetId, widgetType) =>
        widgetTypeUpdated(dispatch, widgetId, widgetType),
    moveWidgetUp: (widget) =>
        moveWidgetUp(dispatch, widget),
    moveWidgetDown: (widget) =>
        moveWidgetDown(dispatch, widget),
    deleteWidget: (widgetId) => deleteWidget(dispatch, widgetId)
});

const WidgetContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Widget)
export default WidgetContainer;