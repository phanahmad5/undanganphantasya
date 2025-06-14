document.addEventListener('DOMContentLoaded', function() {
    const openInvitationBtn = document.querySelector('.open-invitation-btn');
    const heroSection = document.querySelector('.hero');
    const invitationDetails = document.getElementById('invitation-details');
    
    // Dapatkan elemen audio
    const backgroundMusic = document.getElementById('background-music');

    // Ambil nama tamu dari URL jika ada
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || 'Bapak/Ibu/Saudara/i';
    document.querySelector('.guest-name').textContent = guestName;

    // Fungsi untuk membuka undangan
    openInvitationBtn.addEventListener('click', function() {
        heroSection.classList.add('hidden'); // Sembunyikan bagian hero
        invitationDetails.classList.remove('hidden'); // Tampilkan detail undangan
        // Opsional: scroll ke atas setelah undangan terbuka
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Putar musik saat undangan dibuka
        backgroundMusic.play().catch(e => console.error("Error playing audio:", e));
        // .catch(e => ...) penting untuk menangani jika browser memblokir autoplay

        // Inisialisasi hitung mundur
        startCountdown();
    });

    // --- Hitung Mundur ---
    // Ganti tanggal ini dengan tanggal pernikahan Anda (YYYY-MM-DD HH:MM:SS)
    const weddingDate = new Date('2026-02-14T09:00:00').getTime();

    function startCountdown() {
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').innerHTML = "<p>Acara telah berlangsung!</p>";
            }
        }, 1000);
    }

    // --- Form Ucapan (Contoh: Menambahkan ke daftar di halaman) ---
    const wishForm = document.getElementById('wish-form');
    const wishesList = document.getElementById('wishes-list');

    // Contoh data ucapan awal (Anda bisa hapus ini)
    const initialWishes = [
        { name: "Andi & Budi", message: "Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek." },
        { name: "Siti", message: "Turut berbahagia atas pernikahan kalian. Semoga selalu dalam lindungan Tuhan." }
    ];

    function displayWishes() {
        wishesList.innerHTML = ''; // Kosongkan daftar sebelum menampilkan
        initialWishes.forEach(wish => {
            const wishItem = document.createElement('div');
            wishItem.classList.add('wish-item');
            wishItem.innerHTML = `
                <strong>${wish.name}:</strong>
                <p>${wish.message}</p>
            `;
            wishesList.appendChild(wishItem);
        });
    }

    wishForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form submit dan reload halaman

        const senderName = document.getElementById('sender-name').value;
        const wishMessage = document.getElementById('wish-message').value;

        if (senderName && wishMessage) {
            // Dalam dunia nyata, data ini akan dikirim ke server.
            // Untuk demo ini, kita hanya menambahkannya ke array dan menampilkannya.
            initialWishes.unshift({ name: senderName, message: wishMessage }); // Tambahkan di awal
            displayWishes(); // Perbarui daftar ucapan

            // Kosongkan form
            wishForm.reset();
        } else {
            alert('Mohon isi nama dan ucapan Anda.');
        }
    });

    // Panggil ini saat halaman dimuat untuk menampilkan ucapan awal
    displayWishes();

    // --- Fitur Nama Tamu dari URL (sudah ada) ---
});