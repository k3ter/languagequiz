/*
	Simple component to make it so that links have no reference
*/

// React Imports
import React from "react";

// Material Imports
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

export default function SafeLink(props){
	const theme = useTheme();
	return(
		<Link href={props.to || props.href} rel="noreferrer" target={props.blank && "_blank" || "_self"}>
			{props.text || props.children}
		</Link>
	)
}