import React from 'react';
import ReactDOM from 'react-dom';

const API_KEY = 'AIzaSyCaa0Hx9YQgQYtcC3NHTMvA2vgEpmez_w0';

// Create a new component. This component should produce some HTML.

const App = () => {
  return <div>Hi!</div>;
}


// Take this component's generated HTML nd put it on the page (DOM).
// The second parameter of the method render is an actual DOM element, into which the App component will
// be rendered and added.
ReactDOM.render(<App />, document.querySelector('.container'));
