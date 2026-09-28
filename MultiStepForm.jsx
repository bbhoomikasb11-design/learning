import React, { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif", border: "1px solid #ccc", padding: "1.5rem", borderRadius: "8px" }}>
      <h3>Step {step} of 3</h3>

      {step === 1 && (
        <div>
          <h4>Personal Information</h4>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={{ display: "block", marginBottom: "8px", width: "100%" }} />
          <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={{ display: "block", marginBottom: "8px", width: "100%" }} />
          <button onClick={nextStep} disabled={!formData.name || !formData.email}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h4>Address Info</h4>
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} style={{ display: "block", marginBottom: "8px", width: "100%" }} />
          <input name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} style={{ display: "block", marginBottom: "8px", width: "100%" }} />
          <button onClick={prevStep} style={{ marginRight: "8px" }}>Back</button>
          <button onClick={nextStep} disabled={!formData.city || !formData.zip}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h4>Confirm Details</h4>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>ZIP:</strong> {formData.zip}</p>
          <button onClick={prevStep} style={{ marginRight: "8px" }}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}