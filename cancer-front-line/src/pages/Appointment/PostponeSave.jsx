import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Input, Radio  } from 'antd';

const PostponeAppointment = () => {
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAppointments, setNewAppointments] = useState([]);
  const { appointId } = useParams();
  // จากกล่อง input  ที่่กรอก
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  // console.log("reason", reason);
  // console.log("email", email);
  // console.log("requestPhone", requestPhone);

  // newAppointDate //////////////////////////////////////////////
  const [newAppointDate, setNewAppointDate] = useState("");
  // Set value newAppointDate
  const onChangenewAppointDate = (e) => {
    console.log('radio checked', e.target.value);
    setNewAppointDate(e.target.value);
  };
// format date in db
function formatDateForValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเป็นเลขสองหลัก
  const day = String(date.getDate()).padStart(2, '0'); // วันเป็นเลขสองหลัก
  const hours = String(date.getHours()).padStart(2, '0'); // ชั่วโมงเป็นเลขสองหลัก
  const minutes = String(date.getMinutes()).padStart(2, '0'); // นาทีเป็นเลขสองหลัก
  const seconds = String(date.getSeconds()).padStart(2, '0'); // วินาทีเป็นเลขสองหลัก

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
  
  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8080/PatientAppointment2/${username}/${appointId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAppointments(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [username]);

  useEffect(() => {
    if (appointments.length > 0) {
      const firstAppointment = appointments[0];
      const nextAppointments = getNextAppointments(firstAppointment.appointDate);
      setNewAppointments(nextAppointments);
    }
  }, [appointments]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function getNextAppointments(appointDate) {
    const date = new Date(appointDate);
    const result = [];
  
    const targetDay = date.getDay(); // Get the target day of the week
    let count = 0;
  
    while (count <= 4) {
      // Check if the current day matches the target day
      if (date.getDay() === targetDay) {
        result.push(new Date(date));
        count++;
      }
      // Move to the next day
      date.setDate(date.getDate() + 1); // Move to the next week
    }
    return result;
  }

  return (
    <div>
      <div className="p-4 space-y-12">
        <div className="">
          <h2 className='text-lg'>นัดหมายเดิม</h2>
          {appointments.map((appointment) => (
            <div key={appointment.appointId} className="pt-2">
              <h3 className='text-md'>{new Date(appointment.appointDate).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</h3>
              <div className="">{new Date(appointment.appointDate).toLocaleTimeString('th-TH', {
                  hour: '2-digit',
                  minute: '2-digit',
                })} น.</div>
            </div>
          ))}
        </div>
        <div className="">
          <h2 className='text-lg'>นัดหมายใหม่</h2>
          {/* ลิสสสสสสนัดหมายใหม่ */}
          <Radio.Group onChange={onChangenewAppointDate} value={newAppointDate}>
          {newAppointments.length > 0 ? (
            
            newAppointments.slice(1).map((date, index) => (
              <Radio   key={index} className="pt-2" value={formatDateForValue(date)}>{date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} {date.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
              })} น.</Radio >
            ))
            
          ) : (
            <p>ไม่มีวันนัดหมายใหม่ที่ตรงกัน</p>
          )}
          </Radio.Group>
          <h1>Appointment ID: {appointId}</h1>

          {/* text boxxx */}
          <div className="space-y-4">
            <div className="">
                <div className="">เหตุผล</div>
                <Input placeholder="เหตุผล" onChange={e => setReason(e.target.value)} />
            </div>
            <div className="">
                <div className="">อีเมลล์</div>
                <Input placeholder="อีเมลล์" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="">
                <div className="">เบอร์โทร</div>
                <Input placeholder="เบอร์โทร" onChange={e => setRequestPhone(e.target.value)} />
            </div>
          </div>





        </div>
      </div>

      {/* THIS PLACE IS CALENDAR */}

      {/* ปุ่มยืนยันเลื่อนวันนัด */}
      <Link to={"/Appointment/AppointmentDetails"} className="flex justify-center items-center">
        <button className='bt-blue'>ยืนยันการเลื่อนการนัดหมาย</button>
      </Link>
    </div>
  );
};

export default PostponeAppointment;
