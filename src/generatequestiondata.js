
/*
	SETTINGS FORMAT
	{
		questionWeights:{
			"id":int
		},
		questionTypes:{
			"id":{
				type:ENUM OR [ENUM], // ENUM = "text"|"select"
				data: {id:dataSetID}, // Randomly selected and inputed into
				question: function(data):string,  // function to convert data into question
				answer: function(data):string // function to convert data into answer
			}
		},
		data:{
			dataSetID:Array(Object) // set of data to be randomly selected from
		}
	}
*/

const sum = function(_){
	return _.reduce((a,b)=>a+b)
}

const weightedRandom = function(p){
	let r = Math.random(), sum = 0;
	for(let i in p){
		sum += p[i];
		if(r<=sum)return i;
	}
	return p[p.length-1]; // on rare/impossible precision error, return last element
}

const unweightedRandom = function(p){
	return p[Math.floor(Math.random()*p.length)]
}

export default function GenerateQuestionData(settings){
	let s = {...settings}; // copy settings so changes can be made
	var getQuestionID;
	if(s.questionWeight){
		// Make default weight 1
		for(let key in s.questionTypes)
			s.questionWeight[key] = s.questionWeight[key] || 1
		
		let netWeight = sum(Object.values(s.questionWeight))
		for(let key in s.questionTypes)
			s.questionWeight[key]/=netWeight
		getQuestionID = ()=>weightedRandom(s.questionWeight)
	}
	else{
		getQuestionID = ()=>Object.keys(s.questionTypes)[Math.floor(Math.random()*Object.keys(s.questionTypes).length)]
	}
	return function(){
		let questionType = s.questionTypes[getQuestionID()]
		let data = Object.fromEntries(
			Object.entries(questionType.data).map(
				([key, value], index)=>{
					return [key, unweightedRandom(s.data[value])]
				}
			)
		)
		return {
			type: typeof questionType.type === "object" ? unweightedRandom(questionType.type) : questionType.type || "text",
			question: questionType.question(data),
			answer: questionType.answer(data),
		}
	}
}