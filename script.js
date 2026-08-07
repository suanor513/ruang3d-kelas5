let scene;
let camera;
let renderer;
let cube;


function tampilKubus(){

scene = new THREE.Scene();

scene.background = new THREE.Color(0xe3f2fd);


camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / 400,
0.1,
1000
);


renderer = new THREE.WebGLRenderer({
antialias:true
});


renderer.setSize(
600,
400
);


document
.getElementById("canvas3D")
.innerHTML="";


document
.getElementById("canvas3D")
.appendChild(renderer.domElement);



let geometry =
new THREE.BoxGeometry();



let materials=[

new THREE.MeshBasicMaterial({color:0x42a5f5}),
new THREE.MeshBasicMaterial({color:0x66bb6a}),
new THREE.MeshBasicMaterial({color:0xffca28}),
new THREE.MeshBasicMaterial({color:0xef5350}),
new THREE.MeshBasicMaterial({color:0xab47bc}),
new THREE.MeshBasicMaterial({color:0xff7043})

];



cube =
new THREE.Mesh(
geometry,
materials
);



scene.add(cube);



let garis =
new THREE.EdgesGeometry(geometry);


let garisMaterial =
new THREE.LineBasicMaterial({
color:0x000000
});


let outline =
new THREE.LineSegments(
garis,
garisMaterial
);


cube.add(outline);



camera.position.z=3;


animasi();

}



function animasi(){

requestAnimationFrame(animasi);


if(cube){

cube.rotation.x +=0.01;
cube.rotation.y +=0.01;

}


renderer.render(
scene,
camera
);


}

function tampilBalok(){

scene.clear();

let geometry = new THREE.BoxGeometry(
    2.5,
    1.5,
    1
);

let material = new THREE.MeshBasicMaterial({
    color: 0xff9800
});

cube = new THREE.Mesh(
    geometry,
    material
);

scene.add(cube);

}



function tampilPrisma(){

scene.clear();

let geometry = new THREE.CylinderGeometry(
    1,
    1,
    2,
    3
);

let material = new THREE.MeshBasicMaterial({
    color: 0x9c27b0
});

cube = new THREE.Mesh(
    geometry,
    material
);

scene.add(cube);

}
