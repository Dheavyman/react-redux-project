import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import * as courseActions from './courseActions';
import * as actionTypes from './actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Course Actions', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    const course = {
      id: 'clean-code',
      title: 'Clean code'
    };
    const expectedAction = {
      type: actionTypes.CREATE_COURSE_SUCCESS,
      course
    };
    const action = courseActions.createCourseSuccess(course);

    expect(action).toEqual(expectedAction);
  });
});

describe('Async action', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS', (done) => {
    const expectedActions = [
      { type: actionTypes.BEGIN_AJAX_CALL },
      {
        type: actionTypes.LOAD_COURSES_SUCCESS,
        body: {
          courses: [{ id: 'clean-code', title: 'Clean Code' }]
        }
      }
    ];
    const store = mockStore({ courses: [] }, expectedActions);
    store.dispatch(courseActions.loadCourses())
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(actionTypes.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(actionTypes.LOAD_COURSES_SUCCESS);
        done();
      });
  });
});
