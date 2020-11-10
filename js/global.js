var navBar;
var toggledProjects = false;
var toggledSocials = false;

//Links
//Projects
var home = "../index.html";
var tetris = "../projects/tetris/tetris.html";
var testing = "../projects/3d_testing/3d_testing.html";
//Socials
var youtube = "https://www.youtube.com/channel/UCDjft9tB5N_u2fQGm0I_pew?view_as=subscriber";
var instagram = "https://www.instagram.com/lecloutpanda_vfx/";

function addNavBar() {
    navBar = document.write('\
        <link rel="stylesheet" href="css/generalStyle.css">\
        <link rel="stylesheet" href="css/interactiveStyle.css">\
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap">\
        <link rel="stylesheet"href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto&display=swap">\
        <script src="../../js/global.js" charset="utf-8"></script>\
    \
        <div id="sideBar" class="navagationBar">\
            <img src="https://github.com/LeCloutPanda.png?size=500" onclick=openGithub()></img>\
            <button onclick="console.log(tetris)">Home</button>\
    \
            <div class="pDd">\
                <button id="pDdBId" class="pDdB" onclick=toggleProjects()>Projects</button>\
    \
                <div id="pDdId" class="pDdC">\
                    <button onclick="customHREFSelf(tetris)">Tetris</button>\
                    <!--<button onclick="customHREFSelf(testing)">3D Testing</button>-->\
                </div>\
            </div>\
    \
            <div class="sDd">\
                <button id="sDdBId" class="sDdB" onclick=toggleSocials()>Socials</button>\
    \
                <div id="sDdId" class="sDdC">\
                    <button onclick="customHREFBlank(youtube)">Youtube</button>\
                    <button onclick="customHREFBlank(instagram)">Instagram</button>\
                </div>\
            </div>\
    \
            <button>About</button>\
        </div>\
    ');
}

function openGithub(){
    window.open('https://github.com/LeCloutPanda', '_blank');
}

function toggleProjects() {
    document.getElementById("pDdId").classList.toggle("show");
                
    toggledProjects = !toggledProjects;

    if(toggledProjects == true)
        document.getElementById("pDdBId").style.background = "#9fb0ed";
    else
        document.getElementById("pDdBId").style.background = "#7289da";          
}

function toggleSocials() {
    document.getElementById("sDdId").classList.toggle("show");

    toggledSocials = !toggledSocials;
            
    if(toggledSocials == true)
        document.getElementById("sDdBId").style.background = "#9fb0ed";
    else
        document.getElementById("sDdBId").style.background = "#7289da";
}

function customHREFSelf(url) {
    window.open(url, '_self');
}

function customHREFBlank(url) {
    window.open(url, '_blank');
}