//React imports
import React, {useState, useEffect} from "react";

import {
	Link,
	useHistory
} from "react-router-dom";

// CLSX
import clsx from "clsx";

// MUI Imports
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


import SafeLink from "./safelink"

const useStyles = makeStyles(theme=>({
	root:{
		padding:theme.spacing(2),
		display:"flex",
		justifyContent:"space-between",
	},
	container:{
		flexBasis:"60%"
	},
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
	},
	textInputContainer:{
		display:"flex",
		justifyContent:"center",
		marginBottom:theme.spacing(2)
	},
	textInput:{
		...theme.typography.h4,
	},
	submitContainer:{
		display:"flex",
		justifyContent:"center"
	},
	inputCorrect:{
		color:theme.palette.success.main + "!important",
	},
	inputIncorrect:{
		color:theme.palette.error.main + "!important",
	},
}))

function QuizContainer(props){
	const theme = useTheme()
	const classes = useStyles(theme)
	const history = useHistory()
	return (
		<Box className={classes.root}>
			<Box>
				<IconButton aria-label="back" onClick={history.goBack}>
					<ArrowBackIcon/>
				</IconButton>
			</Box>
			<Box className={classes.container}>
			{props.children}
			</Box>
			<Box/>
		</Box>
	)
}

function QuestionBase(props){
	const theme = useTheme();
	const classes = useStyles(theme);
	return(
		<Box>
			<Typography align="center" variant="h4">{props.questionData.question}</Typography>
				{props.children}
		</Box>
	)
}

function QuestionText(props){
	const [answer, setAnswer] = useState("");
	const handleChange = (event) => {
		setAnswer(event.target.value);
	};
	
	const theme = useTheme();
	const classes = useStyles(theme);
	const correct = props.correct === true,
		incorrect = props.correct === false;
		
	const next = function(){
		setAnswer("");
		props.next();
	}
	
	return (
		<Box>
			<QuestionBase {...props}>
				<Box className={classes.textInputContainer}>
					<Input disabled={props.disabled} className={clsx(classes.textInput,correct && classes.inputCorrect, incorrect && classes.inputIncorrect)} value={answer} onChange={handleChange} size="normal"/>
				</Box>
				<Box className={classes.submitContainer}>
					<Button
						startIcon={props.disabled ? <NavigateNextIcon/> : <CheckCircleIcon/>}
						size="large"
						variant="contained"
						color="primary"
						onClick={
							props.disabled ? ()=>{next()} : ()=>{if(answer.length>0)props.validate(answer)}
						}
					>
					{
						props.disabled ? "next" : "check"
					}
					</Button>
				</Box>
			</QuestionBase>
		</Box>
	)
}

function Question(props){
	return(
		<Box>
		{
			props.questionData.type === "text" && <QuestionText {...props}/>
		}
		</Box>
	)
}

function Solution(props){
	return (
		<Box>
		AAA
		</Box>
	)
}

function ReferenceDialog(props){
	const [open, setOpen] = useState(false)
	
	const handleOpen = ()=>{setOpen(true)};
	const handleClose = ()=>{setOpen(false)};

	return(
		<Box>
			<Button variant="text" onClick={handleOpen}>{"References"}</Button>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle onClose={handleClose}>
					{"References"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
				{
					Object.entries(props.references).map((entry,index)=>(
						<Typography key={"ref" + index} gutterBottom><SafeLink blank to={entry[1]}>{entry[0]}</SafeLink></Typography>
					))
				}
				</DialogContent>
			</Dialog>
		</Box>
	)
}

export default function Quiz(props){
	const [score, setScore] = useState([0,0])
	const [questionData, setQuestionData] = useState({})
	const [questionActive, setQuestionActive] = useState(true)
	const [questionCorrect, setQuestionCorrect] = useState(null)
	
	const nextQuestion = function(){
		setQuestionActive(true);
		setQuestionCorrect(null);
		let qd = props.generate();
		console.log(qd)
		setQuestionData(qd)
	}
	
	const validate = function(answer){
		setQuestionActive(false)
		let correct;
		if(questionData.caseSensitive){
			correct = questionData.answer === answer;
		}
		else{
			correct = questionData.answer.toLowerCase() === answer.toLowerCase();
		}
		setQuestionCorrect(correct)
		setScore([score[0] + (correct ? 1 : 0), score[1] + (!correct ? 1 : 0)])
	}
	
	useEffect(()=>{ // Component Did Mount
		nextQuestion()
	},[]);//Second argument so that it does not update
	
	const theme = useTheme()
	const classes = useStyles(theme)
	
	return(
		<QuizContainer>
			<Typography variant="h4">{props.quizname}</Typography>
				{
					props.references && (
						<ReferenceDialog references={props.references}/>
					)
				}
			<Divider className={classes.divider}/>
			<Box className={classes.scoreContainer}>
				<Typography variant="body1" className={classes.scoreCorrect}>{score[0]}</Typography>
				<Typography variant="body1" className={classes.scoreIncorrect}>{score[1]}</Typography>
			</Box>
			<Divider className={classes.divider}/>
			<Question
				validate={validate}
				next={nextQuestion}
				questionData={questionData}
				disabled={!questionActive}
				correct={questionCorrect}
			/>
			{
				!questionActive && !questionCorrect && <Solution/>
			}
		</QuizContainer>
	)
}