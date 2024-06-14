import { Spinner } from '../spinner/spinner';
import React, { useState } from 'react';
import axios from 'axios';

export function SubscribeForm(): JSX.Element {
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
    <div className="subscribe__wrapper">
      {!isSuccess && (
        <div className="subscribe__form-wrapper">
          {isSending ? (
            <div style={{paddingTop: '60px'}}>
              <Spinner size={'40'} color={'#000c24'} wrapper/>
            </div>
          ) : (
            <form className="subscribe__form" onSubmit={sendForm}>
              <label className={`subscribe__item ${isError ? 'subscribe__item--error' : ''}`} htmlFor="email">
                <input
                  className={`subscribe__field ${isError && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ? 'subscribe__field--error' : ''}`}
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
              <p className={`subscribe__error-message ${isError && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) && 'subscribe__error-message--opened'}`}>Please fill in the required fields.</p>
            </form>
          )}
        </div>
      )}
      {isSuccess && (
        <p className="subscribe__success-message">Successfully sent!</p>
      )}
    </div>
  )
}
