const json_url = "/tools/tags/tags.json";
const translations_url = "/tools/tags/translations.json";
const id_lang = "en";
let uniqueTags = [];
let tagsFile = [];
let selectedTags = [];
let matchingContents = [];
let translatedTags = [];
let translations = [];
let currentLanguage = localStorage.getItem("currentLanguage")===null?"en":localStorage.getItem("currentLanguage");

/////// Traducir de español a inglés:
// if (element.textContent[i] === obj.es) { element.textContent[i] = obj.en; }

/////// Traducir de inglés a español:
// if (element.textContent[i] === obj.en) { element.textContent[i] = obj.es; }

/////// La lógica es la misma, querría que el código fuera tipo 
// if .... === obj.field1 { ....... = obj.field2; } 
// y que field1 y field2 sean parámetros de la función

function deduplicate(array) {
	array.sort();
	const uniqueArray = [];
	uniqueArray.push(array[0]);
	for (let i=1;i<array.length-1;i++){
		// ignore every element that's equal to the preceeding one - by sorting and doing this we get an array of unique values
		if (array[i] !== array[i-1]){
			uniqueArray.push(array[i]);
		}
	}
	return uniqueArray;
}

function updateSelected(newString) {
	//console.log('running function updateSelected')
	//console.log('pushed button: ', newString);
	const added = addToSelected(newString); // update selectedTags
	updateMatchingContents(newString, added); // updateMatchingContents
	listMatchingContents(); // update html
}

function findMatching(newString){ // finds every element matching a specific tag
	let matching = [];
	for (let i=0;i<tagsFile.length;i++){
		for (let j=0;j<tagsFile[i].tag.length;j++){
			if (tagsFile[i].tag[j] === newString){
				matching.push(tagsFile[i]);
				break;
			}
		}
	}
	return matching;
}

function updateMatchingContents(newTag, added) { // updates the matchingContents array
	//console.log("currently there are ",selectedTags.length," tags selected. updating results");
	if (selectedTags.length === 0){
		matchingContents = [];
	}
	else if(added){
		let matchingNewTag = findMatching(newTag);console.log("contents matching ",newTag," tag:");console.log(matchingNewTag);
		for (let i=0;i<matchingNewTag.length;i++){
			if (matchingContents.indexOf(matchingNewTag[i]) >= 0){
				//console.log("ignoring ",matchingNewTag[i].title);
				continue;
			}
			matchingContents.push(matchingNewTag[i]);console.log("added ",matchingNewTag[i].title);
		}
	}
	else{
		let matchingNewTag = findMatching(newTag);
		for (let i=0;i<matchingNewTag.length;i++){
			let ignore = false;
			for (let j=0;j<matchingNewTag[i].tag.length;j++){
				if (selectedTags.indexOf(matchingNewTag[i].tag[j])>=0){
					//console.log("not removing ",matchingNewTag[i].title," because the ",matchingNewTag[i].tag[j]," tag is still selected");
					ignore = true;
					break;
				}
			}
			if (!ignore){
				//console.log("removing ",matchingNewTag[i].title);
				let index = matchingContents.indexOf(matchingNewTag[i]);
				matchingContents.splice(index,1);
			}
		}
	}
	//console.log("selected tags:");console.log(selectedTags);
	//console.log("matching contents for the selected tags:");console.log(matchingContents);
}

function listMatchingContents() { // this function creates a list from the matchingContents array
	let element = document.getElementById("matchingContentsList");
	element.innerHTML="";
	for (let i=0;i<matchingContents.length;i++){
		const listItem = document.createElement("li");
		const link = document.createElement("a");
		link.setAttribute('href',matchingContents[i].url);
		link.textContent = matchingContents[i].type === "" ? matchingContents[i].title : matchingContents[i].title + " (" + matchingContents[i].type + ")";
		listItem.appendChild(link);
		element.appendChild(listItem);
	}
}

function addToSelected(newString) { // this function updates the selectedTags array
	let alreadySelected=false;
	for (let i=0; i<selectedTags.length;i++){
		if (selectedTags[i] === newString){
			alreadySelected=true;
			break;
		}
	}
	if(alreadySelected){ // de-select
		//console.log("tag was already selected!");
		const index = selectedTags.indexOf(newString);
		if(index > -1) {selectedTags.splice(index, 1);}
	}
	else{ // select
		//console.log("tag was not already selected");
		selectedTags.push(newString);
	}
	console.log("selected tags: ");console.log(selectedTags);
	let button = document.getElementById(newString);
	button.className = (alreadySelected?"":"selected");
	//console.log("class changed to ",button.className);
	return !alreadySelected;
}

function getUniqueTags(){
	if (uniqueTags.length <= 0){
		let allTags = [];
		for (let i=0;i<tagsFile.length;i++){
			for (let j=0;j<tagsFile[i].tag.length;j++){
				allTags.push(tagsFile[i].tag[j]);
			}
		}
		uniqueTags = deduplicate(allTags);console.log("uniqueTags created:");console.log(uniqueTags);
	}
}

function listTags(array){
	let element = document.getElementById("tagsList");
	element.innerHTML="";
	for (let i=0;i<array.length;i++){
		const listItem = document.createElement("li");
		const tagButton = document.createElement("button");
		tagButton.textContent = array[i];
		tagButton.id = array[i];
		tagButton.setAttribute('onclick','updateSelected("'+tagButton.id+'")');
		listItem.appendChild(tagButton);
		element.appendChild(listItem);
	}
}

function translateTags(to_lang){
	//console.log("translating from ",currentLanguage," to ",to_lang);
	for (let i=0;i<translations.length;i++){
		let element = document.getElementById(translations[i][id_lang]);
		if (element !== null){
			if(currentLanguage !== to_lang){console.log(translations[i][currentLanguage]," (",currentLanguage,") translates to ",translations[i][to_lang]," (",to_lang,")");}
			element.textContent = translations[i][to_lang];
		}
	}
	currentLanguage = to_lang;
	localStorage.setItem("currentLanguage",currentLanguage);
}

function resetSelection(){
	for (i=0;i<selectedTags.length;i++){
		let element = document.getElementById(selectedTags[i]);
		element.className="";
	}
	selectedTags = [];
	updateMatchingContents();
	listMatchingContents();
	console.log("selection cleared");
}

async function fetchTranslations(){
	//const request = new Request(translations_url);
	const response = await fetch(translations_url);
	response.json().then((data)=>{
		translations = data;
		console.log("translations created");
		console.log(translations);
		if (currentLanguage !== id_lang){
			//console.log("whoops, current language",currentLanguage," doesn't match id language ",id_lang);
			translateTags(currentLanguage);
		}
	});
}

async function fetchTags() {
	console.log("currentLanguage: ",currentLanguage);
    //const request = new Request(json_url);
    const response = await fetch(json_url);
	response.json().then((data)=>{
		tagsFile = data;
		getUniqueTags();
		listTags(uniqueTags);
	});
}