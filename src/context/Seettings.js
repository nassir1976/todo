import React, { useState, useEffect } from 'react';
//create the context
export const SettingsContext = React.createContext();


function SettingsProvider(props) {
  // define the value that any child components able to read .
  let [sort, setSort] = useState('difficulty');
  let [completed, setCompleted] = useState('true');
  let[numberItems, setNumberItems] = useState(4);
  
  const state = {
      sort,
      completed,
      numberItems,
      updateSort: setSort,
      updateCompleted: setCompleted,
      updateNumber: setNumberItems,
    }

  useEffect(() =>{ 
    console.log(completed);
  }, [completed])

  useEffect(() =>{ 
    console.log(numberItems);
  }, [numberItems])

    return(
      <SettingsContext.Provider value={state}>
        {props.children}
      </SettingsContext.Provider>
    );
}

export default SettingsProvider;