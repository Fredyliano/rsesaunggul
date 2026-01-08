import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, SetDocImg] = useState(false);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [experience, SetExperience] = useState("1 Tahun");
  const [fees, SetFees] = useState("");
  const [about, SetAbout] = useState("");
  const [speciality, SetSpeciality] = useState("Dokter Umum");
  const [degree, SetDegree] = useState("");
  const [address1, SetAddress1] = useState("");
  const [address2, SetAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Gambar tidak boleh kosong");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post( backendUrl + "/api/admin/add-doctor", formData, {headers: {aToken}});

      if (data.success) {
        toast.success(data.message);
        SetDocImg(false);
        SetName("");
        SetEmail("");
        SetPassword("");
        SetFees("");
        SetAbout("");
        SetDegree("");
        SetAddress1("");
        SetAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">

      <p className="mb-3 text-lg font-medium">Tambah Dokter</p>
      
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt=""/>
          </label>
          <input onChange={(e) => SetDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
          <p> Unggah gambar <br /> dokter</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Nama Dokter</p>
              <input onChange={(e) => SetName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Nama" required/>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Email Dokter</p>
              <input onChange={(e) => SetEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder="Email" required/>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password Dokter</p>
              <input onChange={(e) => SetPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type="password" placeholder="Password" required/>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Pengalaman</p>
              <select onChange={(e) => SetExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" id="">
                <option value="1 Tahun">1 Tahun</option>
                <option value="2 Tahun">2 Tahun</option>
                <option value="3 Tahun">3 Tahun</option>
                <option value="4 Tahun">4 Tahun</option>
                <option value="5 Tahun">5 Tahun</option>
                <option value="6 Tahun">6 Tahun</option>
                <option value="7 Tahun">7 Tahun</option>
                <option value="8 Tahun">8 Tahun</option>
                <option value="9 Tahun">9 Tahun</option>
                <option value="10 Tahun">10 Tahun</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Biaya</p>
              <input onChange={(e) => SetFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="Biaya" required/>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Spesialis</p>
              <select onChange={(e) => SetSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" id="">
                <option value="Dokter Umum">Dokter Umum</option>
                <option value="Dokter Kandungan">Dokter Kandungan</option>
                <option value="Dokter Kulit">Dokter Kulit</option>
                <option value="Dokter Anak">Dokter Anak</option>
                <option value="Dokter Saraf">Dokter Saraf</option>
                <option value="Dokter Spesialis Pencernaan">Dokter Spesialis Pencernaan</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Pendidikan</p>
              <input onChange={(e) => SetDegree(e.target.value)} value={degree} className="border rounded px-3 py-2" type="text" placeholder="Pendidikan" required/>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Alamat</p>
              <input onChange={(e) => SetAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2" type="text" placeholder="alamat 1" required/>

              <input onChange={(e) => SetAddress2(e.target.value)} value={address2} className="border rounded px-3 py-2" type="text" placeholder="alamat 2" required/>
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">Tentang Dokter</p>
          <textarea onChange={(e) => SetAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" placeholder="tulis tentang dokter" rows={5} required/>
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Tambah Dokter</button>
      </div>
    </form>
  );
};

export default AddDoctor;
