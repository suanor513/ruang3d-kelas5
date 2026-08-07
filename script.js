// ======================================
// VARIABEL UTAMA
// ======================================

let scene;
let camera;
let renderer;
let cube;



// ======================================
// MEMBUAT AREA 3D
// ======================================

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


    camera.position.z = 4;


    animasi();

}



// ======================================
// MATERI
// ======================================

function ubahMateri(judul, isi){


    let judulBox =
    document.getElementById("judulMateri");


    let isiBox =
    document.getElementById("isiMateri");


    if(judulBox){

        judulBox.innerHTML = judul;

    }


    if(isiBox){

        isiBox.innerHTML = isi;

    }

}



// ======================================
// GARIS RUSUK DAN TITIK SUDUT
// ======================================

function tambahGarisDanTitik(geometry){


    // garis rusuk

    let garis =
    new THREE.EdgesGeometry(
        geometry
    );


    let materialGaris =
    new THREE.LineBasicMaterial({

        color:0x000000

    });


    let outline =
    new THREE.LineSegments(
        garis,
        materialGaris
    );


    cube.add(outline);



    // titik sudut

    let materialTitik =
    new THREE.PointsMaterial({

        color:0xff0000,

        size:0.15

    });



    let titik =
    new THREE.Points(
        geometry,
        materialTitik
    );


    cube.add(titik);


}



// ======================================
// KUBUS
// ======================================

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


    tambahGarisDanTitik(
        geometry
    );



    ubahMateri(
        "Kubus",
        `
        <ul>
        <li>⬜ Jumlah sisi : 6</li>
        <li>📏 Jumlah rusuk : 12</li>
        <li>🔴 Titik sudut : 8</li>
        <li>📐 Volume = s × s × s</li>
        </ul>
        `
    );


}




// ======================================
// BALOK
// ======================================

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


    tambahGarisDanTitik(
        geometry
    );



    ubahMateri(
        "Balok",
        `
        <ul>
        <li>⬜ Jumlah sisi : 6</li>
        <li>📏 Jumlah rusuk : 12</li>
        <li>🔴 Titik sudut : 8</li>
        <li>📐 Volume = p × l × t</li>
        </ul>
        `
    );


}




// ======================================
// PRISMA SEGITIGA
// ======================================

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


    tambahGarisDanTitik(
        geometry
    );



    ubahMateri(
        "Prisma Segitiga",
        `
        <ul>
        <li>🔺 Memiliki alas dan tutup yang sama</li>
        <li>📏 Memiliki sisi tegak</li>
        <li>🔴 Memiliki titik sudut</li>
        <li>📐 Volume = luas alas × tinggi</li>
        </ul>
        `
    );


}




// ======================================
// KUIS
// ======================================

function tampilKuis(){

    alert(
        "Kuis Bangun Ruang akan segera dibuat"
    );

}




// ======================================
// ANIMASI
// ======================================

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




// ======================================
// MULAI APLIKASI
// ======================================

buatCanvas();

tampilKubus();
