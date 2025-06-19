// src/actions/taskActions.js
import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const getTasks = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/tasks');
    dispatch({ type: GET_TASKS, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: ADD_TASK, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const editTask = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch({ type: EDIT_TASK, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error(error);
  }
};