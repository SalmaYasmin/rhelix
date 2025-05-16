import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const medicalOptions = [
  "Hypertension", "Diabetes Mellitus", "Coronary Artery Disease", "Stroke",
  "Lung Disease", "Chronic Liver Disease", "Chronic Kidney Disease",
  "Vitamin D Deficiency", "Vitamin B12 Deficiency", "Iron Deficiency",
  "Thyroid Disorders", "Obesity", "Dyslipidemia", "IBD", "Cancer"
];

const addictionOptions = ["Smoking", "Alcohol", "Gutka Chewing", "None"];
const dietOptions = ["Vegetarian", "Non-Vegetarian", "Vegan", "Eggetarian"];

export default function SurveyForm() {
  // Personal Info
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [phone, setPhone] = useState('');

  // Medical History
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [otherMedicalHistory, setOtherMedicalHistory] = useState('');

  // Past Medical Details
  const [pastMedicalAdmissions, setPastMedicalAdmissions] = useState('');
  const [pastSurgicalHistory, setPastSurgicalHistory] = useState('');

  // Lifestyle
  const [addictions, setAddictions] = useState([]);
  const [diet, setDiet] = useState([]);

  // Perception & Participation
  const [diseaseIncrease, setDiseaseIncrease] = useState('');
  const [diseaseReason, setDiseaseReason] = useState('');
  const [groupParticipation, setGroupParticipation] = useState('');

  // Checkbox handlers
  const toggleCheckbox = (option, state, setState) => {
    if (state.includes(option)) {
      setState(state.filter(item => item !== option));
    } else {
      setState([...state, option]);
    }
  };

  // Radio button handler
  const selectRadio = (value, setValue) => setValue(value);

  // Submit handler
  const handleSubmit = async () => {
    // Compose the data as per your backend model
    const dataToSend = {
      name,
      age_sex: `${age}/${sex}`,
      address,
      occupation,
      phone_number: phone,
      past_medical_history: [...medicalHistory, ...(otherMedicalHistory ? [otherMedicalHistory] : [])],
      other_medical_history: otherMedicalHistory,
      past_medical_admissions: pastMedicalAdmissions,
      past_surgical_history: pastSurgicalHistory,
      addictions,
      diet,
      disease_increase_opinion: diseaseIncrease,
      disease_increase_reason: diseaseReason,
      group_participation_interest: groupParticipation,
    };

    try {
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        Alert.alert('Success', 'Survey submitted successfully!');
        resetForm();
      } else {
        Alert.alert('Error', 'Submission failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Submission failed.');
    }
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setSex('');
    setAddress('');
    setOccupation('');
    setPhone('');
    setMedicalHistory([]);
    setOtherMedicalHistory('');
    setPastMedicalAdmissions('');
    setPastSurgicalHistory('');
    setAddictions([]);
    setDiet([]);
    setDiseaseIncrease('');
    setDiseaseReason('');
    setGroupParticipation('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Personal Information */}
      <Text style={styles.sectionTitle}>👤 Personal Information</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Enter your age" keyboardType="numeric" />
      <Text style={styles.label}>Sex</Text>
      <View style={styles.row}>
        {["Male", "Female", "Other"].map(option => (
          <TouchableOpacity key={option} style={styles.radioContainer} onPress={() => selectRadio(option, setSex)}>
            <View style={styles.radioCircle}>{sex === option && <View style={styles.radioDot} />}</View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Address</Text>
      <TextInput style={[styles.input, {height: 60}]} value={address} onChangeText={setAddress} placeholder="Enter your address" multiline />
      <Text style={styles.label}>Occupation</Text>
      <TextInput style={styles.input} value={occupation} onChangeText={setOccupation} placeholder="Enter your occupation" />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Enter your phone number" keyboardType="phone-pad" />

      {/* Medical History */}
      <Text style={styles.sectionTitle}>🩺 Medical History</Text>
      <Text style={styles.subLabel}>Select all that apply:</Text>
      {medicalOptions.map(option => (
        <View key={option} style={styles.checkboxRow}>
          <CheckBox
            value={medicalHistory.includes(option)}
            onValueChange={() => toggleCheckbox(option, medicalHistory, setMedicalHistory)}
          />
          <Text>{option}</Text>
        </View>
      ))}
      <View style={styles.checkboxRow}>
        <CheckBox
          value={!!otherMedicalHistory}
          onValueChange={val => setOtherMedicalHistory(val ? otherMedicalHistory : '')}
        />
        <Text>Other:</Text>
        <TextInput
          style={[styles.input, {flex: 1, marginLeft: 5}]}
          value={otherMedicalHistory}
          onChangeText={setOtherMedicalHistory}
          placeholder="Specify"
        />
      </View>

      {/* Past Medical Details */}
      <Text style={styles.sectionTitle}>🏥 Past Medical Details</Text>
      <Text style={styles.label}>Past Medical Admissions</Text>
      <TextInput style={[styles.input, {height: 60}]} value={pastMedicalAdmissions} onChangeText={setPastMedicalAdmissions} placeholder="Describe past admissions" multiline />
      <Text style={styles.label}>Past Surgeries</Text>
      <TextInput style={[styles.input, {height: 60}]} value={pastSurgicalHistory} onChangeText={setPastSurgicalHistory} placeholder="Describe past surgeries" multiline />

      {/* Lifestyle Choices */}
      <Text style={styles.sectionTitle}>🚬 Lifestyle Choices</Text>
      <Text style={styles.label}>Addictions</Text>
      <View style={styles.row}>
        {addictionOptions.map(option => (
          <View key={option} style={styles.checkboxRow}>
            <CheckBox
              value={addictions.includes(option)}
              onValueChange={() => toggleCheckbox(option, addictions, setAddictions)}
            />
            <Text>{option}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.label}>Diet Preference</Text>
      <View style={styles.row}>
        {dietOptions.map(option => (
          <View key={option} style={styles.checkboxRow}>
            <CheckBox
              value={diet.includes(option)}
              onValueChange={() => toggleCheckbox(option, diet, setDiet)}
            />
            <Text>{option}</Text>
          </View>
        ))}
      </View>

      {/* Perception & Participation */}
      <Text style={styles.sectionTitle}>📊 Perception & Participation</Text>
      <Text style={styles.label}>Do you think disease rates have increased in the past few decades?</Text>
      <View style={styles.row}>
        {["Yes", "No", "Not Sure"].map(option => (
          <TouchableOpacity key={option} style={styles.radioContainer} onPress={() => selectRadio(option, setDiseaseIncrease)}>
            <View style={styles.radioCircle}>{diseaseIncrease === option && <View style={styles.radioDot} />}</View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>What do you think is the reason?</Text>
      <TextInput style={[styles.input, {height: 60}]} value={diseaseReason} onChangeText={setDiseaseReason} placeholder="Your opinion" multiline />
      <Text style={styles.label}>Would you join a weekly Sunday group to discuss disease prevention?</Text>
      <View style={styles.row}>
        {["Yes", "No", "Maybe"].map(option => (
          <TouchableOpacity key={option} style={styles.radioContainer} onPress={() => selectRadio(option, setGroupParticipation)}>
            <View style={styles.radioCircle}>{groupParticipation === option && <View style={styles.radioDot} />}</View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  label: { fontWeight: 'bold', marginTop: 10 },
  subLabel: { fontStyle: 'italic', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#333', borderRadius: 5, padding: 8, marginBottom: 8, backgroundColor: '#fafafa' },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginRight: 15, marginBottom: 5 },
  radioContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 15, marginBottom: 5 },
  radioCircle: {
    height: 18, width: 18, borderRadius: 9, borderWidth: 2, borderColor: '#333',
    alignItems: 'center', justifyContent: 'center', marginRight: 5
  },
  radioDot: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#333' },
});
    