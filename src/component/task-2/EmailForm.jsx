import React, { useState } from 'react';
import Emailjs from 'emailjs-com';

const EmailForm = () => {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setImageFile(file);
    } else {
      alert('Only PNG, JPG, and JPEG images are allowed');
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Create Form Data to include image as a base64 string
    const reader = new FileReader();
    reader.onloadend = function () {
      const imageBase64 = reader.result;

      const templateParams = {
        name,
        semester,
        branch,
        rollNumber,
        image_base64: imageBase64,
      };

      Emailjs
        .send(
          'service_voj0pxd', // Replace with your EmailJS Service ID
          'template_cnhs2pl', // Replace with your EmailJS Template ID
          templateParams,
          'jwSY9l_i6uqRFBw5A' // Replace with your EmailJS User ID
        )
        .then(
          (result) => {
            console.log(result.text);
            setEmailSent(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile); // Convert image to Base64 string
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Send Email</h1>
        <form onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Semester</label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Roll Number</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Attach Image (PNG, JPG, JPEG)</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Email
          </button>
        </form>
        {emailSent && <p className="mt-4 text-green-500">Email sent successfully!</p>}
      </div>
    </div>
  );
};

export default EmailForm;
