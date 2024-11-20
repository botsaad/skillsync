import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } else {
        navigate('/login');
      }
    };
    fetchUserData();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, formData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    }
  };

  // Step navigation functions
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          {/* Step-based rendering */}
          {step === 1 && (
            <>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
              <label>Email:</label>
              <input type="email" name="email" value={formData.email || ''} readOnly />
              <label>Contact Number:</label>
              <input type="tel" name="contactNumber" value={formData.contactNumber || ''} onChange={handleChange} />
              <label>Location:</label>
              <textarea name="location" value={formData.location || ''} onChange={handleChange}></textarea>
            </>
          )}

          {step === 2 && (
            <>
              <label>University:</label>
              <textarea name="university" value={formData.university || ''} onChange={handleChange}></textarea>
              <label>Degree:</label>
              <textarea name="degree" value={formData.degree || ''} onChange={handleChange}></textarea>
              <label>Year of Study:</label>
              <input type="text" name="yearOfStudy" value={formData.yearOfStudy || ''} onChange={handleChange} />
              <label>Educational Interests:</label>
              <textarea name="educationalInterests" value={formData.educationalInterests || ''} onChange={handleChange}></textarea>
            </>
          )}

          {step === 3 && (
            <>
              <label>Skills:</label>
              <textarea name="skills" value={formData.skills || ''} onChange={handleChange}></textarea>
              <label>Skills to Acquire:</label>
              <textarea name="skillsToAcquire" value={formData.skillsToAcquire || ''} onChange={handleChange}></textarea>
              <label>Career Goals:</label>
              <textarea name="careerGoals" value={formData.careerGoals || ''} onChange={handleChange}></textarea>
              <label>Hobbies:</label>
              <textarea name="hobbies" value={formData.hobbies || ''} onChange={handleChange}></textarea>
            </>
          )}

          {step === 4 && (
            <>
              <label>Learning Style:</label>
              <select name="learningStyle" value={formData.learningStyle || ''} onChange={handleChange}>
                <option value="">Select Learning Style</option>
                <option value="Visual">Visual</option>
                <option value="Hands-On">Hands-On</option>
                <option value="Reading">Reading</option>
                <option value="Group Learning">Group Learning</option>
              </select>
              <label>Availability:</label>
              <textarea name="availability" value={formData.availability || ''} onChange={handleChange}></textarea>
              <label>Languages Known:</label>
              <textarea name="languages" value={formData.languages || ''} onChange={handleChange}></textarea>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
            {step < 4 && <button type="button" onClick={nextStep}>Next</button>}
            {step === 4 && <button type="submit">Save Changes</button>}
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>University:</strong> {formData.university}</p>
          <p><strong>Degree:</strong> {formData.degree}</p>
          <p><strong>Year of Study:</strong> {formData.yearOfStudy}</p>
          <p><strong>Educational Interests:</strong> {formData.educationalInterests}</p>
          <p><strong>Skills:</strong> {formData.skills}</p>
          <p><strong>Skills to Acquire:</strong> {formData.skillsToAcquire}</p>
          <p><strong>Career Goals:</strong> {formData.careerGoals}</p>
          <p><strong>Hobbies:</strong> {formData.hobbies}</p>
          <p><strong>Learning Style:</strong> {formData.learningStyle}</p>
          <p><strong>Availability:</strong> {formData.availability}</p>
          <p><strong>Languages Known:</strong> {formData.languages}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
