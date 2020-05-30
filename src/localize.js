import Localize from "./localizecls"

import React from "react";

import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const urls = {
	"cs-desc-wi":"https://en.wikipedia.org/wiki/Czech_language",
	"cs-desc-pi":"http://visionofhumanity.org/indexes/global-peace-index/"
}

const translations = {
	"Language Quiz":{
		"fr":"Quiz de Langues",
	},
	"Home":{
		"fr": "Accueil",
	},
	"Czech":{
		"cs":"Čeština",
		"fr":"Tchèque",
	},
	"Korean":{
		"kr":"한국어",
		"fr":"Coréen",
	},
	"French":{
		"fr": "Français",
	},
	
	
	// Grammar
	"nominative":{
		"en": "nominative",
		"fr": "nominatif",
		"cs": "nominativ"
	},
	"genitive":{
		"en": "genetive",
		"fr": "genitif",
		"cs": "genitiv",
	},
	"dative":{
		"en": "dative",
		"fr": "datif",
		"cs": "dativ",
	},
	"accusative":{
		"en": "accusative",
		"fr": "accusatif",
		"cs": "akusativ",
	},
	"vocative":{
		"en": "vocative",
		"fr": "vocatif",
		"cs": "vokativ",
	},
	"locative":{
		"en":"locative",
		"fr":"locatif",
		"cs":"lokál"
	},
	"singular":{
		"en":"singular",
		"fr":"singulier",
		"cs":"jednotný"
	},
	"plural":{
		"en":"plural",
		"fr":"pluriel",
		"cs":"plurál"
	},
	
	"cs-desc":{
		"en":(cls)=><Typography className={cls} variant="body1">Czech is a slavic language almost exclusively spoken in the Czech Republic. Just over 10 million natives speak the language. It is very similar to both Slovak and Polish to a point of high comprehension among those languages. The language has been heavily influenced by Latin and German (<MuiLink rel="noreferrer" target="_blank" href={urls["cs-desc-wi"]}>Wikipedia</MuiLink>).
		<br/>The Czech Republic (alternatively known as Czechia) is regarded as one of the safest places to live by the <MuiLink rel="noreferrer" target="_blank" href={urls["cs-desc-pi"]}>Global Peace index.</MuiLink>, ranking number 10 on their peacefulness scale (second best slavic country after Slovenia).</Typography>
	},
	"cs-1":{
		"en":"Orthography and Phonetics",
		"fr":"L'Orthographie et la Phonétique"
	},
	"cs-1-desc":{
		"en":"Quiz the fundamental building blocks of the words of the language (usually, the alphabet and multi-character phonemes) and their sounds.",
		"fr":"Interroger sur les composantes de bases des mots la langue (en général, l'alphabet et des phonèmes multi-caractères) et leurs sons.",
	},
	"cs-2":{
		"en":"Gender and Cases",
		"fr":"Le Sexe et les Cas",
		"cs":"Rody a Pády"
	},
	"cs-2-desc":{
		"en":"Quiz the declensions and families of nouns.",
		"fr":"Interroger sur les familles et les déclinaison des noms."
	},
	"cs-2-note-pan":{
		"en": "When multiple dative-case words or vocative-case words are in series, all but the last use -u, and the last uses -ovi. The same applies",
		"fr": "Quand de multiple mots au vocatif ou au datif sont en série, le denier se termine par -ovi, et le reste se termine par -u."
	}
}

const localize = new Localize(translations)
export default localize;
