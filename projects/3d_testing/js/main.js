let FOV = 90;
let NCP = 0.1;
let FCP = 1000;
let IW = window.innerWidth;
let IH = window.innerHeight;

var scene, camera, renderer;

function init() {
    //Creating scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(FOV, IW / IH, NCP, FCP);

    //Creating renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(IW, IH);
    document.getElementById("main").appendChild(renderer.domElement);

    //Sky Box
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        'textures/me.png',
        'textures/me.png',
        'textures/me.png',
        'textures/me.png',
        'textures/me.png',
        'textures/me.png'
    ]);
    scene.background = texture;

    //Camera
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;    

    //Updating scene when resizing
    window.addEventListener('resize', function() {
        IW = window.innerWidth;
        IH = window.innerHeight;
        renderer.setSize(IW, IH);
        camera.aspect = IW / IH;
        camera.updateProjectionMatrix();
    });

    //Create a basic shape and assign textures and materials
    var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    var boxMaterials = 
    [
        new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide }), //Right Side
        new THREE.MeshBasicMaterial({ color: "orange", side: THREE.DoubleSide }), //Left Side
        new THREE.MeshBasicMaterial({color: "white", side: THREE.DoubleSide }), //Top Side
        new THREE.MeshBasicMaterial({color: "yellow", side: THREE.DoubleSide }), //Bottom Side
        new THREE.MeshBasicMaterial({ color: "green", side: THREE.DoubleSide }), //Front Side
        new THREE.MeshBasicMaterial({ color: "blue", side: THREE.DoubleSide })  //Back Side
        
    ];
    var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);
}

// Update logic
var update = function () {
   
};
// Draw scene
var render = function () {
    renderer.render(scene, camera);
};
// loop
var loop = function () {
    requestAnimationFrame(loop);

    update();
    render();
};

init();
loop();