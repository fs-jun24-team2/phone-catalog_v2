import styles from './Register.module.scss';

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { ThemeMethodsContext } from '@/context/ThemeContext';
import { Path } from '@/types/Path';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert(t('auth.passwordsDoNotMatch'));
      return;
    }

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    navigate(Path.login);
  };

  return (
    <div
      className={cn(styles['auth-container'], {
        [styles.dark_theme]: isDarkTheme,
      })}
    >
      <div className={styles['auth-card']}>
        <h2>{t('auth.signup')}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label>{t('auth.fullName')}</label>
            <input
              type="text"
              name="fullName"
              placeholder={t('auth.enterFullName')}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t('auth.email')}</label>
            <input
              type="email"
              name="email"
              placeholder={t('auth.enterEmail')}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t('auth.password')}</label>
            <input
              type="password"
              name="password"
              placeholder={t('auth.enterPassword')}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>{t('auth.confirmPassword')}</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder={t('auth.confirmPassword')}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles['auth-btn']}>
            {t('auth.signup')}
          </button>
        </form>
        <div className={styles['form-footer']}>
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to={Path.login}>{t('auth.login')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
