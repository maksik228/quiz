import * as actions from './actionTypes';

export const addTask = (task:any) => ({
    type: actions.TASK_ADD,
    payload: task
});
export const toggleTask = (id:any) => ({
    type: actions.TASK_TOGGLE,
    payload: { id }
});
export const removeTask = (id:any) => ({
    type: actions.TASK_REMOVE,
    payload: { id }
})