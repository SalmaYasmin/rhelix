import React, { useState } from 'react';
import { medicalOptions, addictionOptions, dietOptions } from './surveyOptions';
import { submitSurveyWeb } from './surveyApi';
import './SurveyFormWeb.css';

export default function SurveyFormWeb() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: '',
    address: '',
    occupation: '',
    phone: '',
    medicalHistory: [],
    otherMedicalHistory: '',
    pastMedicalAdmissions: '',
    pastSurgicalHistory: '',
    addictions: [],
    diet: [],
    diseaseIncrease: '',
    diseaseReason: '',
    groupParticipation: '',
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(v => v !== value)
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const dataToSend = {
      name: form.name,
      age_sex: `${form.age}/${form.sex}`,
      address: form.address,
      occupation: form.occupation,
      phone_number: form.phone,
      past_medical_history: [...form.medicalHistory, ...(form.otherMedicalHistory ? [form.otherMedicalHistory] : [])],
      other_medical_history: form.otherMedicalHistory,
      past_medical_admissions: form.pastMedicalAdmissions,
      past_surgical_history: form.pastSurgicalHistory,
      addictions: form.addictions,
      diet: form.diet,
      disease_increase_opinion: form.diseaseIncrease,
      disease_increase_reason: form.diseaseReason,
      group_participation_interest: form.groupParticipation,
    };
    await submitSurveyWeb(dataToSend);
    setForm({
      name: '',
      age: '',
      sex: '',
      address: '',
      occupation: '',
      phone: '',
      medicalHistory: [],
      otherMedicalHistory: '',
      pastMedicalAdmissions: '',
      pastSurgicalHistory: '',
      addictions: [],
      diet: [],
      diseaseIncrease: '',
      diseaseReason: '',
      groupParticipation: '',
    });
  };

  return (
    <div className="survey-container">
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="survey-card">
          <div className="survey-section-title">👤 Personal Information</div>
          <div className="survey-group">
            <label className="survey-label">Full Name
              <input className="survey-input" name="name" value={form.name} onChange={handleChange} autoComplete="off" />
            </label>
            <label className="survey-label">Age
              <input className="survey-input" name="age" value={form.age} onChange={handleChange} type="number" autoComplete="off" />
            </label>
            <div className="survey-label">Sex</div>
            <div className="survey-radio-group">
              {["Male", "Female", "Other"].map(opt => (
                <label key={opt} className="survey-radio-label">
                  <input type="radio" name="sex" value={opt} checked={form.sex === opt} onChange={handleChange} /> {opt}
                </label>
              ))}
            </div>
            <label className="survey-label">Address
              <textarea className="survey-textarea" name="address" value={form.address} onChange={handleChange} rows={2} />
            </label>
            <label className="survey-label">Occupation
              <input className="survey-input" name="occupation" value={form.occupation} onChange={handleChange} autoComplete="off" />
            </label>
            <label className="survey-label">Phone Number
              <input className="survey-input" name="phone" value={form.phone} onChange={handleChange} autoComplete="off" />
            </label>
          </div>
        </div>

        {/* Medical History */}
        <div className="survey-card">
          <div className="survey-section-title">🩺 Medical History</div>
          <div className="survey-checkbox-group">
            {medicalOptions.map(opt => (
              <label key={opt} className="survey-checkbox-label">
                <input
                  type="checkbox"
                  name="medicalHistory"
                  value={opt}
                  checked={form.medicalHistory.includes(opt)}
                  onChange={handleChange}
                /> {opt}
              </label>
            ))}
          </div>
          <label className="survey-label">
            Other:
            <input className="survey-input" name="otherMedicalHistory" value={form.otherMedicalHistory} onChange={handleChange} autoComplete="off" />
          </label>
        </div>

        {/* Past Medical Details */}
        <div className="survey-card">
          <div className="survey-section-title">🏥 Past Medical Details</div>
          <label className="survey-label">Past Medical Admissions
            <textarea className="survey-textarea" name="pastMedicalAdmissions" value={form.pastMedicalAdmissions} onChange={handleChange} rows={2} />
          </label>
          <label className="survey-label">Past Surgeries
            <textarea className="survey-textarea" name="pastSurgicalHistory" value={form.pastSurgicalHistory} onChange={handleChange} rows={2} />
          </label>
        </div>

        {/* Lifestyle Choices */}
        <div className="survey-card">
          <div className="survey-section-title">🚬 Lifestyle Choices</div>
          <div className="survey-label">Addictions</div>
          <div className="survey-checkbox-group">
            {addictionOptions.map(opt => (
              <label key={opt} className="survey-checkbox-label">
                <input
                  type="checkbox"
                  name="addictions"
                  value={opt}
                  checked={form.addictions.includes(opt)}
                  onChange={handleChange}
                /> {opt}
              </label>
            ))}
          </div>
          <div className="survey-label">Diet Preference</div>
          <div className="survey-checkbox-group">
            {dietOptions.map(opt => (
              <label key={opt} className="survey-checkbox-label">
                <input
                  type="checkbox"
                  name="diet"
                  value={opt}
                  checked={form.diet.includes(opt)}
                  onChange={handleChange}
                /> {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Perception & Participation */}
        <div className="survey-card">
          <div className="survey-section-title">📊 Perception & Participation</div>
          <div className="survey-label">Do you think disease rates have increased in the past few decades?</div>
          <div className="survey-radio-group">
            {["Yes", "No", "Not Sure"].map(opt => (
              <label key={opt} className="survey-radio-label">
                <input type="radio" name="diseaseIncrease" value={opt} checked={form.diseaseIncrease === opt} onChange={handleChange} /> {opt}
              </label>
            ))}
          </div>
          <label className="survey-label">What do you think is the reason?
            <textarea className="survey-textarea" name="diseaseReason" value={form.diseaseReason} onChange={handleChange} rows={2} />
          </label>
          <div className="survey-label">Would you join a weekly Sunday group to discuss disease prevention?</div>
          <div className="survey-radio-group">
            {["Yes", "No", "Maybe"].map(opt => (
              <label key={opt} className="survey-radio-label">
                <input type="radio" name="groupParticipation" value={opt} checked={form.groupParticipation === opt} onChange={handleChange} /> {opt}
              </label>
            ))}
          </div>
        </div>

        <button className="survey-submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
