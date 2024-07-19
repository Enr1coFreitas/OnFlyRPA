import React, { useState, useEffect } from 'react';
import './form.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import estados from '../../data/states.json';
import municipios from '../../data/cities.json';
import autoFillData from '../../data/autoFillData.json';
import changeParagraphText from '../../domManipulaton';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVC: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [cities, setCities] = useState([]);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (formData.state) {
      const stateCode = estados.find(state => state.uf === formData.state)?.codigo_uf;
      if (stateCode) {
        const filteredCities = municipios.filter(city => city.codigo_uf === stateCode);
        setCities(filteredCities);
      } else {
        setCities([]);
      }
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Por favor, insira um endereço de e-mail válido.');
      return;
    }
    setEmailError('');
    setSuccessMessage('Formulário enviado com sucesso!');
    setTimeout(() => {
      setSuccessMessage('');
      setFormData({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        creditCardNumber: '',
        creditCardExpiry: '',
        creditCardCVC: ''
      });
    }, 2000);
  };

  const formatZipCode = (zip) => {
    return zip.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatCreditCardNumber = (number) => {
    return number.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1-');
  };

  const formatCreditCardCVC = (cvc) => {
    return cvc.replace(/\D/g, '').substring(0, 3);
  };

  const handleZipChange = (e) => {
    const formattedZip = formatZipCode(e.target.value);
    setFormData({
      ...formData,
      zip: formattedZip
    });
  };

  const handleCreditCardChange = (e) => {
    const formattedNumber = formatCreditCardNumber(e.target.value);
    setFormData({
      ...formData,
      creditCardNumber: formattedNumber
    });
  };

  const handleCVCChange = (e) => {
    const formattedCVC = formatCreditCardCVC(e.target.value);
    setFormData({
      ...formData,
      creditCardCVC: formattedCVC
    });
  };

  const autoFillForm = () => {
    setFormData(autoFillData);
  };

  return (
    <div>
      {successMessage ? (
        <div className="success-message">{successMessage}</div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label>Nome completo:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nome Sobrenome"
              required
            />
          </div>
          <div>
            <label>Endereço:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field-container">
            <div>
              <label>Estado:</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um estado</option>
                {estados.map((state) => (
                  <option key={state.uf} value={state.uf}>
                    {state.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Cidade:</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city.codigo_ibge} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field-container">
            <div>
              <label>CEP:</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleZipChange}
                placeholder="xxxxx-xxx"
                required
              />
            </div>
            <div>
              <label>Telefone:</label>
              <PhoneInput
                international
                defaultCountry="BR"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
                className="PhoneInput"
              />
            </div>
          </div>
          <div className="field-container">
            <div>
              <label>E-mail:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div>
              <label>Número do cartão de crédito:</label>
              <input
                type="text"
                name="creditCardNumber"
                value={formData.creditCardNumber}
                onChange={handleCreditCardChange}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                required
              />
            </div>
          </div>
          <div className="field-container">
            <div>
              <label>Data de validade do cartão de crédito:</label>
              <input
                type="month"
                name="creditCardExpiry"
                value={formData.creditCardExpiry}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Código de segurança do cartão de crédito:</label>
              <input
                type="text"
                name="creditCardCVC"
                value={formData.creditCardCVC}
                onChange={handleCVCChange}
                placeholder="xxx"
                required
              />
            </div>
          </div>
          <p>Este é um parágrafo que será alterado.</p>
          <button type="submit">Enviar</button>
        </form>
      )}
      {!successMessage && (
        <div className="button-container">
          <button onClick={changeParagraphText}>Alterar texto dos parágrafos</button>
          <button onClick={autoFillForm}>Preencher Automático</button>
        </div>
      )}
    </div>
  );
};

export default Form;