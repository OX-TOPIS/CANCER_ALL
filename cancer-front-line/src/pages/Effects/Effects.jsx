import React, { useState, useEffect } from 'react'
import { AxiosClient } from '../../apiClient';
import Cookies from 'js-cookie';

const thaiMonthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear() + 543; //ปีพศ
  const month = thaiMonthNames[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};

//หน้าประวัติผลข้างเคียง
const Effects =  () => {
  const [history, setHistory] = useState([]);
  const [HN, setHN] = useState("");
  const [appointId, setAppointId] = useState("");
  // const appointId = 107; //test user

  useEffect(() => {
        const hn = Cookies.get('HN');
        if (hn) {
          setHN(hn);
        }
      }, []);


      useEffect(() => {
        if (HN) {
          fetch(`http://localhost:8080/maxappointid/${HN}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setAppointId(data);
              console.log("setAppointId", appointId)
            })
            .catch((error) => {
              setError(error);
            });
        }
      }, [HN]);

  useEffect(() => {
    const fetchHistory = async () => {
        try {
            const response = await AxiosClient.get(`/selectedFeedback/${appointId}`);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };
    fetchHistory();
}, [HN]);






  return (
<div className='p-4'>
  <div className="pt-6">
    <h1 className='text-center font-bold text-xl m-4'>ประวัติการบันทึกผลข้างเคียง</h1>
    {history.length > 0 ? (
      [...history].reverse().map((record, index) => (
        <div key={`${record.id}-${index}`} className="mt-6 entry ">
          <div className="entry-left ">
            <p className='text-sm text-center'>บันทึกครั้งที่</p>
            <h2 className='text-4xl text-blue600'>{history.length - index}</h2>
          </div>
          <div className="entry-right">
            <h3 className='text-md font-bold'>
              วันที่ {formatThaiDate(record.sendAt)}
            </h3>
            <p>{record.patientSideEffect}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">ไม่พบประวัติการบันทึกผลข้างเคียง</p>
    )}
  </div>   
</div>

  )
}

export default Effects