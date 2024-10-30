import React, { useState, useEffect } from 'react';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '' });

  useEffect(() => {
    fetch('http://a8757a67d6b684867a51b96d0c7451c8-678076174.us-east-1.elb.amazonaws.com/appointments')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://a8757a67d6b684867a51b96d0c7451c8-678076174.us-east-1.elb.amazonaws.com/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(newAppointment => setAppointments([...appointments, newAppointment]))
      .catch(error => console.error('Error creating appointment:', error));
  };

  return (
    <div>
      <h1>Doctor's Office Appointments</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Patient Name" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
        <input placeholder="Doctor Name" value={form.doctorName} onChange={(e) => setForm({ ...form, doctorName: e.target.value })} />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <button type="submit">Book Appointment</button>
      </form>

      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>{appt.patientName} with Dr. {appt.doctorName} on {new Date(appt.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;