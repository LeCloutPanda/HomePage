let FOV = 90;
let NCP = 0.1;
let FCP = 1000;
let IW = window.innerWidth;
let IH = window.innerHeight;

var scene, camera, renderer, controls, fbxLoader;

var boxes = [];
var lights = [ 
    new THREE.PointLight(0xffffff, .75, 100),
    new THREE.PointLight(0xffffff, .75, 100),
    new THREE.PointLight(0xffffff, .75, 100),
    new THREE.PointLight(0xffffff, .75, 100)
];

function init() {
    //Frame rate etc
    (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

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
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;    

    //FBX loader
    fbxLoader = new THREE.FBXLoader();
    fbxLoader.load(
        'models/cube.fbx', 

        function(object) {
            scene.add(object);
            object.scale.x = object.scale.x / 100;
            object.scale.y = object.scale.y / 100;
            object.scale.z = object.scale.z / 100;
            object.position.set(0, 4, 0);

            object.material = new THREE.MeshStandardMaterial({ color: "red" });
        }
    );

    //Updating scene when resizing
    window.addEventListener('resize', function() {
        IW = window.innerWidth;
        IH = window.innerHeight;
        renderer.setSize(IW, IH);
        camera.aspect = IW / IH;
        camera.updateProjectionMatrix();
    });

    initDirectionalLight(scene);

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

    const planeGeometry = new THREE.PlaneGeometry(25, 25, 64);
    const planeMaterial = new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load("textures/me.png"), side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    scene.add( plane );
}

// Update logic
var update = function (time) {

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
        lights[i].castShadow = true;

        console.log(lights[i].position);

        scene.add(lights[i]);

        //Set up shadow properties for the light
        lights[i].shadow.mapSize.width = 512; // default
        lights[i].shadow.mapSize.height = 512; // default
        lights[i].shadow.camera.near = 0.5; // default
        lights[i].shadow.camera.far = 500; // default

        var boxGeometry = new THREE.SphereGeometry(0.25, 64, 64);
        var boxMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        boxes.push(new THREE.Mesh(boxGeometry, boxMaterial));
        scene.add(boxes[i]);

        //let theta = ((time / 200) * (Math.PI * 2) / lights.length) * i;
        let theta = (Math.PI * 2 / lights.length * i);
        let mult = 5 * lights.length / Math.PI;
        let x = Math.cos(theta);
        let z = Math.sin(theta);
    
        lights[i].position.set(x * mult,
        2.5,
        z * mult);
    
        boxes[i].position.set(lights[i].position.x, lights[i].position.y, lights[i].position.z)
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