let scene;
let camera;
let renderer;
let cube;


function tampilKubus(){

    scene = new THREE.Scene();


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
        window.innerWidth,
        400
    );


    document
    .getElementById("canvas3D")
    .innerHTML="";


    document
    .getElementById("canvas3D")
    .appendChild(renderer.domElement);



    // Membuat bentuk kubus
    let geometry =
    new THREE.BoxGeometry();



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
