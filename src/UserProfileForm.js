import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfileForm() {
  const [userProfile, setUserProfile] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('https://run.mocky.io/v3/a2eebe62-c28f-478d-a8e3-523e589eb31f')
      .then(response => {
        setUserProfile(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // Update user profile locally
    setUserProfile({
      ...userProfile,
      firstName,
      lastName,
      email
    });
    console.log(userProfile)
    // Send update request to server
    axios.post('https://run.mocky.io/v3/a2eebe62-c28f-478d-a8e3-523e589eb31f')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
