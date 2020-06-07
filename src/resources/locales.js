function RegexObjectExpander(target, property, receiver) {
	for (let k in target)
		if (new RegExp(k, "i").test(property))
			return target[k]
	return null
}

const locales = {
	"cs|czech":"cs",
	"en|english":"cs"
}

export default new Proxy(locales,RegexObjectExpander)