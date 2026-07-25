function collapseNavWindow(){
    let element=document.getElementById("topnav");
    if(element.className==="nav-window-content"){
        element.className="nav-window-collapsed";
    }
    else{
        element.className="nav-window-content";
    }
}
function expandNavWindow(){
    document.getElementById("topnav").className="nav-window-content";
}

/* toggles a specific window */
function toggleAuxWindow(num){
    let element=document.getElementById("window" + num);
    if(element.className==="aux-window-content"){
        element.className="window-collapsed";
    }
    else{
        element.className="aux-window-content";
    }
}
function toggleNavWindow(num){
    let element=document.getElementById("window" + num);
    if(element.className==="nav-window-content"){
        element.className="nav-window-collapsed";
    }
    else{
        element.className="nav-window-content";
    }
}

/* switches between default font (Times New Roman) and JP Hand */
function changeFont(){
   let poemText=document.getElementById("poem");
    if(poemText.className==="default"){
        poemText.className="hand";
    }
    else{
        poemText.className="default";
    }
    paperSoundEffect2();

}

function hideAllWindows(){
    for(let i=1;i<6;i++){
        if(document.getElementById("window"+i)===null){break;}
        document.getElementById("window" + i).className="window-collapsed";
    }
}

function showAllWindows(){
    let element;
    for(let i=1;i<6;i++){
        element=document.getElementById("window"+i);
        if(element.className==="window-collapsed"){
            element.className="window";
        }
    }
}

function showSpecificWindow(num){
    hideAllWindows();
    if(document.getElementById("topnav").className==="nav-window-content"){collapseNavWindow();}
    let element=document.getElementById("window"+num);
    if(element!==null){
        element.className="window";
        console.log("mostrando ventana "+num);
    }
}

// play sound effect when opening a poem
let paperSound=document.getElementById("paper-sound");
function paperSoundEffect(){
    paperSound.play();
}

// play sound effect when pushing button
let paperSound2=document.getElementById("paper-sound2");
function paperSoundEffect2(){
    paperSound2.play();
}