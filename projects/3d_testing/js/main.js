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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    //scene.background = texture;

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

    initPointLights(scene);

    //Create a basic shape and assign textures and materials
    var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    var boxMaterials = 
    [
        new THREE.MeshStandardMaterial({ color: "red" }), //Right Side
        new THREE.MeshStandardMaterial({ color: "orange" }), //Left Side
        new THREE.MeshStandardMaterial({ color: "white" }), //Top Side
        new THREE.MeshStandardMaterial({ color: "yellow" }), //Bottom Side
        new THREE.MeshStandardMaterial({ color: "green" }), //Front Side
        new THREE.MeshStandardMaterial({ color: "blue" })  //Back Side
        
    ];
    var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y += 1;
    box.castShadow = true; //default is false
    box.receiveShadow = false; //default
    scene.add(box);

    var box2Geometry = new THREE.SphereGeometry(0.25, 64, 64);
    var box2Material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    box2 = new THREE.Mesh(box2Geometry, box2Material);
    scene.add(box2);

    const planeGeometry = new THREE.PlaneGeometry(25, 25, 64);
    const planeMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("textures/me.png"), side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    scene.add( plane );
}

var box2;

var lights = [ 
    new THREE.PointLight(0xffffff, .75, 100)
];
let positions = [
    [2, 2, 2]
];

let distance = 2;

// Update logic
var update = function (time) {
   lights[0].position.set(Math.sin(time / 1000) * distance,
   2.5,
   Math.cos(time / 1000) * distance);

   box2.position.set(lights[0].position.x, lights[0].position.y, lights[0].position.z);
   console.log(time);
};
// Draw scene
var render = function () {
    renderer.render(scene, camera);
};
// loop
var loop = function (time = 0) {
    requestAnimationFrame(loop);

    update(time);
    render();
};

function initDirectionalLight(scene) {
        //Create a DirectionalLight and turn on shadows for the light
        const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
        light.position.set( 2, 2, 2 ); //default; light shining from top
        light.castShadow = true; // default false
        scene.add( light );
}

function initPointLights(scene) {
    for (let i = 0; i < lights.length; i++) {
        lights[i].position.set(positions[i][0], positions[i][1], positions[i][2])
        lights[i].castShadow = true;

        console.log(lights[i].position);

        scene.add(lights[i]);

        //Set up shadow properties for the light
        lights[i].shadow.mapSize.width = 512; // default
        lights[i].shadow.mapSize.height = 512; // default
        lights[i].shadow.camera.near = 0.5; // default
        lights[i].shadow.camera.far = 500; // default
    }
}

function initSkyBox(scene) {
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
}

init();
loop();