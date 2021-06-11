import React, { useState, useEffect, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import './list.scss'
import { SettingsContext } from '../../context/Seettings.js'

function TodoList({ list, handleComplete, handleDelete }) {

  let context = useContext(SettingsContext)
  const [page, setPage] = useState(1);
  const [newList, setNewList] = useState(list)

  //handle completed
  const handleToggle = (e, settings) => {
    e.preventDefault()
    settings.updateCompleted(settings.completed === 'true' ? 'false' : 'true')
    displayComplete()

  }
  //handlesort
  const handleSort = (e, settings) => {
    e.preventDefault()
    settings.updateSort(e.target.value)
    listSort();
  }

  // setting item on page handler 
  const handleNumberItems = (e, settings) => {
    e.preventDefault()
    settings.updateNumber(e.target.numberItems.value)
    // console.log(settings.numberItems)
    pagination();
  }
  // switch page function 
  const switchPage = (e) => {
    if (e.target.innerText === 'previous') {
      if (page > 1) {
        setPage(page - 1)

      }
    } else {
      setPage(page + 1)
    }
  }


  const displayComplete = () => {
    if (context.completed === 'false') {
      setNewList(list)
    } else {
      setNewList(newList.filter(item => !item.completed))
    }
  }
  const listSort = () => {
    let param = context.sort;
    console.log(param);
    let nextList = newList.sort((a, b) => {
      if (a[context.sort] > b[context.sort]) {
        return 1;
      } else if (a[context.sort] < b[context.sort]) {
        return -1;
      } else
        return 0
    });
    setNewList(nextList);
  }

  const pagination = () => {
    if (newList[0]) {
      let nextList = [];
      console.log(list);

      let min = context.numberItems * (page - 1)
      let max = (context.numberItems * page);
      for (let i = min; i < max; i++) {
        // console.log(i);
        nextList.push(newList[i]);
      }
      // console.log(nextList);
      setNewList(nextList);
    }
  }

  useEffect(() => {
    setNewList(list);
  }, [list])


  //   return (
  //     <ListGroup style={{ border: 'solid black', width: '65%', marginLeft: '20vw', marginTop: '2vh' }}>
  //       {list.map(item => (
  //         <Card key={item._id} style={{ width: '25rem', marginBottom: '4px' }}>
  //           <Card.Body>
  //             <Card.Title style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.1px solid yellow', height: '2.5vh' }}>
  //               <span className={item.complete === true ?  "complete complete-pill" : "pending progress-pill"} onClick={() => handleComplete(item._id)}>{ item.complete === true ? "Complete" : "Pending"}</span>
  //               <span className="assigned-person">{item.assignee}</span>
  //               <button className="delete-button" style={{ color: 'red' }} onClick={() => handleDelete(item._id)}>
  //                 X
  //               </button>
  //             </Card.Title>

  //             <Card.Text style={{ color: 'green', fontSize: '1.20rem' }}>
  //               {item.text}
  //             </Card.Text>
  //             <Card.Link href="#"></Card.Link>
  //             <Card.Text style={{ float: 'right', fontSize: '0.80rem' }}>Difficulty: {item.difficulty}</Card.Text>
  //           </Card.Body>
  //         </Card>
  //       ))}
  //     </ListGroup>
  //   );

  // }


  return (
    <ListGroup style={{ border: 'solid black', width: '100%', marginLeft: '10vw', marginTop: '2vh' }}>
      <SettingsContext.Consumer>
        {settings => (
          <div>
            <button onClick={((e) => handleToggle(e, settings))}>Display Completed: {settings.completed}</button>
            <form onSubmit={((e) => handleNumberItems(e, settings))}>
              <input type="number" name="numberItems" required placeholder={settings.numberItems} ></input>
              <button className="ItemsonPage" type="submit">Items on Page</button>
            </form>
            <select onChange={((e) => handleSort(e, settings))}>
              <option value="sort">Sort By</option>
              <option name="difficulty" value="difficulty">Difficulty</option>
              <option name="assignee" value="assignee">Assignee</option>
              <option name="text" value="text">Task</option>
            </select>
            
          </div>

        )}


      </SettingsContext.Consumer>
      {newList.map(item => (
        <Card
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <p className={`${item.complete}`}>{item.complete.toString()}</p>
          <span className="assigned-person">{item.assignee}</span>
          <button className="delete-button" style={{ color: 'red' }} onClick={() => handleDelete(item._id)}>
                  X
                </button>
          <p onClick={() => handleComplete(item._id)} className="task">{item.text}</p>
          <span className="difficulty">Difficulty: {item.difficulty}</span>
        </Card>
      ))}
    <div className="flex">
      <button  className="flex-child" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',color:"red", border: '0.1px solid black', height: '2.5vh'  }} onClick={switchPage }>Previous</button> 
      <button  className="flex-child"style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color:"red", alignItems: 'center', border:" 0.1px solid black" , height: '2.5vh'  }} onClick={switchPage}>Next</button>
      </div>


    </ListGroup>
  );
}

export default TodoList;


