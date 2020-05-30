//React
import React from "react";
import {
  Link
} from "react-router-dom";

//Material ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {MultilingualButton} from "./customcomponents";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		margin:theme.spacing(2),
		justifyContent:"center",
		"& > *:not(:last-child)":{ // selects all direct children (> *) which are not last (:not(:last-child)) and spaces them
			marginRight: theme.spacing(2)
		}
	},
	buttonContainer: {
		padding: theme.spacing(2),
		"& >":{
			display: "flex",
			flexDirection: "column",
			"& > *:not(:last-child)": { // selects all direct children (> *) which are not last (:not(:last-child)) and spaces them
				marginBottom: theme.spacing(1),
			}
		}
	},
}));

export default function Home(props){
	const theme = useTheme()
	const classes = useStyles(theme)
	return (
		<Box className={classes.root}>
		{
			Object.keys(props.langs).map(
				(lang, index)=>
					<MultilingualButton
						key={index}
						to={{pathname:lang,search:window.location.search}}
						locale={lang}
						disabled={!props.suplangs.includes(lang)}
						className={classes.buttonContainer}
						localize={props.localize}
					>
					{props.langs[lang]}
					</MultilingualButton>
			)
		}
		</Box>
	);
}