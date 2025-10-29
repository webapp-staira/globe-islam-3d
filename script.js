// Data Sejarah Islam
const islamicHistory = [
    {
        id: 1,
        location: "Mekkah",
        lat: 21.3891,
        lon: 39.8579,
        year: 610,
        title: "Awal Kenabian",
        description: "Wahyu pertama diterima Nabi Muhammad SAW di Gua Hira pada tahun 610 M, menandai awal kerasulan dan dimulainya dakwah Islam. Peristiwa ini menjadi fondasi pembentukan umat Islam dan peradaban Islam yang akan menyebar ke seluruh dunia.",
        icon: "🕋"
    },
    {
        id: 2,
        location: "Madinah",
        lat: 24.4709,
        lon: 39.6122,
        year: 622,
        title: "Hijrah ke Madinah",
        description: "Perpindahan Nabi Muhammad SAW dan para sahabat dari Mekkah ke Madinah pada tahun 622 M. Peristiwa Hijrah ini menjadi awal kalender Islam (tahun Hijriyah) dan menandai pembentukan masyarakat Islam pertama yang terorganisir.",
        icon: "🕌"
    },
    {
        id: 3,
        location: "Damaskus",
        lat: 33.5138,
        lon: 36.2765,
        year: 661,
        title: "Dinasti Umayyah",
        description: "Berdirinya Dinasti Umayyah dengan Damaskus sebagai ibu kota pada tahun 661 M. Masa ini menandai ekspansi Islam yang pesat ke Afrika Utara, Spanyol, dan Asia Tengah, serta perkembangan arsitektur Islam seperti Masjid Umayyah.",
        icon: "👑"
    },
    {
        id: 4,
        location: "Baghdad",
        lat: 33.3152,
        lon: 44.3661,
        year: 762,
        title: "Dinasti Abbasiyah",
        description: "Baghdad didirikan sebagai ibu kota Dinasti Abbasiyah pada tahun 762 M. Era ini dikenal sebagai Zaman Keemasan Islam dengan kemajuan luar biasa dalam sains, matematika, astronomi, kedokteran, dan filsafat. Rumah Kebijaksanaan (Bayt al-Hikmah) menjadi pusat pengetahuan dunia.",
        icon: "📚"
    },
    {
        id: 5,
        location: "Kordoba",
        lat: 37.8882,
        lon: -4.7794,
        year: 756,
        title: "Peradaban Andalusia",
        description: "Kordoba menjadi pusat peradaban Islam di Andalusia (Spanyol) sejak tahun 756 M. Kota ini berkembang menjadi salah satu kota paling maju di Eropa dengan perpustakaan besar, universitas, dan arsitektur megah seperti Masjid Kordoba.",
        icon: "🏛️"
    },
    {
        id: 6,
        location: "Aceh",
        lat: 5.5483,
        lon: 95.3238,
        year: 1200,
        title: "Islamisasi Nusantara",
        description: "Aceh menjadi gerbang masuknya Islam ke Nusantara sekitar abad ke-13. Kerajaan Samudera Pasai dan kemudian Kesultanan Aceh menjadi pusat penyebaran Islam di Asia Tenggara, dengan jaringan perdagangan dan pendidikan Islam yang kuat.",
        icon: "⛵"
    },
    {
        id: 7,
        location: "Istanbul",
        lat: 41.0082,
        lon: 28.9784,
        year: 1453,
        title: "Penaklukan Konstantinopel",
        description: "Sultan Mehmed II menaklukkan Konstantinopel pada tahun 1453 M, mengakhiri Kekaisaran Bizantium. Kota ini kemudian menjadi Istanbul, ibu kota Kesultanan Utsmaniyah yang berkuasa selama 600 tahun dan menjadi pusat kekuatan Islam di tiga benua.",
        icon: "⚔️"
    },
    {
        id: 8,
        location: "Delhi",
        lat: 28.6139,
        lon: 77.2090,
        year: 1526,
        title: "Kekaisaran Mughal",
        description: "Babur mendirikan Kekaisaran Mughal di India pada tahun 1526 M. Dinasti ini menghasilkan arsitektur Islam yang megah seperti Taj Mahal, serta memadukan budaya Islam dengan tradisi India, menciptakan sintesis budaya yang unik.",
        icon: "🏰"
    },
    {
        id: 9,
        location: "Kairo",
        lat: 30.0444,
        lon: 31.2357,
        year: 1798,
        title: "Modernisasi Islam",
        description: "Kairo menjadi pusat gerakan pembaruan dan modernisasi Islam pada abad ke-19 dan 20. Universitas Al-Azhar memainkan peran penting dalam merespons tantangan modernitas sambil mempertahankan nilai-nilai Islam.",
        icon: "🎓"
    },
    {
        id: 10,
        location: "Jakarta",
        lat: -6.2088,
        lon: 106.8456,
        year: 1945,
        title: "Islam di Era Kemerdekaan",
        description: "Indonesia merdeka pada tahun 1945 dengan Islam sebagai agama mayoritas. Negara ini menunjukkan model Islam yang moderat dan toleran, dengan organisasi seperti NU dan Muhammadiyah yang memainkan peran penting dalam kehidupan sosial dan pendidikan.",
        icon: "🇮🇩"
    }
];

// Three.js Setup
let scene, camera, renderer, globe, markers = [], controls;
let raycaster, mouse;
let currentFilter = null;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvasContainer').appendChild(renderer.domElement);

    // Raycaster for mouse interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create Globe
    createGlobe();

    // Create Markers
    createMarkers();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('wheel', onMouseWheel);

    // Animation
    animate();
}

function createGlobe() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const bumpTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');
    
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.05,
        specular: new THREE.Color('grey'),
        shininess: 10
    });
    
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
}

function createMarkers() {
    islamicHistory.forEach(data => {
        const marker = createMarker(data);
        markers.push({ mesh: marker, data: data });
        globe.add(marker);
    });
}

function createMarker(data) {
    const group = new THREE.Group();

    // Pin geometry
    const pinGeometry = new THREE.CylinderGeometry(0, 0.02, 0.1, 8);
    const pinMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x00d4ff,
        emissiveIntensity: 0.5
    });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.y = 0.05;

    // Sphere on top
    const sphereGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.8
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 0.12;

    group.add(pin);
    group.add(sphere);

    // Position on globe
    const phi = (90 - data.lat) * (Math.PI / 180);
    const theta = (data.lon + 180) * (Math.PI / 180);
    const radius = 1.02;

    group.position.x = -radius * Math.sin(phi) * Math.cos(theta);
    group.position.y = radius * Math.cos(phi);
    group.position.z = radius * Math.sin(phi) * Math.sin(theta);

    group.lookAt(0, 0, 0);
    group.rotateX(Math.PI);

    group.userData = data;

    return group;
}

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function onMouseDown(event) {
    isDragging = true;
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        globe.rotation.y += deltaMove.x * 0.005;
        globe.rotation.x += deltaMove.y * 0.005;
    }

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

window.addEventListener('mouseup', () => {
    isDragging = false;
});

function onMouseWheel(event) {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.001;
    camera.position.z = Math.max(1.5, Math.min(5, camera.position.z));
}

function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    
    const markerMeshes = markers.map(m => m.mesh);
    const intersects = raycaster.intersectObjects(markerMeshes, true);

    if (intersects.length > 0) {
        const clickedMarker = intersects[0].object.parent;
        if (clickedMarker.userData && clickedMarker.userData.title) {
            showModal(clickedMarker.userData);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Auto-rotate globe slowly
    if (!isDragging) {
        globe.rotation.y += 0.001;
    }

    // Animate markers
    markers.forEach(marker => {
        const scale = 1 + Math.sin(Date.now() * 0.003 + marker.data.id) * 0.1;
        marker.mesh.scale.set(scale, scale, scale);
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// UI Functions
function startExploration() {
    document.getElementById('loadingScreen').classList.add('hidden');
    document.querySelector('header').style.display = 'flex';
    document.getElementById('timeline').style.display = 'block';
    document.getElementById('controlsInfo').style.display = 'block';
    init();
}

function showModal(data) {
    document.getElementById('modalTitle').textContent = data.location;
    document.getElementById('modalYear').textContent = `Tahun ${data.year} M`;
    document.getElementById('modalImage').textContent = `${data.icon} ${data.title}`;
    document.getElementById('modalDescription').textContent = data.description;
    
    document.getElementById('modalOverlay').classList.add('show');
    document.getElementById('infoModal').classList.add('show');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('infoModal').classList.remove('show');
}

function resetView() {
    camera.position.set(0, 0, 3);
    globe.rotation.set(0, 0, 0);
    currentFilter = null;
    showAllMarkers();
}

function toggleTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.style.display = timeline.style.display === 'none' ? 'block' : 'none';
}

function filterByCentury(century) {
    currentFilter = century;
    
    // Update active state
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    // Find the correct item to activate based on the century value
    const clickedItem = document.querySelector(`.timeline-item[data-century="${century}"]`);
    if (clickedItem) {
        clickedItem.classList.add('active');
    }

    markers.forEach(marker => {
        const markerCentury = Math.floor(marker.data.year / 100) + 1;
        marker.mesh.visible = markerCentury === century;
    });
}

function showAllMarkers() {
    currentFilter = null;
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector('.timeline-item:last-child').classList.add('active');

    markers.forEach(marker => {
        marker.mesh.visible = true;
    });
}

function showAbout() {
    const aboutData = {
        location: "Tentang Globe Islam 3D",
        year: 2025,
        title: "Media Pembelajaran Interaktif",
        description: "Globe Islam 3D adalah media pembelajaran interaktif berbasis WebGL yang dikembangkan untuk membantu mahasiswa PGMI dan PAI memahami perkembangan sejarah Islam secara spasial dan temporal. Media ini menggunakan teknologi HTML5, Three.js, dan WebGL untuk menciptakan pengalaman eksplorasi sejarah yang immersive dan edukatif.",
        icon: "🌍"
    };
    showModal(aboutData);
}
