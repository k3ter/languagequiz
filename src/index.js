import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ResourceProvider from "./resources/resourceprovider"
import resources from "./resources"

console.log(process.env.NODE_ENV)

ReactDOM.render(
	<ResourceProvider resources={resources}><App /></ResourceProvider>
, document.getElementById('root'));