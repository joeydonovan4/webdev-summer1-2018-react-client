import React from 'react';
import { connect } from 'react-redux';
import { Panel, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import HeadingContainer from './Heading';
import ParagraphContainer from './Paragraph';
import ListContainer from './List';
import ImageContainer from './Image';
import LinkContainer from './Link';
import { widgetNameUpdated, widgetTypeUpdated, deleteWidget } from '../actions/index';

const Widget = ({widget, widgetNameUpdated, widgetTypeUpdated, deleteWidget}) => {
    let selectElement;
    let widgetName;
    return (
        <Panel id={`widget-${widget.id}`}>
            <Panel.Heading style={{backgroundColor: '#c5cbe3'}}>
                <div className="pull-right">
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button bsStyle="warning" bsSize="xsmall" title="Move up"><span className="fa fa-arrow-up"></span></Button>
                            <Button bsStyle="warning" bsSize="xsmall" title="Move down"><span className="fa fa-arrow-down"></span></Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={() => (
                                deleteWidget(widget.id)
                            )} title="Delete widget">
                                <span className="fa fa-trash"></span>
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <Panel.Title componentClass="h2">
                    <select value={widget.className} style={{marginRight: 5}}
                        onChange={e => widgetTypeUpdated(widget.id, selectElement.value)}
                        ref={node => selectElement = node}>
                        <option value="Heading">Heading</option>
                        <option value="Paragraph">Paragraph</option>
                        <option value="List">List</option>
                        <option value="Image">Image</option>
                    </select>
                    <span>&nbsp;Widget</span>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <form>
                    {widget.className === 'Heading' && <HeadingContainer widget={widget}/>}
                    {widget.className === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                    {widget.className === 'List' && <ListContainer widget={widget}/>}
                    {widget.className === 'Image' && <ImageContainer widget={widget}/>}
                    {widget.className === 'Link' && <LinkContainer widget={widget}/>}
                    <div className="form-group">
                        <input className="form-control" placeholder="Widget name"
                            value={widget.name}
                            onChange={() => widgetNameUpdated(widget.id, widgetName.value)}
                            ref={node => widgetName = node}/>
                    </div>
                </form>
            </Panel.Body>
        </Panel>
    )
}

const stateToPropertiesMapper = (state) => (
    {state}
);

const dispatcherToPropsMapper = dispatch => ({
    widgetNameUpdated: (widgetId, updatedName) =>
        widgetNameUpdated(dispatch, widgetId, updatedName),
    widgetTypeUpdated: (widgetId, widgetType) =>
        widgetTypeUpdated(dispatch, widgetId, widgetType),
    deleteWidget: (widgetId) => deleteWidget(dispatch, widgetId)
});

const WidgetContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(Widget)
export default WidgetContainer;