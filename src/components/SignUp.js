import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    dateOfBirth: '',
    location: '',
    university: '',
    degree: '',
    yearOfStudy: '',
    educationalInterests: '',
    skills: '',
    skillsToAcquire: '',
    careerGoals: '',
    hobbies: '',
    profilePicture: null,
    resume: null,
    learningStyle: '',
    availability: '',
    languages: '',
    subscribeNewsletter: false,
    profilePictureURL: '',
    resumeURL: ''
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
        [`${name}URL`]: fileURL
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
  
      // Create a document in Firestore with user data (excluding files)
      await setDoc(doc(db, 'users', user.uid), {
        ...formData,
        profilePicture: formData.profilePicture ? formData.profilePicture.name : null,
        resume: formData.resume ? formData.resume.name : null,
      });
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again.');
    }
  };

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const progress = (step / 5) * 100;

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Sign Up for Skills Sync</h2>
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <>
            <h3 className="section-title">Personal Information</h3>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            <label>Contact Number:</label>
            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            <label>Location:</label>
            <textarea name="location" value={formData.location} onChange={handleChange} rows="2"></textarea>
          </>
        )}

        {/* Step 2: Academic Information */}
        {step === 2 && (
          <>
            <h3 className="section-title">Academic Information</h3>
            <textarea name="university" value={formData.university} onChange={handleChange} rows="2" placeholder="University/School"></textarea>
            <textarea name="degree" value={formData.degree} onChange={handleChange} rows="2" placeholder="Degree/Program"></textarea>
            <input type="text" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} placeholder="Year of Study" />
            <textarea name="educationalInterests" value={formData.educationalInterests} onChange={handleChange} rows="3" placeholder="Educational Interests"></textarea>
          </>
        )}

        {/* Step 3: Skills and Interests */}
        {step === 3 && (
          <>
            <h3 className="section-title">Skills and Interests</h3>
            <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" placeholder="Current Skills"></textarea>
            <textarea name="skillsToAcquire" value={formData.skillsToAcquire} onChange={handleChange} rows="3" placeholder="Skills to Acquire"></textarea>
            <textarea name="careerGoals" value={formData.careerGoals} onChange={handleChange} rows="4" placeholder="Career Goals"></textarea>
            <textarea name="hobbies" value={formData.hobbies} onChange={handleChange} rows="4" placeholder="Interests/Hobbies"></textarea>
          </>
        )}

        {/* Step 4: Profile Customization */}
        {step === 4 && (
  <>
    <h3 className="section-title">Profile Customization</h3>

    {/* Profile Picture Upload */}
    <label>Profile Picture:</label>
    <input
      type="file"
      name="profilePicture"
      accept="image/*"
      onChange={handleFileChange}
    />
    {formData.profilePictureURL && (
      <div className="file-preview">
        <img src={formData.profilePictureURL} alt="Profile Preview" className="image-preview" />
        <p>{formData.profilePicture.name}</p>
      </div>
    )}

    {/* Resume Upload */}
    <label>Resume Upload (Optional):</label>
    <input
      type="file"
      name="resume"
      accept=".pdf,.doc,.docx"
      onChange={handleFileChange}
    />
    {formData.resumeURL && (
      <div className="file-preview">
        <p>Uploaded File: {formData.resume.name}</p>
      </div>
    )}
  </>
)}

        {/* Step 5: Additional Preferences */}
        {step === 5 && (
          <>
            <h3 className="section-title">Additional Preferences</h3>
            <label>Preferred Learning Style:</label>
            <select name="learningStyle" value={formData.learningStyle} onChange={handleChange}>
              <option value="">Select Learning Style</option>
              <option value="Visual">Visual</option>
              <option value="Hands-On">Hands-On</option>
              <option value="Reading">Reading</option>
              <option value="Group Learning">Group Learning</option>
            </select>
            <label>Availability:</label>
            <input type="text" name="availability" value={formData.availability} onChange={handleChange} />
            <label>Languages Known:</label>
            <textarea name="languages" value={formData.languages} onChange={handleChange} rows="2"></textarea>
            <label>
              <input type="checkbox" name="subscribeNewsletter" checked={formData.subscribeNewsletter} onChange={handleChange} />
              Subscribe to Newsletter
            </label>
          </>
        )}

        <div className="navigation-buttons">
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 5 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 5 && <button type="submit">Sign Up</button>}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
