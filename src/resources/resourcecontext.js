import React from 'react';

const ResourceContext = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
	ResourceContext.displayName = 'ResourceContext';
}

export default ResourceContext;