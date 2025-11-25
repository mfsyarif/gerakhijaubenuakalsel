document.addEventListener('DOMContentLoaded', function() {

    // ====================================================================
    // 1. INISIALISASI PETA
    // ====================================================================
    const map = L.map('map').setView([-3.319, 114.590], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.invalidateSize(); 

    // ====================================================================
    // 2. DEFINISI ICON KUSTOM (Jalur Absolute untuk Hosting)
    // ====================================================================
    const icons = {
        recycle: L.icon({
            iconUrl: "assets/icons/recycle.png", // Jalur Absolute dari root proyek
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        }),
        mangrove: L.icon({
            iconUrl: "assets/icons/mangrove.png", // Jalur Absolute dari root proyek
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        }),
        community: L.icon({
            iconUrl: "assets/icons/community.png", // Jalur Absolute dari root proyek
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        })
    };

    // ====================================================================
    // 3. DATA TITIK HIJAU
    // ====================================================================
    const titikHijau = [
        { name: "Bank Sampah Digital Banjarmasin (Pusat)", coord: [-3.319, 114.590], desc: "Pusat pengelolaan dan edukasi daur ulang sampah.", category: "recycle" },
        { name: "Area Rehabilitasi Mangrove Jejangkit", coord: [-3.381, 114.527], desc: "Kawasan pelestarian dan penanaman kembali mangrove.", category: "mangrove" },
        { name: "Bank Sampah Unit Cempaka", coord: [-3.444, 114.846], desc: "Titik setoran Bank Sampah Digital Unit Cempaka.", category: "recycle" },
        { name: "Komunitas Peduli Sungai Martapura", coord: [-3.329, 114.602], desc: "Kelompok aktif menjaga kebersihan sungai.", category: "community" },
        { name: "Penangkaran Bibit Pohon Tabalong", coord: [-2.155, 115.483], desc: "Penyediaan bibit pohon lokal.", category: "community" }
    ];

    let markerLayer = [];

    // ====================================================================
    // 4. LOGIKA BANK SAMPAH DIGITAL (SIMULASI)
    // ====================================================================
    function loadBsdStatistics() {
        // --- Data Simulasi yang nanti bisa diganti dengan API ---
        const totalSetoran = 14523.5; // kg
        const nasabahAktif = 780;
        const totalNilai = 42560000; // Rupiah

        // --- Format dan Tampilkan Data ---
        document.getElementById('total-sampah-setor').textContent = totalSetoran.toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' kg';
        document.getElementById('total-nasabah').textContent = nasabahAktif.toLocaleString('id-ID') + ' Orang';
        document.getElementById('total-transaksi').textContent = 'Rp ' + totalNilai.toLocaleString('id-ID');
    }

    // ====================================================================
    // 5. FUNGSI RENDER MARKER & EVENT LISTENER
    // ====================================================================
    function renderMarkers(filter = "all") {
        markerLayer.forEach(m => map.removeLayer(m));
        markerLayer = [];

        titikHijau.forEach(item => {
            if (filter === "all" || item.category === filter) {
                const marker = L.marker(item.coord, { icon: icons[item.category] })
                .bindPopup(`<b>${item.name}</b><br><i>Kategori: ${item.category.toUpperCase()}</i><hr style="margin: 5px 0;">${item.desc}`)
                .addTo(map);
                markerLayer.push(marker);
            }
        });
    }

    // Panggil semua fungsi utama saat DOM siap
    loadBsdStatistics();
    renderMarkers();

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderMarkers(btn.dataset.category);
        });
    });

    // ... (Logika renderMarkers dan event listener filter berada di sini) ...

    // ====================================================================
    // 6. LOGIKA LOGOUT
    // ====================================================================
    document.getElementById('logout-btn').addEventListener('click', function() {
        // 1. Hapus status 'loggedIn' dari browser
        localStorage.removeItem('loggedIn'); 
        
        // 2. Arahkan pengguna kembali ke halaman login
        window.location.href = 'index.html'; 
    });
}); // Ini adalah penutup dari document.addEventListener('DOMContentLoaded', function()