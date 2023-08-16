const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// fungsi untuk menampilkan menu navigasi pada layar kecil
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active"); // Menambahkan atau menghapus kelas 'active' pada hamburger
});

const slider = document.querySelector(".slider"); // Mengambil elemen dengan kelas 'slider' tampung ke dalam variabel 'slider' dengan tipe data object
const slides = document.querySelectorAll(".slide"); // Mengambil semua elemen dengan kelas 'slide' tampung ke dalam variabel 'slides' dengan tipe data array
// const prevButton = document.querySelector(".prev-slide");
// const nextButton = document.querySelector(".next-slide");
const indicatorContainer = document.querySelector(".slider-indicators"); // Mengambil elemen dengan kelas 'slider-indicators' tampung ke dalam variabel 'indicatorContainer' dengan tipe data object
let currentIndex = 0;

// fungsi showSlide dengan parameter currentIndex
function showSlide(index) {
  currentIndex = index;
  updateSlider();
  updateIndicators();
}

// fungsi updateSlider untuk menggeser slide
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// fungsi updateIndicators untuk mengubah indikator aktif
function updateIndicators() {
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// prevButton.addEventListener("click", () => {
//   currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//   updateSlider();
//   updateIndicators();
// });

// nextButton.addEventListener("click", () => {
//   currentIndex = (currentIndex + 1) % slides.length;
//   updateSlider();
//   updateIndicators();
// });

// membuat fungsi untuk menggeser slide dengan menggunakan touch screen terutama pada smartphone dan layar sentuh
slider.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

slider.addEventListener("touchmove", (event) => {
  touchEndX = event.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
  if (touchStartX - touchEndX > 50) {
    currentIndex = Math.min(currentIndex + 1, slides.length - 1);
  } else if (touchEndX - touchStartX > 50) {
    currentIndex = Math.max(currentIndex - 1, 0);
  }
  updateSlider();
  updateIndicators();
});

// membuat indikator untuk slider dengan menggunakan dom manipulation
slides.forEach((slide, index) => {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  indicator.addEventListener("click", () => {
    showSlide(index);
  });
  indicatorContainer.appendChild(indicator);
});

//jalankan fungsi utama untuk menampilkan slider dan fungsionalitasnya
showSlide(currentIndex);

// fungsi update tahun otomatis pada footer
const year = document.querySelector("#currentYear");
const currentYear = new Date().getFullYear();
const startYear = 2023;
if (currentYear > startYear) {
  year.textContent = `${startYear} - ${currentYear}`;
} else {
  year.textContent = `${currentYear}`;
}
