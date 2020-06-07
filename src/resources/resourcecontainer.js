/*
	Resources format
	{
		resources:{
			type:{
				foo:bar
			}
		}
	}
*/

export default class ResourceContainer {
	getResource(type, index, toLocale){
		if(index === null)// happens if key does not exist
			return this.getResourceNull()
		let locale = toLocale || this.locale;
		let resource = this._resources[type].val[index];
		if(resource.hasOwnProperty(locale))
			return resource[locale]
		else if(resource.hasOwnProperty(this.defaultLocale)){
			this.missingLocale(type, index, toLocale);
			return resource[this.defaultLocale]
		}
		else
			return this.missingResourceValue(type, index)
	}
	
	getResourceID(type, key){
		let i = this._resources[type].id.indexOf(key); // Returns index of the resouce
		if(i === -1){
			return this.missingResourceID(type,key);
		}
		else
			return i
	}
	
	getResourceName(type, index){
		if(index === undefined){
			throw new TypeError("Invalid arguments");
		}
		return this._resources[type].id[index]
	}
	
	log(...args){
		if(this._dev)
			console.log(...args);
	}
	warn(...args){
		if(this._dev)
			console.warn(...args);
	}
	error(...args){
		if(this._dev)
			console.error(...args);
	}
	
	defaultMissingLocale(type, index, toLocale){
		this.warn(`Missing locale "${toLocale} from resource "${this.getResourceName(type, index)}" from type "${type}"`);
		return null;
	}
	
	defaultMissingResourceValue(type, index){
		this.error(`Missing resource value for resource "${this.getResourceName(type, index)}" from from type "${type}"`);
		return null;
	}
	
	defaultMissingResourceID(type, key){
		this.warn(`Missing "${key}" from type "${type}"`);
		return null;
	}
	
	defaultGetResourceNull(){
		this.warn(`getResource recieved null as argument.`);
		return null;
	}
	
	constructor(dict){
		this._dict = dict;
		this._resources = {}
		this._dev = process.env.NODE_ENV === "development";
		
		this.locale = dict.defaultLocale;
		this.defaultLocale = dict.defaultLocale;
		
		let callbacks = dict.callbacks || {};
		
		this.missingLocale = callbacks.missingLocale || this.defaultMissingLocale
		this.missingResourceValue = callbacks.missingResourceValue || this.defaultMissingResourceValue
		this.missingResourceID = callbacks.missingResourceID || this.defaultMissingResourceID
		this.getResourceNull = callbacks.getResourceNull || this.defaultGetResourceNull
		
		for(let type of Object.keys(dict.resources)){ // For each resource type defined
			this._resources[type] = {
				id: Object.keys(dict.resources[type]),
				val: Object.values(dict.resources[type])
			}
			this[type] = new Proxy({},{// Alias as such: ResourceContainer.type.key to ResourceContainer.getResourceID(type,key)
				get: function(target,prop,receiver){
					return this.getResourceID(type,prop);
				}.bind(this)
			});
			this["get" + type[0].toUpperCase() + type.slice(1)] = function(index, toLocale){
				return this.getResource(type, index, toLocale);
			}
		}
	}
}