import React from "react";
import {
	Link,
} from "react-router-dom";

//Material ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


function MultilingualButton(props){
	let text1 = props.children;
	let text2;
	if(props.locale){
		text2 = "tmp";//props.localize.translate(text1,props.locale)
		text1 = "tmp";//props.localize.translate(text1)
	}
	else{ // only 1 language
		text2 = "tmp";//props.localize.translate(text1)
		return(
			<Button variant="contained" color="primary" component={Link} to={props.to} className={props.className} disabled={props.disabled}>
				<Box>
					<Typography align="center" variant="h4" color="inherit">{text2}</Typography>
				</Box>
			</Button>
		)
	}
	if(!props.reverse){
		[text1,text2] = [text2,text1]
	}
	return(
		<Button variant="contained" color="primary" component={Link} to={props.to} className={props.className} disabled={props.disabled}>
			<Box>
				<Typography align="center" variant="h4" color="inherit">{text1}</Typography>
				<Typography align="center" variant="h6" color="inherit">{text2}</Typography>
			</Box>
		</Button>
	)
} 

export {MultilingualButton}