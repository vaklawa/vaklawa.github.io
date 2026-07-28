/* Collapse & expand nav */
function collapseNavWindow(){
    let element=document.getElementById("topnav");
    if(element.className==="nav-window-content"){
        console.log('class name is nav-window-content. collapsing navwindow');
        element.className="nav-window-collapsed";
    }
    else{
        console.log('window is already collapsed');
    }
}
function expandNavWindow(){
    let element=document.getElementById("topnav");
    if(element.className==="nav-window-collapsed"){
        console.log('class name is nav-window-collapsed. expanding navwindow');
        element.className="nav-window-content";
    }
    else{
        console.log('window is already expanded');
    }
}
function closeWindow(windowName){
    let element=document.getElementById(windowName);
    console.log('closing window:');
    console.log(windowName);
    element.className="closed";
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