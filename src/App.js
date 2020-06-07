// React imports
import React, {
	useState,
	useEffect,
	Header
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import queryString from "query-string";

// Material ui
import clsx from "clsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Box from '@material-ui/core/Box';

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
//Iconography
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';

// Resources
import { useResources } from "./resources/resources"

// Components
import Home from "./home";

import CSHome from "./cs/home";

import theme from "./theme"

const langs = {
	"cs":"Czech",
	"kr":"Korean",
	"fr":"French"
}

const supportedLangs = [
	"cs"
]

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	drawerItemsContainer: {
		width:200
	},
}));

function DrawerItem(props){
	return(
		<ListItem button disabled={props.disabled} component={Link} to={props.to} key={props.children} onClick={props.toggleDrawer(false)}>
			<ListItemIcon>{props.icon}</ListItemIcon>
			<ListItemText primary={props.children}/>
		</ListItem>
	)
}

export default function App(props) {
	const getQuery = queryString.parse(window.location.search);
	if(getQuery.locale){
		//localize.setLocale(getQuery.locale)
	}
	const R = useResources()
	console.log(R.getString(R.string.hello, "cs"))
	
	const classes = useStyles();
	
	const [open, setOpen] = useState(false);
	
	useEffect(
		()=>{
			document.title = "Language Quiz";
		}
	)
	
	const toggleDrawer = (open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		  return;
		}
		setOpen(open)
	}
	const drawerItems = (
	<Box className={classes.drawerItemsContainer}>
		<List>
			<DrawerItem to={location=>({...location,pathname:"/"})} toggleDrawer={toggleDrawer} icon={<HomeIcon/>}>Home</DrawerItem>
			<Divider/>
			{Object.keys(langs).map((lang, index)=>
				<DrawerItem key={index} icon={index==0 ? <LanguageIcon/> : false} to={location=>({...location,pathname:`/${lang}`})} toggleDrawer={toggleDrawer} disabled={!supportedLangs.includes(lang)}>
					{//localize.getTranslations(langs[lang])[langs[lang]] ? localize.getTranslations(langs[lang])[langs[lang]][lang] : langs[lang]}
						"hi"
					}
				</DrawerItem>)
			}
		</List>
	</Box>
	)
	
	return (
		<Router onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar color="inherit" position="static">
					<Toolbar variant="dense" color="inherit">
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit">
						{
							//localize.translate("Language Quiz")
							"tmp"
						}
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					open={open}
					onClose={toggleDrawer(false)}
				>
				{drawerItems}
				</Drawer>
				<Switch>
					<Route exact path="/">
						<Home langs={langs} suplangs={supportedLangs}/>
					</Route>
					<Route path="/cs">
						<CSHome/>
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}