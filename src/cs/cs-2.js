//React
import React, {useState} from "react";
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

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {MultilingualButton, QuizContainer} from "../customcomponents";
import Localize from "../localizecls"

const isolang = "cs",
	quizname = "cs-2";

const cases = [
	"nominative","genetive","dative","accusative","vocative","locative","instrumental"
]

const count = [
	"singular", "plural"
]

const nouns = {
	"pán":[
		["pán","pána",["pánu","pánovi"],"pána","pane",["pánu","pánovi"],"pánem"],
		[["pánové","pánu"], "pánů", "pánům", "pány", ["pánové", "páni"],"pánech", "pány"]
	]
}

const notes = {
	"pán":"cs-2-note-pan"
}

const questionLocalize = new Localize({
	0:{
		"en": "What is \"{n}\" in {c} {s}?",
		"fr": "Qu'est-ce \"{n}\" au {c} au {s} ?"
	}
})

const questionTypeLen = 1

function generateQA(){
	const rn = (Math.random() * questionTypeLen) | 0 // use bitwise or instead of Math.floor
	if(rn===1){ // What is ${noun} in ${case} ${Plural/singular}
		
	}
}

const useStyles = makeStyles(theme=>({
	divider:{
		marginTop:theme.spacing(2),
		marginBottom:theme.spacing(2),
	},
	scoreContainer:{
		width:"20%",
		display:"flex",
		justifyContent:"space-between",
	},
	scoreCorrect:{
		color:theme.palette.success.main,
		display:"inline",
	},
	scoreIncorrect:{
		color:theme.palette.error.main,
		display:"inline",
	}
})) 

function Quiz(props){
	const [score, setScore] = useState([0,0])
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	
	let qa = generateQA()
	
	const theme = useTheme()
	const classes = useStyles(theme)
	
	return(
		<Box>
			<Typography variant="h4">{props.localize.translate(quizname,isolang)}</Typography>
			<Divider className={classes.divider}/>
			<Box className={classes.scoreContainer}>
				<Typography variant="body1" className={classes.scoreCorrect}>{score[0]}</Typography>
				<Typography variant="body1" className={classes.scoreIncorrect}>{score[1]}</Typography>
			</Box>
			<Divider className={classes.divider}/>
		</Box>
	)
}

export default function Cs2(props){
	questionLocalize.setLocale(props.localize.locale)
	return(
		<QuizContainer>
			<Quiz {...props}/>
		</QuizContainer>
	)
}