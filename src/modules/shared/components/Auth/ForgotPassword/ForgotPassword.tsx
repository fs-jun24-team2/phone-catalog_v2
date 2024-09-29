import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './ForgotPassword.module.scss';
import { Path } from '@/types/Path';
import { ThemeContext } from '@/context/ThemeContext';
import { Theme } from '@/types/Theme';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const isDarkTheme = theme === Theme.dark;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Password reset request sent for:', email);

    setTimeout(() => {
      navigate(Path.login);
    }, 1000);
  };

  return (
    <div
      className={cn(styles.forgot_password_container, {
        [styles.dark_theme]: isDarkTheme,
      })}
    >
      <div className={styles.auth_card}>
        <h2>{t('auth.forgotPassword')}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label>{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.form_button}>
            {t('auth.sendResetLink')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
