import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* ------------ Left Section ------------ */}
        <div>
          <img className="mb-1 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        {/* ------------ Center Section ------------ */}
        <div>
          <p className="text-xl font-medium mb-5">HALAMAN</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Beranda</li>
            <li>Tentang Kami</li>
            <li>Hubungi Kami</li>
            <li>Kebijakan Privasi</li>
          </ul>
        </div>

        {/* ------------ Right Section ------------ */}
        <div>
          <p className="text-xl font-medium mb-5">CUSTOMER SERVICE</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+62 812-3456-7890</li>
            <li>rs.esaunggul@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ------------ Copyright Text ------------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Kelompok - Sistem Basis Data Terdistribusi.
        </p>
      </div>
    </div>
  )
}

export default Footer;
