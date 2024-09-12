import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    success: false,
    fail: false
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: ""
  });

  const validateName = (name) => {
    const regexName = /^[a-zA-Z\s]{6,}$/;
    if (!regexName.test(name)) {
      setErrors((prev) => ({
        ...prev,
        nameError: "El nombre debe contener solo letras y tener al menos 6 caracteres"
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, nameError: "" }));
    return true;
  };

  const validateEmail = (email) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(email)) {
      setErrors((prev) => ({
        ...prev,
        emailError: "Por favor ingrese un correo válido"
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, emailError: "" }));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userName = formData.name.trim();

    const isNameValid = validateName(userName);
    const isEmailValid = validateEmail(formData.email);

    if (isNameValid && isEmailValid) {
      setFormData({ ...formData, success: true, fail: false });
      console.log("nombre: " + userName + " email: " + formData.email);
    } else {
      setFormData({ ...formData, success: false, fail: true });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          onChange={handleChange} 
          value={formData.name} 
          placeholder="Ingresa tu nombre"
        />
        {errors.nameError && (
          <p className="msg-error">{errors.nameError}</p>
        )}

        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          onChange={handleChange} 
          value={formData.email} 
          placeholder="Ingresa tu email"
        />
        {errors.emailError && (
          <p className="msg-error">{errors.emailError}</p>
        )}

        <button className='btn-send'>Send</button>
      </form>

      {formData.success && (
        <p className='msg-success'>
          Gracias {formData.name}, nos pondremos en concato lo mas pronto posible.
        </p>
      )}
    </div>
  );
};

export default Form;