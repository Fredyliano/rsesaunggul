import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {headers: { token }});

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment",{ appointmentId },{ headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (snaptoken) => {

    window.snap.pay(snaptoken, {
      onSuccess: async function(result) {
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verify-midtrans",{order_id: result.order_id},{ headers: { token } });
        if (data.success) {
          toast.success(data.message);
          getUserAppointments();
          navigate("/my-appointments");
        } else {
          toast.error(data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      toast.success("Pembayaran berhasil!");
      console.log("Payment Success:", result);
        getUserAppointments();
      },
      onPending: function(result) {
        toast.info("Menunggu pembayaran...");
        console.log("⏳ Payment Pending:", result);
      },
      onError: function(result) {
        toast.error("Pembayaran gagal!");
        console.log("Payment Error:", result);
      },
      onClose: function() {
        toast.warn("Popup pembayaran ditutup sebelum selesai");
      }
    });
  };

  const appointmentMidtrans = async (appointmentId) => {

    try {
      
      const { data } = await axios.post(backendUrl + "/api/user/payment-midtrans",{ appointmentId },{ headers: { token } });

      if (data.success) {

        initPay(data.snaptoken);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">Janji Temu Saya</p>
      <div>
        {appointments.map((item, index) => (
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt=""/>
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Alamat:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Tanggal & Waktu:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded bg-green-50 text-stone-500">Terbayar</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && (<button onClick={() => appointmentMidtrans(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">Bayar Online</button> )}
              {!item.cancelled && !item.isCompleted && (<button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Batalkan Janji Temu</button>)}
              {item.cancelled && !item.isCompleted && (<button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Janji Temu Dibatalkan</button>)}
              {item.isCompleted && (<button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Selesai</button>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
