export default class Localize{
	constructor(values){
		this.strings = values
		this.locale = null
	}
	setLocale(locale){
		this.locale = locale
	}
	getTranslations(id){
		return this.strings[id]
	}
	translate(id,locale){
		if(!locale){
			locale = this.locale
			if(!locale)
				throw "Locale not defined."
		}
		return this.strings[id] && this.strings[id][locale] ? this.strings[id][locale] : id
	}
}