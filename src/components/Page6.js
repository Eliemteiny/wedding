import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import './Page.css';

const Page6 = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'guests'), formData);
      alert('Guest information submitted');
      setFormData({ firstName: '', lastName: '' });

      // Send email
      emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_USER_ID
      ).then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }).catch((error) => {
        console.error('Failed to send email.', error);
      });

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="page">
      <h1 className=""  style={{fontSize:'40px' , fontFamily:'Great Vibes', color:'white'}}>Reservation:</h1>
      <form onSubmit={handleSubmit} className="absolute-form">
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <button type="submit">Register!</button>
      </form>
      <p className='Swipeleft' style={{bottom:'10%'}}><b> Swipe left ! </b></p>
    </div>
  );
};

export default Page6;
