import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import useCheckUser from '../../hook/useCheckUser';

const Appointment = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useCheckUser()

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8080/PatientAppointment2/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setAppointments(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // แยกนัดหมายล่าสุดกับนัดหมายที่เหลือ
  const latestAppointment = appointments.length > 0 ? appointments[0] : null;
  const pastAppointments = appointments.length > 1 ? appointments.slice(1) : [];

  return (
    <div className='p-2'>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {/* นัดหมายล่าสุด */}
        {latestAppointment && (
          <div className="pt-2">
            <h1 className='text-center font-bold text-xl m-2 mt-4'>นัดหมายล่าสุด</h1>
            <Link to={`/Appointment/PostponeAppointment/${latestAppointment.appointId}`} className="box-sd gap-2">
              <div className="text-center text-black shadow-sm w-20">
                <p className='text-sm w-20'>นัดหมายที่</p>
                <h2 className='text-5xl'>{latestAppointment.appoint_no}</h2>
              </div>
              <h3 className='text-md w-35'>
                {new Date(latestAppointment.appointDate).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              <button className='p-3 rounded-full w-16 text-white bg-red-300 border-collapse hover:bg-blue-600 duration-300 hover:drop-shadow-lg'>
                <h3 className='text-md'>
                  {new Date(latestAppointment.appointDate).toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </h3>
              </button>
            </Link>
          </div>
        )}

        {/* นัดหมายที่ผ่านมาแล้ว */}
        {pastAppointments.length > 0 && (
          <div className='pt-6'>
            <h1 className='text-center font-bold text-xl m-2'>นัดหมายที่ผ่านมาแล้ว</h1>
            {pastAppointments.map((appointment) => (
              <div key={appointment.appointId} className="pt-2">
                <Link to={`/Appointment/PostponeAppointment/${appointment.appointId}`} className="box-sd gap-2">
                  <div className="text-center text-black shadow-sm w-18">
                    <p className='text-sm'>นัดหมายที่</p>
                    <h2 className='text-5xl'>{appointment.appoint_no}</h2>
                  </div>
                  <h3 className='text-md'>
                    {new Date(appointment.appointDate).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <button className='p-3 rounded-full w-18 text-white bg-red-300 border-collapse hover:bg-blue-600 duration-300 hover:drop-shadow-lg'>
                    <h3 className='text-md'>
                      {new Date(appointment.appointDate).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </h3>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
