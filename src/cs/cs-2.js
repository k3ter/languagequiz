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

import {MultilingualButton} from "../customcomponents";

// Quiz Component
import Quiz from "../quiz";

import GenerateQuestionData from "../generatequestiondata"

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

const useStyles = makeStyles(theme=>({

})) 

const qdSettings = {
	questionWeight:{
		regular:2
	},
	questionTypes:{
		regular:{
			data:{"word":"words"},
			question:(data)=>`What is the first letter of "${data.word}"?`,
			answer:(data)=>data.word[0],
		},
		dual:{
			data:{"word":"words"},
			question:(data)=>`DWhat is the first letter of "${data.word}"?`,
			answer:(data)=>data.word[0],
		}
	},
	data:{
		"words":[
			"hi"
		]
	}
}

export default function Cs2(props){
	const generateQuestionData = GenerateQuestionData(qdSettings)
	return(
		<Quiz {...props} isolang={isolang} references={{"1":"google.com"}} quizname={quizname} generate={generateQuestionData}/>
	)
}