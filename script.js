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
// LABEL 3D DENGAN TANDA PANAH
// ======================================

function tambahLabel3D(teks, posisi, target){

    // ==================================
    // TULISAN LABEL
    // ==================================

    let canvas =
    document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 64;

    let ctx =
    canvas.getContext("2d");

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "black";

    ctx.fillText(
        teks,
        10,
        40
    );

    let texture =
    new THREE.CanvasTexture(canvas);

    let material =
    new THREE.SpriteMaterial({
        map: texture,
        transparent: true
    });

    let label =
    new THREE.Sprite(material);

    label.scale.set(
        1.15,
        0.3,
        1
    );

   label.position.set(
    posisi[0],
    posisi[1],
    posisi[2]
);

    cube.add(label);


    // ==================================
    // GARIS PANAH
    // ==================================

    let arah =
    new THREE.Vector3(
        target[0] - posisi[0],
        target[1] - posisi[1],
        target[2] - posisi[2]
    );

    let panjang =
    arah.length();

    arah.normalize();


    // ==================================
    // GARIS UTAMA PANAH
    // ==================================

    let lineMaterial =
    new THREE.LineBasicMaterial({
        color:0x000000
    });


    let points = [

    new THREE.Vector3(
        posisi[0],
        posisi[1],
        posisi[2]
    ),

    new THREE.Vector3(
        target[0],
        target[1],
        target[2]
    )

];

    let lineGeometry =
    new THREE.BufferGeometry()
    .setFromPoints(points);


    let line =
    new THREE.Line(
        lineGeometry,
        lineMaterial
    );

    cube.add(line);


    // ==================================
    // UJUNG PANAH
    // ==================================

    let arrowLength =
    Math.min(
        0.18,
        panjang * 0.2
    );

    let arrowWidth =
    arrowLength * 0.6;


    let coneGeometry =
    new THREE.ConeGeometry(
        arrowWidth,
        arrowLength,
        8
    );


    let coneMaterial =
    new THREE.MeshBasicMaterial({
        color:0x000000
    });


    let arrowHead =
    new THREE.Mesh(
        coneGeometry,
        coneMaterial
    );


    // ==================================
    // ARAHKAN UJUNG CONE KE TARGET
    // ==================================

    arrowHead.position.set(
        target[0],
        target[1],
        target[2]
    );


    arrowHead.quaternion.setFromUnitVectors(

        new THREE.Vector3(
            0,
            1,
            0
        ),

        arah

    );


    cube.add(arrowHead);

}
// ======================================
// KUBUS
// ======================================

function tampilKubus(){

    scene.clear();

    // ==================================
    // SEMBUNYIKAN SLIDER JARING-JARING
    // ==================================

let kontrolJaring3D =
    document.getElementById("kontrolJaring3D");

if(kontrolJaring3D){

    kontrolJaring3D.style.display = "none";

}

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

tambahLabel3D(
    "Titik Sudut",
    [1.35, 1.15, 1],
    [1, 1, 1]
);

tambahLabel3D(
    "Sisi",
    [-1.55, 0, 0],
    [-1, 0, 0]
);

tambahLabel3D(
    "Rusuk",
    [1.45, -1.05, 0.8],
    [1, -1, 0]
);

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

scrollKeTampilan();


}

// ======================================
// JARING-JARING KUBUS 3D
// ======================================

let panelJaringKubus = [];
let animasiJaringKubus = false;
let jaringKubusTerbuka = true;
let sedangAnimasiJaringKubus = false;
let dataJaringKubus = [];
let kecepatanJaringKubus = 700;

// ======================================
// TAMPILKAN JARING-JARING KUBUS
// ======================================

function tampilJaringKubus(){

    scene.clear();
let kontrolJaring3D =
    document.getElementById("kontrolJaring3D");

if(kontrolJaring3D){

    kontrolJaring3D.style.display = "block";

}

jenisJaring3DAktif = "kubus";
    panelJaringKubus = [];
    dataJaringKubus = [];

    jaringKubusTerbuka = true;
    sedangAnimasiJaringKubus = false;


    // ==================================
    // GROUP UTAMA
    // ==================================

    let root =
    new THREE.Group();

    // Agar kubus saat tertutup tetap berada
    // di sekitar titik tengah tampilan
    root.position.z = -0.5;

    scene.add(root);


    // ==================================
    // UKURAN SISI
    // ==================================

    let ukuran = 1;


    // ==================================
    // FUNGSI MEMBUAT SISI
    // ==================================

    function buatPanel(warna){

        let geometry =
        new THREE.PlaneGeometry(
            ukuran,
            ukuran
        );


        let material =
        new THREE.MeshBasicMaterial({
            color:warna,
            side:THREE.DoubleSide
        });


        let sisi =
        new THREE.Mesh(
            geometry,
            material
        );


        // ==================================
        // GARIS TEPI HITAM
        // ==================================

        let garisGeometry =
        new THREE.EdgesGeometry(
            geometry
        );


        let garisMaterial =
        new THREE.LineBasicMaterial({
            color:0x000000
        });


        let garis =
        new THREE.LineSegments(
            garisGeometry,
            garisMaterial
        );


        sisi.add(garis);


        panelJaringKubus.push(sisi);


        return sisi;

    }


    // ==================================
    // FUNGSI MEMBUAT ENGSEL
    // ==================================

    function buatEngsel(
        pivotX,
        pivotY,
        sisiX,
        sisiY,
        warna,
        sumbu,
        sudutTutup,
        parent
    ){

        let pivot =
        new THREE.Group();


        pivot.position.set(
            pivotX,
            pivotY,
            0
        );


        parent.add(pivot);


        let sisi =
        buatPanel(warna);


        sisi.position.set(
            sisiX,
            sisiY,
            0
        );


        pivot.add(sisi);


        dataJaringKubus.push({

            pivot:pivot,

            sumbu:sumbu,

            sudutBuka:0,

            sudutTutup:sudutTutup

        });


        return pivot;

    }


    // ==================================
    // SISI TENGAH
    // ==================================

    let sisiTengah =
    buatPanel(
        0x2196f3
    );


    sisiTengah.position.set(
        0,
        0,
        0
    );


    root.add(
        sisiTengah
    );


    // ==================================
    // SISI ATAS
    // ==================================

    buatEngsel(

        0,
        0.5,

        0,
        0.5,

        0x4caf50,

        "x",

        Math.PI / 2,

        root

    );


    // ==================================
    // SISI BAWAH
    // ==================================

    buatEngsel(

        0,
        -0.5,

        0,
        -0.5,

        0xffeb3b,

        "x",

        -Math.PI / 2,

        root

    );


    // ==================================
    // SISI KIRI
    // ==================================

    buatEngsel(

        -0.5,
        0,

        -0.5,
        0,

        0xf44336,

        "y",

        Math.PI / 2,

        root

    );


    // ==================================
    // SISI KANAN
    // ==================================

    buatEngsel(

        0.5,
        0,

        0.5,
        0,

        0x9c27b0,

        "y",

        -Math.PI / 2,

        root

    );


    // ==================================
    // SISI PALING BAWAH
    // ==================================

    let engselBawah =
    new THREE.Group();


    engselBawah.position.set(
        0,
        -1,
        0
    );


    // Engsel ini menjadi anak
    // dari sisi bawah

    let pivotSisiBawah =
    root.children[2];


    pivotSisiBawah.add(
        engselBawah
    );


    let sisiPalingBawah =
    buatPanel(
        0xff9800
    );


    sisiPalingBawah.position.set(
        0,
        -0.5,
        0
    );


    engselBawah.add(
        sisiPalingBawah
    );


    dataJaringKubus.push({

        pivot:engselBawah,

        sumbu:"x",

        sudutBuka:0,

        sudutTutup:-Math.PI / 2

    });


    // ==================================
    // MATERI
    // ==================================

    ubahMateri(

    "Jaring-Jaring Kubus",

    `
    

    <ul>
    <li>⬜ Terdiri dari 6 persegi</li>
    <li>📏 Semua sisi memiliki ukuran sama</li>
    <li>🔓 Geser ke kiri untuk membuka</li>
    <li>🔒 Geser ke kanan untuk menutup</li>
    </ul>
    `

);

scrollKeTampilan();}

// ======================================
// BUKA / TUTUP JARING-JARING KUBUS
// ======================================

function toggleJaringKubus(){

    if(
        sedangAnimasiJaringKubus ||
        dataJaringKubus.length === 0
    ){
        return;
    }


    sedangAnimasiJaringKubus = true;


    let targetTerbuka =
        !jaringKubusTerbuka;


    let durasi = kecepatanJaringKubus;

    let waktuMulai =
        performance.now();


    let posisiAwal =
        dataJaringKubus.map(
            function(data){

                return data.pivot.rotation[
                    data.sumbu
                ];

            }
        );


    function animasi(waktuSekarang){

        let perkembangan =
            (waktuSekarang - waktuMulai)
            / durasi;


        if(perkembangan > 1){
            perkembangan = 1;
        }


        // Gerakan lebih halus
        let halus =
            perkembangan *
            perkembangan *
            (3 - 2 * perkembangan);


        dataJaringKubus.forEach(

            function(data, index){

                let target =
                    targetTerbuka
                    ? data.sudutBuka
                    : data.sudutTutup;


                let awal =
                    posisiAwal[index];


                data.pivot.rotation[
                    data.sumbu
                ] =
                    awal +
                    (target - awal) *
                    halus;

            }

        );


        if(perkembangan < 1){

            requestAnimationFrame(
                animasi
            );

        }else{

            jaringKubusTerbuka =
                targetTerbuka;

            sedangAnimasiJaringKubus =
                false;


            let tombol =
                document.getElementById(
                    "tombolJaringKubus"
                );


            if(tombol){

                tombol.textContent =
                    jaringKubusTerbuka
                    ? "Tutup Jaring-Jaring"
                    : "Buka Jaring-Jaring";

            }

        }

    }


    requestAnimationFrame(
        animasi
    );

}
// ======================================
// KONTROL SLIDER BUKA - TUTUP
// ======================================

function aturJaringKubus(nilai){

    if(dataJaringKubus.length === 0){
        return;
    }

    dataJaringKubus.forEach(
        function(data){

            let sudut =
                data.sudutBuka +
                (
                    data.sudutTutup -
                    data.sudutBuka
                ) * nilai;

            data.pivot.rotation[
                data.sumbu
            ] = sudut;

        }
    );

    if(nilai <= 0){

        jaringKubusTerbuka = true;

    }else if(nilai >= 1){

        jaringKubusTerbuka = false;

    }

}

// ======================================
// SLIDER UNIVERSAL JARING-JARING 3D
// ======================================

// ======================================
// SLIDER UNIVERSAL JARING-JARING 3D
// ======================================

function aturJaring3D(nilai){

    // ==================================
    // JARING-JARING KUBUS
    // ==================================

    if(jenisJaring3DAktif === "kubus"){

        aturJaringKubus(nilai);

        return;

    }


    // ==================================
    // JARING-JARING BALOK
    // ==================================

    if(jenisJaring3DAktif === "balok"){

        if(dataJaringBalok3D.length === 0){

            return;

        }

        dataJaringBalok3D.forEach(
            function(data){

                let sudut =
                    data.sudutBuka +
                    (
                        data.sudutTutup -
                        data.sudutBuka
                    ) * nilai;

                data.pivot.rotation[
                    data.sumbu
                ] = sudut;

            }
        );

        if(nilai <= 0){

            jaringBalok3DTerbuka = true;

        }else if(nilai >= 1){

            jaringBalok3DTerbuka = false;

        }

    }

}
// ======================================
// SCROLL OTOMATIS KE BANGUN RUANG
// ======================================

function scrollKeTampilan(){

    document.getElementById("canvas3D").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

// ======================================
// BALOK
// ======================================

function tampilBalok(){


scene.clear();

// ==================================
// SEMBUNYIKAN SLIDER JARING-JARING
// ==================================

let kontrolJaring3D =
    document.getElementById("kontrolJaring3D");

if(kontrolJaring3D){

    kontrolJaring3D.style.display = "none";

}

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

// ======================================
// LABEL BALOK
// ======================================

tambahLabel3D(
    "Titik Sudut",
    [2.0 * skalaBalok, 1.0 * skalaBalok, 0.5 * skalaBalok],
    [1.5 * skalaBalok, 0.75 * skalaBalok, 0.5 * skalaBalok]
);

tambahLabel3D(
    "Sisi",
    [-2.0 * skalaBalok, 0, 0],
    [-1.5 * skalaBalok, 0, 0]
);

tambahLabel3D(
    "Rusuk",
    [1.8 * skalaBalok, -1.0 * skalaBalok, 0],
    [1.5 * skalaBalok, -0.75 * skalaBalok, 0]
);    

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

scrollKeTampilan();
}

// ======================================
// JARING-JARING BALOK
// ======================================

function tampilJaringBalok(){

    let kuisBox =
    document.getElementById("kuis");

    kuisBox.innerHTML = `

    <h2>🧩 Jaring-Jaring Balok</h2>

    <button onclick="bukaJaringBalok()">
        👁️ Buka Jaring-Jaring
    </button>

    <div id="jaringBalok"></div>

    `;

}
// ======================================
// BUKA JARING-JARING BALOK
// ======================================

function bukaJaringBalok(){

    let area =
    document.getElementById("jaringBalok");

    area.innerHTML = `

    <p>
    Jaring-jaring balok terdiri dari 6 sisi.
    </p>

    <svg
        viewBox="0 0 600 400"
        width="100%"
        style="max-width:600px; display:block; margin:20px auto;"
    >

        <rect
            x="60" y="140"
            width="100" height="120"
            fill="#2196f3"
            stroke="#222"
            stroke-width="3"
        />

        <rect
            x="160" y="140"
            width="180" height="120"
            fill="#4caf50"
            stroke="#222"
            stroke-width="3"
        />

        <rect
            x="340" y="140"
            width="100" height="120"
            fill="#1976d2"
            stroke="#222"
            stroke-width="3"
        />

        <rect
            x="440" y="140"
            width="100" height="120"
            fill="#ff9800"
            stroke="#222"
            stroke-width="3"
        />

        <rect
            x="160" y="20"
            width="180" height="120"
            fill="#ffeb3b"
            stroke="#222"
            stroke-width="3"
        />

        <rect
            x="160" y="260"
            width="180" height="120"
            fill="#f44336"
            stroke="#222"
            stroke-width="3"
        />

    </svg>

    <button onclick="tutupJaringBalok()">
        ❌ Tutup Jaring-Jaring
    </button>

    `;

}

// ======================================
// TUTUP JARING-JARING BALOK
// ======================================

function tutupJaringBalok(){

    let area =
    document.getElementById("jaringBalok");

    area.innerHTML = "";

}

// ======================================
// JARING-JARING BALOK 3D
// TAHAP 1
// ======================================

let panelJaringBalok3D = [];
let dataJaringBalok3D = [];
let jaringBalok3DTerbuka = true;

let jenisJaring3DAktif = "";

// ======================================
// JARING-JARING PRISMA SEGITIGA 3D
// ======================================

let panelJaringPrisma3D = [];
let dataJaringPrisma3D = [];
let jaringPrisma3DTerbuka = true;

// ======================================
// TAMPILKAN JARING-JARING PRISMA SEGITIGA 3D
// ======================================

function tampilJaringPrisma3D(){

    scene.clear();

    // ==================================
    // AKTIFKAN SLIDER JARING-JARING 3D
    // ==================================

    let kontrolJaring3D =
        document.getElementById("kontrolJaring3D");

    if(kontrolJaring3D){

        kontrolJaring3D.style.display = "block";

    }

    jenisJaring3DAktif = "prisma";

    // ==================================
    // RESET DATA JARING-JARING
    // ==================================

    panelJaringPrisma3D = [];
    dataJaringPrisma3D = [];

    jaringPrisma3DTerbuka = true;

    // ==================================
    // GROUP UTAMA
    // ==================================

    let root =
        new THREE.Group();

    scene.add(root);

    // ==================================
    // UKURAN JARING-JARING
    // ==================================

    let panjang = 2;
    let tinggi = 1.5;

    // ==================================
    // FUNGSI PANEL PERSEGI PANJANG
    // ==================================

    function buatPanelPrisma(
        ukuranX,
        ukuranY,
        warna
    ){

        let geometry =
            new THREE.PlaneGeometry(
                ukuranX,
                ukuranY
            );

        let material =
            new THREE.MeshBasicMaterial({
                color:warna,
                side:THREE.DoubleSide
            });

        let panel =
            new THREE.Mesh(
                geometry,
                material
            );

        let garisGeometry =
            new THREE.EdgesGeometry(
                geometry
            );

        let garisMaterial =
            new THREE.LineBasicMaterial({
                color:0x000000
            });

        let garis =
            new THREE.LineSegments(
                garisGeometry,
                garisMaterial
            );

        panel.add(garis);

        panelJaringPrisma3D.push(panel);

        return panel;

    }

// ==================================
// FUNGSI PANEL SEGITIGA
// ==================================

function buatSegitigaPrisma(
    warna
){

    let geometry =
        new THREE.BufferGeometry();

    let vertices = new Float32Array([

         0,  1.2, 0,
        -0.8, -1.2, 0,
         0.8, -1.2, 0

    ]);

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            vertices,
            3
        )
    );

    geometry.computeVertexNormals();

    let material =
        new THREE.MeshBasicMaterial({
            color:warna,
            side:THREE.DoubleSide
        });

    let segitiga =
        new THREE.Mesh(
            geometry,
            material
        );

    let garisGeometry =
        new THREE.BufferGeometry();

    garisGeometry.setFromPoints([

        new THREE.Vector3(0, 1.2, 0),
        new THREE.Vector3(-0.8, -1.2, 0),
        new THREE.Vector3(0.8, -1.2, 0),
        new THREE.Vector3(0, 1.2, 0)

    ]);

    let garisMaterial =
        new THREE.LineBasicMaterial({
            color:0x000000
        });

    let garis =
        new THREE.Line(
            garisGeometry,
            garisMaterial
        );

    segitiga.add(garis);

    panelJaringPrisma3D.push(segitiga);

    return segitiga;

}

    // ==================================
    // FUNGSI ENGSEL PRISMA SEGITIGA
    // ==================================

    function buatEngselPrisma3D(
        pivotX,
        pivotY,
        sisiX,
        sisiY,
        ukuranX,
        ukuranY,
        warna,
        sumbu,
        sudutTutup,
        parent
    ){

        let pivot =
            new THREE.Group();

        pivot.position.set(
            pivotX,
            pivotY,
            0
        );

        parent.add(pivot);

        let sisi =
            buatPanelPrisma(
                ukuranX,
                ukuranY,
                warna
            );

        sisi.position.set(
            sisiX,
            sisiY,
            0
        );

        pivot.add(sisi);

        dataJaringPrisma3D.push({

            pivot:pivot,

            sumbu:sumbu,

            sudutBuka:0,

            sudutTutup:sudutTutup

        });

        return pivot;

    }
    
    // ==================================
    // 3 SISI PERSEGI PANJANG
    // ==================================

    // Panjang sisi segitiga:
    // AB = CA ≈ 2.53
    // BC = 1.6

// ==================================
// SISI 1 - BIRU
// ==================================

buatEngselPrisma3D(

    -0.8,
    0,

    -1.265,
    0,

    2.53,
    2,

    0x2196f3,

    "y",

    Math.PI / 2,

    root

);

    // ==================================
    // SISI 2 - TENGAH
    // ==================================

    let sisi2 =
        buatPanelPrisma(
            1.6,
            2,
            0x4caf50
        );

    sisi2.position.set(
        0,
        0,
        0
    );

    root.add(sisi2);


    // ==================================
    // SISI 3
    // ==================================

    let sisi3 =
        buatPanelPrisma(
            2.53,
            2,
            0xffeb3b
        );

    sisi3.position.set(
        2.065,
        0,
        0
    );

    root.add(sisi3);

// ==================================
    // SEGITIGA 1
    // ==================================

    let segitiga1 =
        buatSegitigaPrisma(
            0xf44336
        );

    segitiga1.position.set(
    0,
    2.2,
    0
);

    root.add(segitiga1);

// ==================================
    // SEGITIGA 2
    // ==================================

    let segitiga2 =
        buatSegitigaPrisma(
            0xf44336
        );

    segitiga2.position.set(
    0,
    -2.2,
    0
);

segitiga2.rotation.z = Math.PI;

    root.add(segitiga2);    
    
}  

// ======================================
// TAMPILKAN JARING-JARING BALOK 3D
// TAHAP 2
// ======================================

function tampilJaringBalok3D(){

    scene.clear();

    // ==================================
    // AKTIFKAN SLIDER JARING-JARING 3D
    // ==================================

    let kontrolJaring3D =
        document.getElementById("kontrolJaring3D");

    if(kontrolJaring3D){

        kontrolJaring3D.style.display = "block";

    }

    jenisJaring3DAktif = "balok";

    panelJaringBalok3D = [];
    dataJaringBalok3D = [];

    jaringBalok3DTerbuka = true;

    let root =
        new THREE.Group();

    root.position.set(
        -1.5,
        0,
        -0.5
    );

    scene.add(root);
    
    // ==================================
// 4 SISI UTAMA
// ==================================

// ==================================
// SISI KIRI
// ==================================

buatEngselBalok3D(

    -1.5,
    0,

    -0.75,
    0,

    1.5,
    1,

    0x2196f3,

    "y",

    Math.PI / 2,

    root

);


// SISI DEPAN
let depan =
    buatPanelBalok3D(
        3,
        1,
        0x4caf50
    );

depan.position.set(
    0,
    0,
    0
);

root.add(depan);


// ==================================
// SISI KANAN / UNGU
// ==================================

let pivotKanan =
    buatEngselBalok3D(

        1.5,
        0,

        0.75,
        0,

        1.5,
        1,

        0x9c27b0,

        "y",

        -Math.PI / 2,

        root

    );

// ==================================
// SISI BELAKANG / ORANYE
// ==================================

let pivotBelakang =
    buatEngselBalok3D(

        1.5,
        0,

        1.5,
        0,

        3,
        1,

        0xff9800,

        "y",

        -Math.PI / 2,

        pivotKanan

    );
    
// ==================================
// SISI ATAS
// ==================================

buatEngselBalok3D(

    0,
    0.5,

    0,
    0.75,

    3,
    1.5,

    0xffeb3b,

    "x",

    Math.PI / 2,

    root

);    

// ==================================
// SISI BAWAH
// ==================================

buatEngselBalok3D(

    0,
    -0.5,

    0,
    -0.75,

    3,
    1.5,

    0xf44336,

    "x",

    -Math.PI / 2,

    root

);


    
// ==================================
// SCROLL KE TAMPILAN 3D
// ==================================

scrollKeTampilan();

}

// ======================================
// MEMBUAT PANEL JARING-JARING BALOK 3D
// TAHAP 3
// ======================================

function buatPanelBalok3D(
    ukuranX,
    ukuranY,
    warna
){

    let geometry =
    new THREE.PlaneGeometry(
        ukuranX,
        ukuranY
    );

    let material =
    new THREE.MeshBasicMaterial({
        color:warna,
        side:THREE.DoubleSide
    });

    let sisi =
    new THREE.Mesh(
        geometry,
        material
    );


    // ==================================
    // GARIS TEPI
    // ==================================

    let garisGeometry =
    new THREE.EdgesGeometry(
        geometry
    );

    let garisMaterial =
    new THREE.LineBasicMaterial({
        color:0x000000
    });

    let garis =
    new THREE.LineSegments(
        garisGeometry,
        garisMaterial
    );

    sisi.add(garis);


    panelJaringBalok3D.push(
        sisi
    );


    return sisi;

}

// ======================================
// MEMBUAT ENGSEL BALOK 3D
// ======================================

function buatEngselBalok3D(
    pivotX,
    pivotY,
    sisiX,
    sisiY,
    ukuranX,
    ukuranY,
    warna,
    sumbu,
    sudutTutup,
    parent,
    pivotZ = 0,
    sisiZ = 0
){

    let pivot =
    new THREE.Group();

    pivot.position.set(
        pivotX,
        pivotY,
        pivotZ
    );

    parent.add(pivot);

    let sisi =
    buatPanelBalok3D(
        ukuranX,
        ukuranY,
        warna
    );

    sisi.position.set(
        sisiX,
        sisiY,
        sisiZ
    );

    pivot.add(sisi);

    dataJaringBalok3D.push({

        pivot:pivot,

        sumbu:sumbu,

        sudutBuka:0,

        sudutTutup:sudutTutup

    });

    return pivot;

}
// ======================================
// KONTROL SLIDER JARING-JARING BALOK 3D
// TAHAP 2
// ======================================

function aturJaringBalok3D(nilai){

    nilaiSliderJaringBalok3D = nilai;

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

// ======================================
// LABEL PRISMA SEGITIGA
// ======================================

tambahLabel3D(
    "Titik Sudut",
    [1.35, 1.35, 1],
    [0, 1.2, 1]
);

tambahLabel3D(
    "Sisi",
    [-1.15, -0.1, 1],
    [-0.15, -0.35, 1]
);
    
tambahLabel3D(
    "Rusuk",
    [1.25, -1.45, 1],
    [0.4, -1.2, 1]
);
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
scrollKeTampilan();
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

// ======================================
// LABEL TABUNG
// ======================================

tambahLabel3D(
    "Sisi",
    [1.55, 0.2, 0],
    [1, 0, 0]
);

tambahLabel3D(
    "Rusuk",
    [1.45, 1.25, 0],
    [1, 1, 0]
);
tambahLabel3D(
    "Sisi Atas",
    [-1.5, 1.25, 0],
    [0, 1, 0.4]
);

tambahLabel3D(
    "Sisi Bawah",
    [-1.5, -1.25, 0],
    [0, -1, 0.4]
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

scrollKeTampilan();
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
// ======================================
// LABEL KERUCUT
// ======================================

tambahLabel3D(
    "Titik Sudut",
    [1.35, 1.25, 0],
    [0, 1, 0]
);

tambahLabel3D(
    "Sisi",
    [-1.35, 0.25, 0.6],
    [0, 0.2, 0.4]
);

tambahLabel3D(
    "Rusuk",
    [1.45, -1.05, 0],
    [0.7, -1, 0.7]
);

tambahLabel3D(
    "Sisi Bawah",
    [0.9, -1.45, 0.5],
    [0, -1, 0.4]
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
// ======================================
// LABEL BOLA
// ======================================

tambahLabel3D(
    "Sisi",
    [1.35, 0.2, 0.6],
    [0.7, 0.1, 0.6]
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
scrollKeTampilan();
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

<svg class="ikon-kubus"
viewBox="0 0 60 60"
xmlns="http://www.w3.org/2000/svg">

<!-- Sisi kiri -->
<polygon
points="10,20 30,30 30,52 10,42"
fill="#2196f3"/>

<!-- Sisi kanan -->
<polygon
points="30,30 50,20 50,42 30,52"
fill="#1976d2"/>

<!-- Sisi atas -->
<polygon
points="10,20 30,10 50,20 30,30"
fill="#64b5f6"/>

</svg>

Kubus

</button>

<button onclick="cekJawaban('tabung')">

<svg class="ikon-tabung"
viewBox="0 0 60 60">

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#81c784"/>

<rect x="12" y="12"
width="36"
height="32"
fill="#4caf50"/>

<ellipse cx="30" cy="44"
rx="18" ry="7"
fill="#2e7d32"/>

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#a5d6a7"/>

</svg>

Tabung

</button>

<button onclick="cekJawaban('bola')">
🔵 Bola
</button>

<button onclick="cekJawaban('kerucut')">

<svg class="ikon-kerucut"
viewBox="0 0 60 60">

<path d="M30 5 L10 45 Q30 55 50 45 Z"
fill="#ffeb3b"/>

<ellipse cx="30" cy="45"
rx="20" ry="6"
fill="#fbc02d"/>

</svg>

Kerucut

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
kunciJawaban();

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
// KUNCI JAWABAN SETELAH DIPILIH
// ======================================

function kunciJawaban(){

let tombol =
document.querySelectorAll("#kuis button");

tombol.forEach(function(tombol){

tombol.disabled = true;

});

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

<svg class="ikon-tabung"
viewBox="0 0 60 60">

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#81c784"/>

<rect x="12" y="12"
width="36"
height="32"
fill="#4caf50"/>

<ellipse cx="30" cy="44"
rx="18" ry="7"
fill="#2e7d32"/>

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#a5d6a7"/>

</svg>

Tabung

</button>


<button onclick="cekJawaban2('bola')">
🔵 Bola
</button>


<button onclick="cekJawaban2('kubus')">
🧊 Kubus
</button>


<button onclick="cekJawaban3('prisma')">

<svg class="ikon-prisma"
viewBox="0 0 60 60">

<polygon
points="8,48 30,8 52,48"
fill="#2196f3"/>

<polygon
points="30,8 48,18 48,48 30,48"
fill="#1976d2"/>

<polygon
points="8,48 30,48 48,48 30,56"
fill="#64b5f6"/>

</svg>

Prisma

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

kunciJawaban();
if(jawaban === "tabung"){

skorKuis++;

hasil.innerHTML =
"✅ Benar! Jawabannya adalah Tabung. Skor: "
+ skorKuis +
"<br><br><button onclick='soalKetiga()'>Soal Berikutnya</button>";

}else{

hasil.innerHTML =
"❌ Belum tepat. Jawaban yang benar adalah Tabung. Skor: "
+ skorKuis +
"<br><br><button onclick='soalKetiga()'>Soal Berikutnya</button>";

}

}


// ======================================
// SOAL 3 PRISMA
// ======================================

function soalKetiga(){

let kuisBox =
document.getElementById("kuis");


kuisBox.innerHTML = `

<h2>⭐ Kuis Bangun Ruang</h2>

<p>
Bangun ruang yang memiliki dua sisi berbentuk segitiga dan sisi lainnya berbentuk persegi panjang adalah ...
</p>


<button onclick="cekJawaban3('prisma')">

<svg class="ikon-prisma"
viewBox="0 0 60 60">

<polygon
points="8,48 30,8 52,48"
fill="#2196f3"/>

<polygon
points="30,8 48,18 48,48 30,48"
fill="#1976d2"/>

<polygon
points="8,48 30,48 48,48 30,56"
fill="#64b5f6"/>

</svg>

Prisma

</button>


<button onclick="cekJawaban3('kubus')">
🧊 Kubus
</button>


<button onclick="cekJawaban3('bola')">
🔵 Bola
</button>


<button onclick="cekJawaban('kerucut')">

<svg class="ikon-kerucut"
viewBox="0 0 60 60">

<path d="M30 5 L10 45 Q30 55 50 45 Z"
fill="#ffeb3b"/>

<ellipse cx="30" cy="45"
rx="20" ry="6"
fill="#fbc02d"/>

</svg>

Kerucut

</button>


<p id="hasilKuis"></p>

`;

}


// ======================================
// CEK JAWABAN SOAL 3
// ======================================

function cekJawaban3(jawaban){

let hasil =
document.getElementById("hasilKuis");
kunciJawaban();

if(jawaban === "prisma"){

skorKuis++;

hasil.innerHTML =
"✅ Benar! Jawabannya adalah Prisma. Skor: "
+ skorKuis +
"<br><br><button onclick='soalKeempat()'>Soal Berikutnya</button>";

}else{

hasil.innerHTML =
"❌ Belum tepat. Jawaban yang benar adalah Prisma. Skor: "
+ skorKuis +
"<br><br><button onclick='soalKeempat()'>Soal Berikutnya</button>";

}

}

// ======================================
// SOAL 4 KERUCUT
// ======================================

function soalKeempat(){

let kuisBox =
document.getElementById("kuis");


kuisBox.innerHTML = `

<h2>⭐ Kuis Bangun Ruang</h2>

<p>
Bangun ruang yang memiliki 1 sisi alas berbentuk lingkaran dan 1 titik puncak adalah ...
</p>


<button onclick="cekJawaban4('kerucut')">

<svg class="ikon-kerucut"
viewBox="0 0 60 60">

<path d="M30 5 L10 45 Q30 55 50 45 Z"
fill="#ffeb3b"/>

<ellipse cx="30" cy="45"
rx="20" ry="6"
fill="#fbc02d"/>

</svg>

Kerucut

</button>


<button onclick="cekJawaban4('bola')">
🔵 Bola
</button>


<button onclick="cekJawaban4('kubus')">
🧊 Kubus
</button>


<button onclick="cekJawaban4('tabung')">

<svg class="ikon-tabung"
viewBox="0 0 60 60">

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#81c784"/>

<rect x="12" y="12"
width="36"
height="32"
fill="#4caf50"/>

<ellipse cx="30" cy="44"
rx="18" ry="7"
fill="#2e7d32"/>

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#a5d6a7"/>

</svg>

Tabung

</button>


<p id="hasilKuis"></p>

`;

}

// ======================================
// CEK JAWABAN SOAL 4
// ======================================

function cekJawaban4(jawaban){

let hasil =
document.getElementById("hasilKuis");

kunciJawaban();
if(jawaban === "kerucut"){

skorKuis++;

hasil.innerHTML =
"✅ Benar! Jawabannya adalah Kerucut. Skor: "
+ skorKuis +
"<br><br><button onclick='soalKelima()'>Soal Berikutnya</button>";


}else{

hasil.innerHTML =
"❌ Belum tepat. Jawaban yang benar adalah Kerucut. Skor: "
+ skorKuis +
"<br><br><button onclick='soalKelima()'>Soal Berikutnya</button>";

}

}

// ======================================
// SOAL 5 BOLA
// ======================================

function soalKelima(){

let kuisBox =
document.getElementById("kuis");


kuisBox.innerHTML = `

<h2>⭐ Kuis Bangun Ruang</h2>

<p>
Bangun ruang yang seluruh permukaannya berbentuk lengkung dan tidak memiliki rusuk adalah ...
</p>


<button onclick="cekJawaban5('bola')">

🔵 Bola

</button>


<button onclick="cekJawaban5('kubus')">

🧊 Kubus

</button>


<button onclick="cekJawaban5('tabung')">

<svg class="ikon-tabung"
viewBox="0 0 60 60">

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#81c784"/>

<rect x="12" y="12"
width="36"
height="32"
fill="#4caf50"/>

<ellipse cx="30" cy="44"
rx="18" ry="7"
fill="#2e7d32"/>

<ellipse cx="30" cy="12"
rx="18" ry="7"
fill="#a5d6a7"/>

</svg>

Tabung

</button>


<button onclick="cekJawaban5('prisma')">

<svg class="ikon-prisma"
viewBox="0 0 60 60">

<polygon
points="8,48 30,8 52,48"
fill="#2196f3"/>

<polygon
points="30,8 48,18 48,48 30,48"
fill="#1976d2"/>

<polygon
points="8,48 30,48 48,48 30,56"
fill="#64b5f6"/>

</svg>

Prisma

</button>


<p id="hasilKuis"></p>

`;

}

// ======================================
// CEK JAWABAN SOAL 5
// ======================================

function cekJawaban5(jawaban){

let hasil =
document.getElementById("hasilKuis");

kunciJawaban();
if(jawaban === "bola"){

skorKuis++;

hasil.innerHTML =
"✅ Benar! Jawabannya adalah Bola. Skor: "
+ skorKuis +
"<br><br><button onclick='selesaiKuis()'>Lihat Hasil</button>";

}else{

hasil.innerHTML =
"❌ Belum tepat. Jawaban yang benar adalah Bola. Skor: "
+ skorKuis +
"<br><br><button onclick='selesaiKuis()'>Lihat Hasil</button>";

}

}

// ======================================
// HASIL AKHIR KUIS
// ======================================

function selesaiKuis(){

let kuisBox =
document.getElementById("kuis");


kuisBox.innerHTML = `

<div class="hasil-kuis">

<h2>🎉 Kuis Selesai</h2>

<p>
Hebat! Kamu sudah menyelesaikan semua soal.
</p>

<div class="nilai-kuis">

${skorKuis}/5

</div>

<p>
⭐ Skor Akhir
</p>

<p>
Tetap semangat belajar bangun ruang!
</p>

</div>

`;

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
// ======================================
// KEMBALI KE POSISI ATAS SAAT HALAMAN DIBUKA
// ======================================

window.addEventListener("load", function(){

    window.scrollTo(0, 0);

});
// ======================================
// SCROLL OTOMATIS KE BANGUN 3D
// ======================================

function scrollKeTampilan(){

    const canvas =
    document.getElementById("canvas3D");

    if(!canvas){
        return;
    }

    canvas.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}
// ======================================
// SCROLL OTOMATIS KHUSUS KERUCUT
// ======================================

function scrollKeKerucut(){

    const canvas =
    document.getElementById("canvas3D");

    if(!canvas){
        return;
    }

    setTimeout(function(){

        canvas.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}
// ======================================
// SCROLL OTOMATIS KHUSUS BOLA
// ======================================

function scrollKeBola(){

    const canvas =
    document.getElementById("canvas3D");

    if(!canvas){
        return;
    }

    setTimeout(function(){

        canvas.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}
// ======================================
// SCROLL OTOMATIS KHUSUS KUIS
// ======================================

function scrollKeKuis(){

    const kuis =
    document.getElementById("kuis");

    if(!kuis){
        return;
    }

    setTimeout(function(){

        kuis.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}
