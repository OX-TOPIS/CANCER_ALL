//หน้าเพิ่มผลข้างเคียง
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AutoComplete, Input, Checkbox, Button } from 'antd';
import { AxiosClient } from '../../apiClient';
import useCheckUser from '../../hook/useCheckUser';
import Cookies from 'js-cookie';

//func เปลี่ยน format date 
function formatDateToCustomFormat(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const { TextArea } = Input;

const AddEffects = () => {
  const [HN, setHN] = useState("");
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [customEffect, setCustomEffect] = useState('');
  const navigateHistory = useNavigate(); //navigateไปหน้าประวัติ


  useEffect(() => {
      const hn = Cookies.get('HN');
      if (hn) {
        setHN(hn);
      }
    }, []);


  useCheckUser()

  const onChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
        setSelectedEffects([...selectedEffects, value]);
    } else {
        setSelectedEffects(selectedEffects.filter(effect => effect !== value));
    }
};

const handleCheckboxChange = (effect) => {
  setSelectedEffects((prev) =>
      prev.includes(effect)
          ? prev.filter((e) => e !== effect)
          : [...prev, effect]
  );
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const patientSideEffect = [...selectedEffects, customEffect].filter(Boolean).join(', ');
    const sendAt = formatDateToCustomFormat(new Date()); //Format date"YYYY-MM-DD HH:MM:SS"
    

    // เช็คค่า
    console.log('HN:', HN);
    console.log('Patient Side Effect:', patientSideEffect);
    console.log('Send At:', sendAt);

    try {
      const response = await AxiosClient.post(`/feedback/${HN}`, {
          sideEffect: patientSideEffect,
          date: sendAt,
      });
      alert('บันทึกผลข้างเคียงสำเร็จ');
      console.log('Effect added:', response.data);
      navigateHistory('/Effects');
  } catch (error) {
    alert('บันทึกผลข้างเคียงไม่สำเร็จ');
      console.error('Error adding effect:', error);
  }
  };

  return (
    <div className='p-4'>
      <div className="flex flex-col md:justify-center md:items-center">
      <h1 className='text-center font-bold text-xl m-4'>ผลข้างเคียง</h1>
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4">
        <label>
          <input
              type="checkbox"
              value="กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"
              onChange={() => handleCheckboxChange('กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ')}
          />กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ</label>
        <label>
          <input
              type="checkbox"
              value="เยื่อบุปากอักเสบ"
              onChange={() => handleCheckboxChange('เยื่อบุปากอักเสบ')}
          />เยื่อบุปากอักเสบ</label>
        <label>
          <input
              type="checkbox"
              value="ผมร่วง / ผมบาง"
              onChange={() => handleCheckboxChange('ผมร่วง/ ผมบาง')}
          />ผมร่วง/ ผมบาง</label>
        <label>
          <input
              type="checkbox"
              value="อ่อนเพลีย / ครั่นเนื้อครั่นตัว"
              onChange={() => handleCheckboxChange('อ่อนเพลีย / ครั่นเนื้อครั่นตัว')}
          />อ่อนเพลีย / ครั่นเนื้อครั่นตัว</label>
        <label>
          <input
              type="checkbox"
              value="ผิวหนังสีเข้มขึ้น"
              onChange={() => handleCheckboxChange('ผิวหนังสีเข้มขึ้น')}
          />ผิวหนังสีเข้มขึ้น</label>
        <label>
          <input
              type="checkbox"
              value="ใจสั่น / หอบเหนื่อยง่าย"
              onChange={() => handleCheckboxChange('ใจสั่น / หอบเหนื่อยง่าย')}
          />ใจสั่น / หอมเหนื่อยง่าย</label>
        <label>
          <input
              type="checkbox"
              value="กระเพาะปัสสาวะอักเสบ"
              onChange={() => handleCheckboxChange('กระเพาะปัสสาวะอักเสบ')}
          />กระเพาะปัสสาวะอักเสบ</label>
        <label>
            <input
                type="checkbox"
                value="อื่นๆ โปรดระบุ"
            />อื่นๆ โปรดระบุ
        </label>
          <textarea
               placeholder="โปรดระบุผลข้างเคียง"
               className='ml-5 mt-2'  
               style={{ height: 50 }}
               value={customEffect}
               onChange={(e) => setCustomEffect(e.target.value)}
           />
        </div>
          <div className='flex items-center justify-items-center w-full'>
            <button className='bt-blue mt-20' type="submit">บันทึกผลข้างเคียง</button>
          </div>
      </form>
    </div>
  </div>
  )
}

export default AddEffects