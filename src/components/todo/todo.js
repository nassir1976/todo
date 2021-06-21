import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import { Navbar } from 'react-bootstrap';
import './todo.scss';
import useAjax from '../customHooks/useAjax.js'
import axios from 'axios';
import SettingsProvider from '../../context/Seettings.js'
import AuthProvider from '../../context/AuthProvider.js'
import Login from '../auth/login.js';
import Auth from '../auth/Auth.js';



const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

export default function ToDo() {


  const [request, response] = useAjax()
  const [list, setList] = useState([]);
  // const [data, setData] = useState([])

  useEffect(() => {
    if (response.results) {
      response.results && setList(response.results)
    } else {
      getItems()
    }
  }, [response]);
  useEffect(() => {
    document.title = `To Do List:${list.filter(item => !item.complete)}.length`;
  }, [list])

  console.log(response)

  //==========getitem==========//

  const getItems = async () => {
    let request = await axios({
      // const options = {
      url: todoAPI,
      method: 'get',
      mode: 'cors',
      headers:{'content-Type':'application/json'},
      // }
      // response(options)
    })
    let data = request.data.results
    setList(data)
  }

  useEffect(() => {
    getItems()
  }, []);

// =============postItem==== //
  const addItem = async (input) => {
    let request = await axios({
      url: todoAPI,
      method: 'post',
      mode: 'cors',
        headers:{'content-Type':'application/json'},
      data:input
      // response(options)
    })
    getItems()
    return request
  }

  // console.log(request)

  //complete =========or putitem===
  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      const url = `${todoAPI}/${id}`;
      // const input = {
      //   text: item.text,
      //   assignee: item.assignee,
      //   difficulty: item.difficulty,
      //   id: item.id,
      //   complete: item.complete,

      // }

      const options = {
        url: url,
        method: 'put',
        mode: 'cors',
        headers: { 'content-Type': 'application/json' },
        data: { complete: !item.complete },
      }
      response(options)

    }
  };
  
  //=============remove==========//

  const removeItem = async id => {
    let request = await axios({
       url : `${todoAPI}/${id}`,
        method: 'delete',
        mode: 'cors',
        headers: { 'content-Type': 'application/json' },

    })
    getItems()
    return request;
  }
  
  return (
    <>
      <AuthProvider>
        <header>
          <Navbar style={{ color: "white" }} bg="primary" variant="dark" className="headerOne">
            Home

            <Login />

          </Navbar>
          <br></br>
        </header>
        <Auth capability="read">
          <Navbar className="toDoCount" style={{ color: "white" }} bg="dark" variant="dark" >
            To Do List Manager({list.filter(item => !item.complete).length})
          </Navbar>
          <section className="todo">
            
            <Auth capability="create">
              <div className="formGroup">
                 <TodoForm callback={addItem} /> 
                 
                {/* <TodoForm addItem={postItems} */}
                
              </div>
            </Auth>
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
        </Auth>
      </AuthProvider>
    </>
  );
};