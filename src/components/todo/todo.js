import React, { useEffect, useState} from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Navbar } from 'react-bootstrap';
import './todo.scss';
import useAjax from '../customHooks/useAjax.js'
import axios from 'axios';
import SettingsProvider from '../../context/Seettings.js'


const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {

  const [data, request] = useAjax()
  const [list, setList] = useState([]);

  const _addItem = async (item) => {
    item.due = new Date();
    let input = {
      text: item.text,
      assignee: item.assignee,
      difficulty: item.difficulty,
      due: item.due,
      _id: item._id
    }
    let newItem = await request(todoAPI, 'post', input);
    setList([...list, newItem])
  };


  //complete 
  const toggleComplete = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      let input = {
        text: item.text,
        assignee: item.assignee,
        difficulty: item.difficulty,
        id: item.id,
        complete: item.complete,
        data:data,
        
        // delete: item.delete
      }
      //update
      let updatedItem = await request(url, 'put', input);
      setList(list.map(listItem => listItem._id === item._id ? updatedItem : listItem));

    }
  };

  

  //remove
  const removeItem = id => {

    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {

      let url = `${todoAPI}/${id}`;

      axios.delete(url, item)
        .then(removedItem => {

          let temp = [...list];

          for (let i = temp.length - 1; i >= 0; i--) {
            if (removedItem.data._id === temp[i]._id) {
              temp.splice(i, 1);
            }
          }
          setList(temp);

        })
        .catch(console.error);
    }
  };



  // when ever data changes use effect watch.....[list]
  useEffect(() => {
    document.title = `To Do (${list.filter(item => !item.complete).length})`;
  }, [list])

  const getTodoItems = async () => {
    let list = await request(todoAPI, 'get', {});

    setList(list.results);
  };

  useEffect(() => {
    getTodoItems()
  });

  return (
    <>
      <header>
        <Navbar style={{ color: "white" }} bg="primary" variant="dark" className="header">Home</Navbar>
        <br></br>
        <Navbar className="toDoCount" style={{ color: "white" }} bg="dark" variant="dark" >
          To Do List Manager({list.filter(item => !item.complete).length})
          </Navbar>
      </header>

      <section className="todo">

        <div className="formGroup">
          <TodoForm callback={_addItem} />
        </div>

        <SettingsProvider>

        <div className="listGroup">
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={removeItem}

          />
        </div>
        </SettingsProvider>
      </section>
    </>
  );
};
