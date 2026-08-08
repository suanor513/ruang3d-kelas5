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



let skalaBalok = window.innerWidth <= 700 ? 0.6 : 1;

let geometry =
new THREE.BoxGeometry(
3 * skalaBalok,
1.5 * skalaBalok,
1 * skalaBalok
);



// ======================================
// WARNA SETIAP SISI BALOK
// ======================================

let materials = [

new THREE.MeshBasicMaterial({ color:0x2196f3 }), // Kanan - Biru

new THREE.MeshBasicMaterial({ color:0x4caf50 }), // Kiri - Hijau

new THREE.MeshBasicMaterial({ color:0xffeb3b }), // Atas - Kuning

new THREE.MeshBasicMaterial({ color:0xf44336 }), // Bawah - Merah

new THREE.MeshBasicMaterial({ color:0x9c27b0 }), // Depan - Ungu

new THREE.MeshBasicMaterial({ color:0xff9800 })  // Belakang - Oranye

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

[-1.5 * skalaBalok,-0.75 * skalaBalok,-0.5 * skalaBalok],
[1.5 * skalaBalok,-0.75 * skalaBalok,-0.5 * skalaBalok],

[-1.5 * skalaBalok,0.75 * skalaBalok,-0.5 * skalaBalok],
[1.5 * skalaBalok,0.75 * skalaBalok,-0.5 * skalaBalok],

[-1.5 * skalaBalok,-0.75 * skalaBalok,0.5 * skalaBalok],
[1.5 * skalaBalok,-0.75 * skalaBalok,0.5 * skalaBalok],

[-1.5 * skalaBalok,0.75 * skalaBalok,0.5 * skalaBalok],
[1.5 * skalaBalok,0.75 * skalaBalok,0.5 * skalaBalok]

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

    // ==================================
    // GROUP PRISMA
    // ==================================

    let prisma = new THREE.Group();

    cube = prisma;

    scene.add(prisma);


    // ==================================
    // UKURAN PRISMA
    // ==================================

    let tinggi = 2.4;

    
    // ==================================
    // TITIK-TITIK PRISMA
    // ==================================

    let A = new THREE.Vector3(
        0,
        1.2,
        1
    );

    let B = new THREE.Vector3(
        -0.8,
        -1.2,
        1
    );

    let C = new THREE.Vector3(
        0.8,
        -1.2,
        1
    );


    let D = new THREE.Vector3(
        0,
        1.2,
        -1
    );

    let E = new THREE.Vector3(
        -0.8,
        -1.2,
        -1
    );

    let F = new THREE.Vector3(
        0.8,
        -1.2,
        -1
    );


    // ==================================
    // MATERIAL
    // ==================================

    let merah =
    new THREE.MeshBasicMaterial({
        color:0xf44336,
        side:THREE.DoubleSide
    });


    let biru =
    new THREE.MeshBasicMaterial({
        color:0x2196f3,
        side:THREE.DoubleSide
    });


    let hijau =
    new THREE.MeshBasicMaterial({
        color:0x4caf50,
        side:THREE.DoubleSide
    });


    let kuning =
    new THREE.MeshBasicMaterial({
        color:0xffeb3b,
        side:THREE.DoubleSide
    });


    // ==================================
    // SISI SEGITIGA DEPAN
    // ==================================

    let segitigaDepan =
    new THREE.BufferGeometry();

    segitigaDepan.setFromPoints([
        A,
        B,
        C
    ]);

    let meshDepan =
    new THREE.Mesh(
        segitigaDepan,
        merah
    );

    prisma.add(meshDepan);


    // ==================================
    // SISI SEGITIGA BELAKANG
    // ==================================

    let segitigaBelakang =
    new THREE.BufferGeometry();

    segitigaBelakang.setFromPoints([
        D,
        F,
        E
    ]);

    let meshBelakang =
    new THREE.Mesh(
        segitigaBelakang,
        merah
    );

    prisma.add(meshBelakang);


    // ==================================
    // SISI PERSEGI PANJANG 1
    // ==================================

    let sisi1 =
    new THREE.BufferGeometry();

    sisi1.setFromPoints([
        A,
        D,
        E,
        A,
        E,
        B
    ]);

    let meshSisi1 =
    new THREE.Mesh(
        sisi1,
        biru
    );

    prisma.add(meshSisi1);


    // ==================================
    // SISI PERSEGI PANJANG 2
    // ==================================

    let sisi2 =
    new THREE.BufferGeometry();

    sisi2.setFromPoints([
        B,
        E,
        F,
        B,
        F,
        C
    ]);

    let meshSisi2 =
    new THREE.Mesh(
        sisi2,
        hijau
    );

    prisma.add(meshSisi2);


    // ==================================
    // SISI PERSEGI PANJANG 3
    // ==================================

    let sisi3 =
    new THREE.BufferGeometry();

    sisi3.setFromPoints([
        C,
        F,
        D,
        C,
        D,
        A
    ]);

    let meshSisi3 =
    new THREE.Mesh(
        sisi3,
        kuning
    );

    prisma.add(meshSisi3);


    // ==================================
    // GARIS RUSUK
    // ==================================

    let garisMaterial =
    new THREE.LineBasicMaterial({
        color:0x000000
    });


    function garis(a,b){

        let geometry =
        new THREE.BufferGeometry();

        geometry.setFromPoints([
            a,
            b
        ]);

        let line =
        new THREE.Line(
            geometry,
            garisMaterial
        );

        prisma.add(line);

    }


    // Segitiga depan

    garis(A,B);
    garis(B,C);
    garis(C,A);


    // Segitiga belakang

    garis(D,E);
    garis(E,F);
    garis(F,D);


    // Rusuk penghubung

    garis(A,D);
    garis(B,E);
    garis(C,F);


    // ==================================
    // TITIK SUDUT
    // ==================================

    let titikMaterial =
    new THREE.MeshBasicMaterial({
        color:0xff0000
    });


    let titikData = [
        A,B,C,D,E,F
    ];


    titikData.forEach(function(p){

        let titik =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.09,
                16,
                16
            ),

            titikMaterial

        );


        titik.position.copy(p);

        prisma.add(titik);

    });


    // ==================================
    // MATERI
    // ==================================

    ubahMateri(

        "Prisma Segitiga",

        `
        <ul>
        <li>🔺 Sisi : 5</li>
        <li>📏 Rusuk : 9</li>
        <li>🔴 Titik sudut : 6</li>
        <li>📐 Volume = luas alas × tinggi prisma</li>
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



// ======================================
// WARNA TABUNG
// ======================================

let materials = [

new THREE.MeshBasicMaterial({ color:0x4caf50 }), // Selimut (Hijau)

new THREE.MeshBasicMaterial({ color:0x2196f3 }), // Tutup Atas (Biru)

new THREE.MeshBasicMaterial({ color:0xff9800 })  // Alas Bawah (Oranye)

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

    // ==================================
    // SELIMUT KERUCUT
    // ==================================

    let geometry =
    new THREE.ConeGeometry(
        1,
        2,
        32
    );

    let material =
    new THREE.MeshBasicMaterial({
        color:0xffeb3b
    });

    cube =
    new THREE.Mesh(
        geometry,
        material
    );

    scene.add(cube);


    // ==================================
    // ALAS KERUCUT
    // ==================================

    let alasGeometry =
    new THREE.CircleGeometry(
        1,
        32
    );

    let alasMaterial =
    new THREE.MeshBasicMaterial({
        color:0x4caf50,
        side:THREE.DoubleSide
    });

    let alas =
    new THREE.Mesh(
        alasGeometry,
        alasMaterial
    );


    // Posisi alas di bawah kerucut
    alas.rotation.x = -Math.PI / 2;

    alas.position.y = -1;

    cube.add(alas);


    // ==================================
    // GARIS KERUCUT
    // ==================================

    tambahGaris(
        geometry
    );


    // ==================================
    // MATERI
    // ==================================

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

    // ==================================
    // BENTUK BOLA
    // ==================================

    let geometry =
    new THREE.SphereGeometry(
        1,
        32,
        32
    );


    // ==================================
    // WARNA BOLA
    // ==================================

    let material =
    new THREE.MeshBasicMaterial({
        color:0x90caf9
    });


    cube =
    new THREE.Mesh(
        geometry,
        material
    );


    scene.add(cube);


    // ==================================
    // GARIS PERMUKAAN
    // ==================================

    tambahGaris(
        geometry
    );


    // ==================================
    // MATERI
    // ==================================

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

let skorKuis = 0;
let nomorSoal = 1;


function tampilKuis(){

let kuisBox =
document.getElementById("kuis");

kuisBox.innerHTML = `

<h2>⭐ Kuis Bangun Ruang</h2>

<p>
Bangun ruang yang memiliki 6 sisi berbentuk persegi adalah ...
</p>

<button onclick="cekJawaban('kubus')">
🧊 Kubus
</button>

<button onclick="cekJawaban('tabung')">
🛢️ Tabung
</button>

<button onclick="cekJawaban('bola')">
🔵 Bola
</button>

<button onclick="cekJawaban('kerucut')">
🟡 Kerucut
</button>

<p id="hasilKuis"></p>

`;

}


// ======================================
// CEK JAWABAN SOAL 1
// ======================================

function cekJawaban(jawaban){

let hasil =
document.getElementById("hasilKuis");


if(jawaban === "kubus"){

skorKuis++;

hasil.innerHTML =
"✅ Benar! Jawabannya adalah Kubus. Skor: "
+ skorKuis +
"<br><br><button onclick='soalBerikutnya()'>Soal Berikutnya</button>";

}else{

hasil.innerHTML =
"❌ Belum tepat. Coba lagi! Skor: "
+ skorKuis +
"<br><br><button onclick='soalBerikutnya()'>Soal Berikutnya</button>";

}

}


// ======================================
// SOAL BERIKUTNYA
// ======================================

function soalBerikutnya(){

nomorSoal++;

let kuisBox =
document.getElementById("kuis");


kuisBox.innerHTML = `

<h2>⭐ Kuis Bangun Ruang</h2>

<p>
Bangun ruang yang memiliki 2 sisi berbentuk lingkaran dan 1 sisi lengkung adalah ...
</p>


<button onclick="cekJawaban2('tabung')">
🛢️ Tabung
</button>


<button onclick="cekJawaban2('bola')">
🔵 Bola
</button>


<button onclick="cekJawaban2('kubus')">
🧊 Kubus
</button>


<button onclick="cekJawaban2('prisma')">
🔷 Prisma
</button>


<p id="hasilKuis"></p>

`;

}


// ======================================
// CEK JAWABAN SOAL 2
// ======================================

function cekJawaban2(jawaban){

let hasil =
document.getElementById("hasilKuis");


if(jawaban === "tabung"){

skorKuis++;

hasil.innerHTML =
"✅ Benar! Jawabannya adalah Tabung. Skor: "
+ skorKuis;

}else{

hasil.innerHTML =
"❌ Belum tepat. Jawaban yang benar adalah Tabung. Skor: "
+ skorKuis;

}

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
