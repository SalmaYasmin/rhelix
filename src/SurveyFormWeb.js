import React, { useState } from 'react';
import { medicalOptions, addictionOptions, dietOptions } from './surveyOptions';
import { submitSurveyWeb } from './surveyApi';

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
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Personal Information</h2>
      <label>Full Name <input name="name" value={form.name} onChange={handleChange} /></label><br/>
      <label>Age <input name="age" value={form.age} onChange={handleChange} type="number" /></label><br/>
      <label>Sex
        <input type="radio" name="sex" value="Male" checked={form.sex === "Male"} onChange={handleChange} /> Male
        <input type="radio" name="sex" value="Female" checked={form.sex === "Female"} onChange={handleChange} /> Female
        <input type="radio" name="sex" value="Other" checked={form.sex === "Other"} onChange={handleChange} /> Other
      </label><br/>
      <label>Address <textarea name="address" value={form.address} onChange={handleChange} /></label><br/>
      <label>Occupation <input name="occupation" value={form.occupation} onChange={handleChange} /></label><br/>
      <label>Phone Number <input name="phone" value={form.phone} onChange={handleChange} /></label><br/>

      <h2>Medical History</h2>
      {medicalOptions.map(opt => (
        <label key={opt}>
          <input
            type="checkbox"
            name="medicalHistory"
            value={opt}
            checked={form.medicalHistory.includes(opt)}
            onChange={handleChange}
          /> {opt}
        </label>
      ))}
      <label>
        Other: <input name="otherMedicalHistory" value={form.otherMedicalHistory} onChange={handleChange} />
      </label><br/>

      <h2>Past Medical Details</h2>
      <label>Past Medical Admissions <textarea name="pastMedicalAdmissions" value={form.pastMedicalAdmissions} onChange={handleChange} /></label><br/>
      <label>Past Surgeries <textarea name="pastSurgicalHistory" value={form.pastSurgicalHistory} onChange={handleChange} /></label><br/>

      <h2>Lifestyle Choices</h2>
      <div>
        Addictions:
        {addictionOptions.map(opt => (
          <label key={opt}>
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
      <div>
        Diet Preference:
        {dietOptions.map(opt => (
          <label key={opt}>
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

      <h2>Perception & Participation</h2>
      <div>
        Do you think disease rates have increased in the past few decades?
        <label><input type="radio" name="diseaseIncrease" value="Yes" checked={form.diseaseIncrease === "Yes"} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="diseaseIncrease" value="No" checked={form.diseaseIncrease === "No"} onChange={handleChange} /> No</label>
        <label><input type="radio" name="diseaseIncrease" value="Not Sure" checked={form.diseaseIncrease === "Not Sure"} onChange={handleChange} /> Not Sure</label>
      </div>
      <label>What do you think is the reason? <textarea name="diseaseReason" value={form.diseaseReason} onChange={handleChange} /></label><br/>
      <div>
        Would you join a weekly Sunday group to discuss disease prevention?
        <label><input type="radio" name="groupParticipation" value="Yes" checked={form.groupParticipation === "Yes"} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="groupParticipation" value="No" checked={form.groupParticipation === "No"} onChange={handleChange} /> No</label>
        <label><input type="radio" name="groupParticipation" value="Maybe" checked={form.groupParticipation === "Maybe"} onChange={handleChange} /> Maybe</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
