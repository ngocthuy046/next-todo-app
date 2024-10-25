'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_TASKS_REQUEST, ADD_TASK_REQUEST } from '../redux/actions/task.action';

const TaskComponent = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: FETCH_TASKS_REQUEST });
  }, [dispatch]);

  const { tasks, loading, error } = useSelector(state => state.tasks);

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      title: taskTitle,
      completed: isCompleted,
    }
    if (taskTitle) {
      dispatch({ type: ADD_TASK_REQUEST, payload: task });
      setTaskTitle(''); 
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      
      {loading && <p>Loading tasks...</p>}
      {error && <p>Error fetching tasks: {error}</p>}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type='Checkbox'/>
            {task.title}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskComponent;
