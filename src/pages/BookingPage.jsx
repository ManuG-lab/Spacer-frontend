// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BookingPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [space, setSpace] = useState(null);
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/spaces/${id}`)
//       .then(res => setSpace(res.data))
//       .catch(err => console.error('Error loading space:', err));
//   }, [id]);

//   const handleBooking = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/bookings', {
//         user_id: 1, // Replace later with real user
//         space_id: id,
//         start_time: new Date(startTime).toISOString(),
//         end_time: new Date(endTime).toISOString(),
//       });
//       setMessage('✅ Booking successful!');
//       setTimeout(() => navigate(`/space/${id}`), 2000);
//     } catch (err) {
//       setMessage(`❌ Booking failed: ${err.response?.data?.error || 'Unknown error'}`);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-indigo-600 mb-4">
//         Book Space: {space?.title || '...'}
//       </h2>

//       <div className="mb-4">
//         <label className="block mb-1 text-gray-700">Start Time</label>
//         <input
//           type="datetime-local"
//           value={startTime}
//           onChange={e => setStartTime(e.target.value)}
//           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block mb-1 text-gray-700">End Time</label>
//         <input
//           type="datetime-local"
//           value={endTime}
//           onChange={e => setEndTime(e.target.value)}
//           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       <button
//         onClick={handleBooking}
//         className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
//       >
//         Book Now
//       </button>

//       {message && (
//         <div className="mt-4 text-center text-sm text-green-600">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingPage;
