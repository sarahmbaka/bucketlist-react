import React from 'react';
import Menu from './components/menu';


const App = (props) => (
  <div>
    <div id="wrapper">
      <Menu />

      {props.children}

      </div>
	</div>
);

export default App;
