import React from 'react';
import ResourceContext from './resourcecontext';

export default function useResource(){
	const resources = React.useContext(ResourceContext);
	return resources;
}