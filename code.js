var toggledProjects = false;
var toggledSocials = false;

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