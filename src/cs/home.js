//React
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Material ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {MultilingualButton} from "../customcomponents";

import Cs2 from "./cs-2"

const isolang = "cs"

const quizzes = {
	"cs-1":{ // orthography and phonetics
		"translate":false,
		"desc":"cs-1-desc"
	},
	"cs-2":{ // gender and cases
		"translate":true,
		"desc":"cs-2-desc"
	}
}
const supquizzes = [
	"cs-2"
]

const useStyles = makeStyles((theme) => ({
	root: {
		padding:theme.spacing(2)
	},
	listItem:{
		justifyContent:"flex-start",
		paddingLeft:0,
	},
	buttonContainer:{
		marginRight:theme.spacing(2)
	},
	descContainer:{
		height:"100%"
	},
	divider:{
		marginTop:theme.spacing(2),
		marginBottom:theme.spacing(2),
	},
	globalDesc:{
		"& a":{
			color:theme.palette.info.main
		}
	}
}));

function QuizItem(props){
	const theme = useTheme()
	const classes = useStyles(theme)
	return(
		<ListItem className={classes.listItem}>
			<Box className={classes.buttonContainer}>
				<MultilingualButton
					disabled={!supquizzes.includes(props.children)}
					to={location=>({...location,pathname:`${location.pathname}/${props.children}`})}
					localize={props.localize}
					locale={props.translate && isolang}>
				{props.children}
				</MultilingualButton>
			</Box>
			<Box className={classes.descContainer}>
				<Typography variant="subtitle1">
					{props.localize.translate(props.desc)}
				</Typography>
			</Box>
		</ListItem>
	)
}

function HomeContents(props){
	console.log(props.location)
	const theme = useTheme()
	const classes = useStyles(theme)
	return(
		<Box className={classes.root}>
			<Typography variant="h3">{props.localize.translate("Czech","cs")}</Typography>
			{props.localize.translate("cs-desc")(classes.globalDesc)}
			<Divider className={classes.divider}/>
			<List className={classes.listContainer}>
				{
					Object.keys(quizzes).map(
						(item, index)=>
								<QuizItem
									desc={quizzes[item].desc}
									key={index*2}
									last={index==Object.keys(quizzes).length-1}
									localize={props.localize}
									translate={quizzes[item].translate}>
								{item}
								</QuizItem>
					).reduce(
						(prev,curr)=>[
							prev,
							<Divider key={prev.props.index+1} className={classes.divider}/>,
							curr
						]
					)
				}
			</List>
		</Box>
	)
}

export default function Home(props){
	return (
		<Switch>
			<Route exact path="/cs">
				<HomeContents {...props}/>
			</Route>
			<Route exact path="/cs/cs-2">
				<Cs2 {...props}/>
			</Route>
		</Switch>
	);
}