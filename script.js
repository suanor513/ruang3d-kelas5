// =================================
// VARIABEL UTAMA
// =================================

let scene;
let camera;
let renderer;
let cube;


// =================================
// MEMBUAT CANVAS 3D
// =================================

function buatCanvas(){

    scene = new THREE.Scene();

    scene.background =
    new THREE.Color(0xe3f2fd);


    camera =
    new THREE.PerspectiveCamera(
        75,
        600 / 400,
        0.1,
        1000
    );


    renderer =
    new THREE.WebGLRenderer({
        antialias:true
    });


    renderer.setSize(
        600,
        400
    );


    let tempat =
    document.getElementById("canvas3D");


    tempat.innerHTML="";


    tempat.appendChild(
        renderer.domElement
    );


    camera.position.z=4;


    animasi();

}



// =================================
// MENGUBAH MATERI
// =================================

function ubahMateri(judul, isi){

    document.getElementById("judulMateri").innerHTML =
    judul;


    document.getElementById("isiMateri").innerHTML =
    isi;

}



// =================================
// KUBUS
// =================================

function tampilKubus(){

    scene.clear();


    let geometry =
    new THREE.BoxGeometry(
        2,
        2,
        2
    );


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



    ubahMateri(
    "Kubus",
    `
    <ul>
    <li>⬜ Sisi : 6</li>
    <li>📏 Rusuk : 12</li>
    <li>🔵 Titik sudut : 8</li>
    <li>📐 Volume = s × s × s</li>
    </ul>
    `
    );

}



// =================================
// BALOK
// =================================

function tampilBalok(){

    scene.clear();


    let geometry =
    new THREE.BoxGeometry(
        3,
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



    ubahMateri(
    "Balok",
    `
    <ul>
    <li>⬜ Sisi : 6</li>
    <li>📏 Rusuk : 12</li>
    <li>🔵 Titik sudut : 8</li>
    <li>📐 Volume = p × l × t</li>
    </ul>
    `
    );

}



// =================================
// PRISMA SEGITIGA
// =================================

function tampilPrisma(){

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



    ubahMateri(
    "Prisma Segitiga",
    `
    <ul>
    <li>🔺 Memiliki alas dan tutup yang sama</li>
    <li>📏 Memiliki sisi tegak</li>
    <li>📐 Volume = luas alas × tinggi</li>
    </ul>
    `
    );

}



// =================================
// KUIS
// =================================

function tampilKuis(){

    alert(
    "Kuis Bangun Ruang akan segera dibuat"
    );

}



// =================================
// ANIMASI
// =================================

function animasi(){

    requestAnimationFrame(
        animasi
    );


    if(cube){

        cube.rotation.x +=0.01;

        cube.rotation.y +=0.01;

    }


    if(
    renderer &&
    scene &&
    camera
    ){

        renderer.render(
            scene,
            camera
        );

    }

}



// =================================
// MULAI APLIKASI
// =================================

buatCanvas();

tampilKubus();
