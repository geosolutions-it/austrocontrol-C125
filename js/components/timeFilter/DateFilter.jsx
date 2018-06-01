/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment');
const momentLocalizer = require('react-widgets/lib/localizers/moment');
const Toolbar = require('../../../MapStore2/web/client/components/misc/toolbar/Toolbar');
const Message = require('../../../MapStore2/web/client/plugins/locale/Message');
const localizedProps = require('../../../MapStore2/web/client/components/misc/enhancers/localizedProps');

const {head} = require('lodash');
const {Calendar} = require('react-widgets');
const {ListGroup, ListGroupItem, Glyphicon: GlyphiconRB, Button: ButtonRB} = require('react-bootstrap');
const BorderLayout = require('../../../MapStore2/web/client/components/layout/BorderLayout');
const Filter = localizedProps('filterPlaceholder')(require('../../../MapStore2/web/client/components/misc/Filter'));
const SideCard = require('./SideCardM');
momentLocalizer(moment);
const tooltip = require('../../../MapStore2/web/client/components/misc/enhancers/tooltip');
const Button = tooltip(ButtonRB);
const Glyphicon = tooltip(GlyphiconRB);

const DayComponent = ({ highlighted = [], date, label }) => head(highlighted.filter(high => high.value && high.value === moment(date).format('MM/DD/YYYY'))) ? (
    <div style={{ color: '#ffffff', backgroundColor: '#5a9aab', margin: '0 .25em' }}>
      {label}
    </div>
) : (
    <div>
      {label}
    </div>
);

class DateFilter extends React.Component {
    static propTypes = {
        effectiveDates: PropTypes.array,
        date: PropTypes.instanceOf(Date),
        onToggleFilter: PropTypes.func,
        hideLayers: PropTypes.bool,
        showLayerVisibilityToggle: PropTypes.bool,
        expanded: PropTypes.bool,
        setExpanded: PropTypes.func,
        onSetDate: PropTypes.func,
        width: PropTypes.number,
        toggle: PropTypes.bool,
        style: PropTypes.object,
        dropUp: PropTypes.bool
    };

    static defaultProps = {
        effectiveDates: [],
        onToggleFilter: () => {},
        onSetDate: () => {},
        width: 350,
        dropUp: false
    };

    state = {
        filterText: ''
    };

    render() {
        return (
            <div
                style={{

                    width: this.props.width,
                    zIndex: 5000,
                    display: 'flex',
                    ...this.props.style
                }}>
                {!this.props.expanded && this.props.toggle && !this.props.dropUp && <Button
                    bsStyle="primary"
                    tooltipId="dateFilter.expandToFilter"
                    tooltipPosition="bottom"
                    className="square-button shadow"
                    onClick={() => this.props.setExpanded(true)}>
                    <Glyphicon glyph="calendar"/>
                </Button>}
                {!(!this.props.expanded && this.props.toggle) && <SideCard
                    title={<Message msgId={this.props.date ? 'dateFilter.effectiveDate' : 'dateFilter.dateNotSelected'}/>}
                    dropUp={this.props.dropUp}
                    preview={
                        this.props.toggle ? <Glyphicon
                            tooltipId="dateFilter.collapseDateFilter"
                            tooltipPosition="bottom"
                            glyph="resize-small glyph-btn"
                            onClick={() => this.props.setExpanded(false)}
                            style={{
                                fontSize: 14
                            }}/> : null
                    }
                    description={
                        this.props.date && <div style={{display: 'flex', margin: 0}}>
                            <div style={{flex: 1, margin: 0}}>
                                {moment(this.props.date).format('DD MMM YYYY')}
                            </div>
                            <div style={{
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Glyphicon
                                    glyph="1-close glyph-btn"
                                    tooltip="Clear date"
                                    tooltipPosition="bottom"
                                    onClick={() => this.setDate(null)}
                                    style={{
                                        fontSize: 12
                                    }}/>
                            </div>
                        </div>
                    }
                    size="sm"
                    className="ms-date-filter"
                    style={{
                        zIndex: 10,
                        transform: 'unset',
                        backgroundColor: '#ffffff',
                        margin: 0
                    }}
                    body={
                        <div>
                            {this.state.calendar && <Calendar
                                dayComponent={props => <DayComponent highlighted={this.props.effectiveDates} {...props}/>}
                                value={this.props.date}
                                onChange={date => this.setDate(date)}/>}
                            {this.state.datesList &&
                            <BorderLayout
                                header={
                                    <div style={{margin: '0 8px 8px 8px'}}>
                                        <Filter
                                            filterText={this.state.filterText}
                                            filterPlaceholder="dateFilter.filterDates"
                                            onFilter={filterText => this.setState({filterText})}/>
                                    </div>
                                }>
                                <ListGroup
                                    style={{
                                        margin: 0,
                                        height: 250
                                    }}>
                                    {this.props.effectiveDates
                                        .filter(date =>
                                            !this.state.filterText
                                            || date.value && date.value.indexOf(moment(this.state.filterText).format('MM/DD/YYYY')) !== -1
                                            || date.label && date.label.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
                                            || date.code && date.code.toLowerCase().indexOf(this.state.filterText.toLowerCase()) !== -1
                                        )
                                        .map(date => (
                                            <ListGroupItem
                                                active={date.value === moment(this.props.date).format('MM/DD/YYYY')}
                                                onClick={() => this.setDate(date.value && moment(date.value, 'MM/DD/YYYY').toDate() || null)}>
                                                <div style={{display: 'flex'}}>
                                                    <div style={{flex: 1}}>
                                                        <strong>{date.code}</strong>
                                                    </div>
                                                    <div style={{flex: 2}}>
                                                        {date.label}
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </BorderLayout>}
                        </div>
                    }
                    tools={
                        <Toolbar
                            btnDefaultProps={{
                                bsStyle: 'primary',
                                className: 'square-button-md',
                                tooltipPosition: 'bottom'
                            }}
                            buttons={[
                                {
                                    glyph: 'calendar',
                                    active: !!this.state.calendar,
                                    bsStyle: this.state.calendar ? 'success' : 'primary',
                                    tooltipId: 'dateFilter.selectDateFromCalendar',
                                    onClick: () => this.setState({ calendar: !this.state.calendar, datesList: false})
                                },
                                {
                                    glyph: 'list',
                                    active: !!this.state.datesList,
                                    tooltipId: 'dateFilter.selectADateFromAPredefinedList',
                                    bsStyle: this.state.datesList ? 'success' : 'primary',
                                    onClick: () => this.setState({ datesList: !this.state.datesList, calendar: false })
                                },
                                {
                                    glyph: this.state.hideLayers ? 'eye-close' : 'eye-open',
                                    visible: !!this.props.showLayerVisibilityToggle,
                                    active: !!this.state.hideLayers,
                                    tooltipId: this.state.hideLayers ? 'dateFilter.showLayersWithoutTimeData' : 'dateFilter.hideLayerWithoutTimeData',
                                    bsStyle: this.state.hideLayers ? 'success' : 'primary',
                                    onClick: () => {
                                        this.props.onToggleFilter(!this.props.hideLayers);
                                    }
                                }
                            ]}
                            />
                    }
                />}
                {!this.props.expanded && this.props.toggle && this.props.dropUp && <Button
                    bsStyle="primary"
                    tooltipId={"dateFilter.expandDateFilter"}
                    tooltipPosition="bottom"
                    className="square-button shadow"
                    style={{
                        alignSelf: 'end',
                        zIndex: 10
                    }}
                    onClick={() => this.props.setExpanded(true)}>
                    <Glyphicon glyph="calendar"/>
                </Button>}
            </div>
        );
    }
    setDate = (date) => {
        this.props.onSetDate(date);
    }

}

module.exports = DateFilter;
