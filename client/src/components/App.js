import React from 'react';

import AddBag from './Bag/AddBag';
import NavBar from './NavBar';
import AddEmployee from './Employee/AddEmployee';

function App() {
  return (
    <div className="container">
      <NavBar />
      {/* <AddBag /> */}
      <AddEmployee />
    </div>
  );
}

export default App;
