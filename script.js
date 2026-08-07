let scene;
let camera;
let renderer;
let cube;


// membuat tampilan 3D
function buatCanvas(){

scene = new THREE.Scene();

scene.background = new THREE.Color(0xe3f2fd);


camera = new THREE.PerspectiveCamera(
75,
600/400,
0.1,
1000
);


renderer = new THREE.WebGLRenderer({
antialias:true
});


renderer.setSize(600,400);


document
.getElementById("canvas3D")
.innerHTML="";


document
.getElementById("canvas3D")
.appendChild(renderer.domElement);


camera.position.z=4;


animasi();

}


// kubus
function tampilKubus(){

if(!scene){
buatCanvas();
}

scene.clear();


let geometry =
new THREE.BoxGeometry(2,2,2);


let material =
new THREE.MeshBasicMaterial({
color:0x2196f3
});


cube =
new THREE.Mesh(
geometry,
material
);


scene.add(cube);

}


// balok
function tampilBalok(){

if(!scene){
buatCanvas();
}

scene.clear();


let geometry =
new THREE.BoxGeometry(
2.5,
1.5,
1
);


let material =
new THREE.MeshBasicMaterial({
color:0xff9800
});


cube =
new THREE.Mesh(
geometry,
material
);


scene.add(cube);

}


// prisma
function tampilPrisma(){

if(!scene){
buatCanvas();
}

scene.clear();


let geometry =
new THREE.CylinderGeometry(
1,
1,
2,
3
);


let material =
new THREE.MeshBasicMaterial({
color:0x9c27b0
});


cube =
new THREE.Mesh(
geometry,
material
);


scene.add(cube);

}


// animasi
function animasi(){

requestAnimationFrame(animasi);


if(cube){

cube.rotation.x +=0.01;
cube.rotation.y +=0.01;

}


if(renderer && scene && camera){

renderer.render(
scene,
camera
);

}

}

buatCanvas();
tampilKubus();
