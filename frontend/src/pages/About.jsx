import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>TENTANG <span className="text-gray-700 font-medium">KAMI</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt=""/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Selamat datang di RS Esa Unggul, mitra tepercaya Anda dalam mengelola kebutuhan kesehatan secara praktis dan efisien. Di RS Esa Unggul, kami memahami tantangan yang dihadapi saat menjadwalkan janji dengan dokter dan mengelola catatan kesehatan.</p>

          <p>RS Esa Unggul berkomitmen pada keunggulan dalam teknologi kesehatan. Kami terus berupaya meningkatkan platform kami dengan mengintegrasikan kemajuan terbaru untuk memperbaiki pengalaman pengguna dan memberikan layanan terbaik. Baik Anda memesan janji pertama atau mengelola perawatan berkelanjutan, RS Esa Unggul siap mendukung Anda di setiap langkah.</p>

          <b className="text-gray-800">Visi Kami</b>
          <p>Visi RS Esa Unggul adalah menciptakan pengalaman layanan kesehatan yang lancar bagi setiap pengguna. Kami bertujuan menjembatani kesenjangan antara pasien dan penyedia layanan kesehatan, sehingga memudahkan Anda mengakses perawatan yang dibutuhkan, kapan pun diperlukan.</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>MENGAPA <span className="text-gray-700 font-semibold">MEMILIH KAMI</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efisiensi:</b>
          <p>Penjadwalan janji yang terstruktur dan sesuai dengan gaya hidup sibuk Anda.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Kenyamanan:</b>
          <p>Akses ke jaringan profesional kesehatan terpercaya di wilayah Anda.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalisasi:</b>
          <p>Rekomendasi dan pengingat yang disesuaikan untuk membantu Anda menjaga kesehatan.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
