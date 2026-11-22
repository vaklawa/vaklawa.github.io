let favs = localStorage.getItem("favs") === null ? [] : localStorage.getItem("favs");
//console.log("favs list retrieved");console.log(favs);
let favsObj = favs.length === 0 ? [] : (favs.length === 1 ? JSON.parse("["+favs+"]") : JSON.parse(favs));
//console.log("favs list JSON parsed");console.log(favsObj);
let isAlreadyAdded = false;
for (let i=0;i<favsObj.length;i++){
    if (favsObj[i].url === document.URL) {
        isAlreadyAdded = true;
        break;
    }
}
//console.log("document already added to favs?");console.log(isAlreadyAdded);

function addToFavs(title){
    if (isAlreadyAdded) {
        console.log(title," is already added to favs");
        return;
    }
    let obj = {"title":title,"url":document.URL};
    console.log(favsObj);
    console.log(obj);
    favsObj.push(obj);
    favs = JSON.stringify(favsObj);
    localStorage.setItem("favs",favs);
    console.log("added ",obj.title," to favs");
    isAlreadyAdded = true;
}

function removeFromFavs(title){
    if (!isAlreadyAdded){return;}
    for (let i=0;i<favsObj.length;i++){
        if (title === favsObj[i].title){
            favsObj.splice(i,1);
            favs = JSON.stringify(favsObj);
            localStorage.setItem("favs",favs);
            console.log("removed ",favsObj[i].title," from favs");
            isAlreadyAdded = false;
            break;
        }
    }
}

function clearFavs(){
    localStorage.removeItem("favs");
    favsObj = [];
    fasv = [];
    console.log("favs list cleared");
}

function listFavs(){
    let element = document.getElementById("favsList");
    element.innerHTML = "";
    if (favsObj.length <= 0){
        element.setAttribute("style","text-align:center;")
        element.textContent = "(tu lista de Favoritos está vacía)";
        return;
    }
    for (let i=0;i<favsObj.length;i++){
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.setAttribute("href",favsObj[i].url);
        link.textContent = favsObj[i].title;
        listItem.appendChild(link);
        element.appendChild(listItem);
    }
}