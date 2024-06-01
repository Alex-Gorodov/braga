import { Spinner } from '../spinner/spinner';
import React, { useState } from 'react';
import axios from 'axios';

export function SignUpForm(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [isSending, setSending] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email === '') {
      setError(true);
      return;
    }

    setSending(true);

    try {
      await axios.post('https://formspree.io/f/mgebwvrj', formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSending(false);
        setFormData({
          email: '',
        });
        setError(false);
      }, 2000);
    } catch (error) {
      setError(true);
      console.error(error);
      setSending(false);
    }
  };

  return (
    <div className="sign-up__wrapper">
      {!isSuccess && (
        <div className="sign-up__form-wrapper">
          {isSending ? (
            <div style={{paddingTop: '60px'}}>
              <Spinner size={'40'} color={'#000c24'} />
            </div>
          ) : (
            <form className="sign-up__form" onSubmit={sendForm}>
              <label className={`sign-up__item ${isError && 'sign-up__item--error'}`} htmlFor="email">
                <input
                  className={`sign-up__field ${isError && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) && 'sign-up__field--error'}`}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your e-mail"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  minLength={5}
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <p className={`sign-up__error-message ${isError && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) && 'sign-up__error-message--opened'}`}>Please fill in the required fields.</p>
            </form>
          )}
        </div>
      )}
      {isSuccess && (
        <p className="sign-up__success-message">Successfully sent!</p>
      )}
    </div>
  )
}
