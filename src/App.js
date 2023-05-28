import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './App.css';


function App() {

  // Tasks (ToDo list) States
  const [toDo, setToDo] = useState([
    { "id": 1, "title": "Task 1", "status": false },
    { "id": 2, "title": "Task 2", "status": false }
  ]);

  //Temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  //Add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }
  //Delete task
  const deleteTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id)
    setToDo(newTask);
  }
  //mark task as completed
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task
    })
    setToDo(newTask);
  }
  //cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  }
  //change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    }
    setUpdateData(newEntry);
  }
  //update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject)
    setUpdateData('')
  }

  return (
    <div className="container App">
      <br /><br />
      <h1>To Do List App</h1> <br /><br />
      {updateData && updateData ? (
        <>
          {/* Update Task */}
          <div className='row'>
            <div className='col'>
              <input className='my-form form-control form-control-lg'
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)} />
            </div>
            <div className='col-auto'>
              <button className='btn btn-lg btn-success' onClick={updateTask}>Update</button>
              <button className='btn btn-lg btn-warning my-btn' onClick={cancelUpdate}>Cancel</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Add Task */}
          <div className='row'>
            <div className='col'>
              <input className='my-form form-control form-control-lg'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)} />
            </div>
            <div className='col-auto'>
              <button className='btn btn-lg btn-success' onClick={addTask}>Add Task</button>
            </div>
          </div>
        </>
      )}




      {/* display toDo */}
      {toDo && toDo.length ? '' : 'No Tasks...'}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNo'>{index + 1}</span>
                  <span className='taskTxt'>{task.title}</span>
                </div>
                <div className='iconswrap'>
                  <span title='completed/not completed' onClick={(e) => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  </span>

                  {task.status ? null : (
                    <span title='edit' onClick={() => setUpdateData({ id: task.id, title: task.title, status: task.status ? true : false })}>
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </span>
                  )}

                  <span title='delete' onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }
    </div>
  );
}

export default App;
