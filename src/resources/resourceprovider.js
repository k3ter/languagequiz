import React from "react";

import useResources from "./useresources"
import ResourceContext from "./resourcecontext"
import ResourceContainer from "./resourcecontainer"

export default function ResourceProvider(props){
	const {children, resources: localResources} = props;
	const parentResources = useResources();
	const resources = React.useMemo(()=>{
		return parentResources === null
			? new ResourceContainer(localResources) 
			: new ResourceContainer({...localResources, ...parentResources._dict});
	}, [localResources, parentResources]);
	return <ResourceContext.Provider value={resources}>{children}</ResourceContext.Provider>
}