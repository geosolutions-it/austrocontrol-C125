/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const {createSink} = require('recompose');
const expect = require('expect');
const utcDateWrapper = require('../utcDateWrapper');

describe('utcDateWrapper enhancer', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('UTCDateWrapper calls onSetDate', (done) => {
        const actions = {
            onSetDate: () => { }
        };
        const spyonSetDate = expect.spyOn(actions, 'onSetDate');

        const check = (date, expectedUTCString, index, callback = () => {}) => (props) => {
            expect(props).toExist();
            // check component as expectedUTCDate
            // check the current date is properly shifted
            expect(date.getTime() + date.getTimezoneOffset() * 60000).toEqual(props.date.getTime());

            // test callback
            props.onSetDate(props.date);
            expect(spyonSetDate).toHaveBeenCalled();

            // check the returned date is properly conveerted back to UTC Date
            expect(spyonSetDate.calls[index].arguments[0].toISOString()).toBe(expectedUTCString);
            callback();
        };
        const Sink = utcDateWrapper(createSink( props => {
            props.check(props);
        }));
        const TESTS = [
            "2010-01-01T00:00:00.000Z",
            "2010-01-02T00:00:00.000Z",
            "2010-01-02T23:59:59.999Z",
            "2010-12-31T00:00:00.000Z",
            "2010-12-31T23:59:59.999Z",
            "2010-01-01T00:00:00.000Z",
            "2018-06-01T12:38:42.100Z"
        ];
        TESTS.map((t, i) =>
            ReactDOM.render(<Sink onSetDate={actions.onSetDate} date={new Date(t)} check={check(new Date(t), t, i, i === TESTS.length - 1 ? () => done() : undefined)}/>, document.getElementById("container")));
    });
});
