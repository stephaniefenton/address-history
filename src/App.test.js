import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { reducer, initialState } from './reducer';
import AppContext from './context/appContext';
import UserSearch from './components/UserSearch';
import AddressList from './components/AddressList';

const MOCK_ID = '1a3efcf0-eef3-11e9-92cc-51edf7fd79ed';
const MOCK_ADDRESSES = [{
  "id": "1a3efcf0-eef3-11e9-92cc-51edf7fd79ed",
  "user_id": "da9196a7-11bc-4b54-98c0-53699dbea942",
  "street_one": "13 Itte Lane",
  "street_two": null,
  "city": "Raleigh",
  "state_id": "NC",
  "zip_code": "27602",
  "country_id": "US",
  "deleted_at": null,
  "created_at": "2019-10-15T02:25:49.631Z",
  "updated_at": "2019-10-17T04:17:10.191Z"
}];

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('invokes useReducer with right reducer and initial state', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    shallow(<App />);
    expect(useReducerSpy).toHaveBeenCalledWith(reducer, initialState)
  });
  it('renders a top level AppContext provider with the dispatch from useReducer', () => {
    const dispatchFn = jest.fn();
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [initialState, dispatchFn]);
    const provider = shallow(<App />).find(AppContext.Provider);
    expect(provider).toHaveLength(1);
    expect(provider.prop('value').dispatch).toBe(dispatchFn);
  });
  it('should render a UserSearch component if state.userId is empty', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [{userId: '', addresses: ['test']}, jest.fn()]);
    const wrapper = shallow(<App />);
    expect(wrapper.find(UserSearch)).toHaveLength(1);
  });
  it('should render a UserSearch component if state.addresses is an empty array', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [{userId: 'test', addresses: []}, jest.fn()]);
    const wrapper = shallow(<App />);
    expect(wrapper.find(UserSearch)).toHaveLength(1);
  });
  it('should not render a UserSearch component if userId is a string and state.addresses is not empty', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [{
      userId: MOCK_ID,
      addresses: MOCK_ADDRESSES
    }, jest.fn()]);
    const wrapper = shallow(<App />);
    expect(wrapper.find(UserSearch)).toHaveLength(0);
  });
  it('should render an AddressList component if userId is a string and state.addresses is not empty', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [{
      userId: MOCK_ID,
      addresses: MOCK_ADDRESSES
    }, jest.fn()]);
    const wrapper = shallow(<App />);
    expect(wrapper.find(AddressList)).toHaveLength(1);
  });
  it('should pass in state.userId and state.addresses into AddressList', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockImplementation(() => [{
      userId: MOCK_ID,
      addresses: MOCK_ADDRESSES
    }, jest.fn()]);
    const wrapper = shallow(<App />).find(AddressList);
    expect(wrapper.prop('userId')).toBe(MOCK_ID);
    expect(wrapper.prop('addresses')).toBe(MOCK_ADDRESSES);
  })
});
