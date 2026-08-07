// ======================================
// VARIABEL UTAMA
// ======================================

let scene;
let camera;
let renderer;
let cube;
let controls;


// ======================================
// MEMBUAT CANVAS 3D
// ======================================

function buatCanvas(){

    scene = new THREE.Scene();


    scene.background =
    new THREE.Color(0xe3f2fd);



    let tempat =
document.getElementById("canvas3D");

let lebar =
tempat.clientWidth;

let tinggi =
tempat.clientHeight;


camera =
new THREE.PerspectiveCamera(
    75,
    lebar / tinggi,
    0.1,
    1000
);


renderer =
new THREE.WebGLRenderer({
    antialias:true
});


renderer.setSize(
    lebar,
    tinggi
);


    tempat.innerHTML="";


    tempat.appendChild(
        renderer.domElement
    );


    camera.position.z=4;


// kontrol putar dan zoom

controls =
new THREE.OrbitControls(

    camera,

    renderer.domElement

);


controls.enableDamping = true;

controls.dampingFactor = 0.08;

controls.enableZoom = true;

controls.enablePan = false;

controls.rotateSpeed = 1.0;

controls.enableRotate = true;

controls.enableKeys = false;

controls.minDistance = 2;

controls.maxDistance = 8;

controls.target.set(0,0,0);

controls.update();

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

        judulBox.innerHTML=judul;

    }


    if(isiBox){

        isiBox.innerHTML=isi;

    }

}



// ======================================
// GARIS RUSUK
// ======================================

function tambahGaris(geometry){


    let garis =
    new THREE.EdgesGeometry(
        geometry
    );


    let material =
    new THREE.LineBasicMaterial({

        color:0x000000

    });



    let outline =
    new THREE.LineSegments(
        garis,
        material
    );


    cube.add(outline);


}



// ======================================
// TITIK SUDUT
// ======================================

function tambahTitikSudut(data){


    let material =
    new THREE.MeshBasicMaterial({

        color:0xff0000

    });



    data.forEach(function(p){


        let titik =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.08,
                16,
                16
            ),

            material

        );



        titik.position.set(
            p[0],
            p[1],
            p[2]
        );



        cube.add(titik);


    });


}



// ======================================
// KUBUS
// ======================================

function tampilKubus(){


scene.clear();


let geometry =
new THREE.BoxGeometry(
2,2,2
);


let materials = [

new THREE.MeshBasicMaterial({color:0x2196f3}), // kanan (biru)

new THREE.MeshBasicMaterial({color:0x4caf50}), // kiri (hijau)

new THREE.MeshBasicMaterial({color:0xffeb3b}), // atas (kuning)

new THREE.MeshBasicMaterial({color:0xf44336}), // bawah (merah)

new THREE.MeshBasicMaterial({color:0x9c27b0}), // depan (ungu)

new THREE.MeshBasicMaterial({color:0xff9800})  // belakang (oranye)

];

cube =
new THREE.Mesh(
geometry,
materials
);


scene.add(cube);



tambahGaris(
geometry
);



tambahTitikSudut([

[-1,-1,-1],
[1,-1,-1],

[-1,1,-1],
[1,1,-1],

[-1,-1,1],
[1,-1,1],

[-1,1,1],
[1,1,1]

]);



ubahMateri(
"Kubus",

`
<ul>
<li>⬜ Sisi : 6</li>
<li>📏 Rusuk : 12</li>
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



tambahGaris(
geometry
);



tambahTitikSudut([

[-1.5,-0.75,-0.5],
[1.5,-0.75,-0.5],

[-1.5,0.75,-0.5],
[1.5,0.75,-0.5],

[-1.5,-0.75,0.5],
[1.5,-0.75,0.5],

[-1.5,0.75,0.5],
[1.5,0.75,0.5]

]);



ubahMateri(
"Balok",

`
<ul>
<li>⬜ Sisi : 6</li>
<li>📏 Rusuk : 12</li>
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



tambahGaris(
    geometry
);



// Titik sudut prisma sesuai posisi geometry

let tinggi = 1;

let radius = 1;



let titikPrisma = [

    [
        radius * Math.cos(Math.PI/2),
        tinggi,
        radius * Math.sin(Math.PI/2)
    ],


    [
        radius * Math.cos(Math.PI/2 + (2*Math.PI/3)),
        tinggi,
        radius * Math.sin(Math.PI/2 + (2*Math.PI/3))
    ],


    [
        radius * Math.cos(Math.PI/2 + (4*Math.PI/3)),
        tinggi,
        radius * Math.sin(Math.PI/2 + (4*Math.PI/3))
    ],



    [
        radius * Math.cos(Math.PI/2),
        -tinggi,
        radius * Math.sin(Math.PI/2)
    ],


    [
        radius * Math.cos(Math.PI/2 + (2*Math.PI/3)),
        -tinggi,
        radius * Math.sin(Math.PI/2 + (2*Math.PI/3))
    ],


    [
        radius * Math.cos(Math.PI/2 + (4*Math.PI/3)),
        -tinggi,
        radius * Math.sin(Math.PI/2 + (4*Math.PI/3))
    ]

];



tambahTitikSudut(
    titikPrisma
);



ubahMateri(

"Prisma Segitiga",

`
<ul>
<li>🔺 Sisi : 5</li>
<li>📏 Rusuk : 9</li>
<li>🔴 Titik sudut : 6</li>
<li>📐 Volume = luas alas × tinggi</li>
</ul>
`

);


}





// ======================================
// TABUNG
// ======================================

function tampilTabung(){


scene.clear();



let geometry =
new THREE.CylinderGeometry(

1,
1,
2,
32

);



let material =
new THREE.MeshBasicMaterial({

color:0x4caf50

});



cube =
new THREE.Mesh(
geometry,
material
);



scene.add(cube);



tambahGaris(
geometry
);



ubahMateri(

"Tabung",

`
<ul>
<li>🟢 Sisi : 3</li>
<li>📏 Rusuk : 2 rusuk lengkung</li>
<li>🔵 Titik sudut : 0</li>
<li>📐 Volume = π × r² × t</li>
</ul>
`

);


}





// ======================================
// KERUCUT
// ======================================

function tampilKerucut(){


scene.clear();



let geometry =
new THREE.ConeGeometry(

1,
2,
32

);



let material =
new THREE.MeshBasicMaterial({

color:0xffc107

});



cube =
new THREE.Mesh(
geometry,
material
);



scene.add(cube);



tambahGaris(
geometry
);



ubahMateri(

"Kerucut",

`
<ul>
<li>🟡 Sisi : 2</li>
<li>📏 Rusuk : 1 rusuk lengkung</li>
<li>🔵 Titik sudut : 1</li>
<li>📐 Volume = ⅓ × π × r² × t</li>
</ul>
`

);


}





// ======================================
// BOLA
// ======================================

function tampilBola(){


scene.clear();



let geometry =
new THREE.SphereGeometry(

1,

32,

32

);



let material =
new THREE.MeshBasicMaterial({

color:0xffffff

});



cube =
new THREE.Mesh(
geometry,
material
);



scene.add(cube);



tambahGaris(
geometry
);



ubahMateri(

"Bola",

`
<ul>
<li>⚪ Sisi : 1 sisi lengkung</li>
<li>📏 Rusuk : 0</li>
<li>🔵 Titik sudut : 0</li>
<li>📐 Volume = 4/3 × π × r³</li>
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

if(controls){

    controls.update();

}

// if(cube){

//     cube.rotation.x +=0.002;

//     cube.rotation.y +=0.002;

// }



if(renderer && scene && camera){


renderer.render(

scene,

camera

);


}


}

// ======================================
// RESPONSIVE SAAT UKURAN LAYAR BERUBAH
// ======================================

window.addEventListener("resize", function(){

    if(!renderer || !camera) return;

    let tempat =
    document.getElementById("canvas3D");

    let lebar =
    tempat.clientWidth;

    let tinggi =
    tempat.clientHeight;

    camera.aspect =
    lebar / tinggi;

    camera.updateProjectionMatrix();

    renderer.setSize(
        lebar,
        tinggi
    );

});



// ======================================
// MULAI APLIKASI
// ======================================



window.onload = function(){

    buatCanvas();

    tampilKubus();

};
