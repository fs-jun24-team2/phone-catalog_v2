import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

import { Path } from '@/types/Path';
import { getLogoIcon } from '@/modules/shared/helpers/getLogoIcon';
import { ThemeContext } from '@/context/ThemeContext';

export const Logo: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.header__logo}>
      <Link to={Path.main}>
        <img src={getLogoIcon(theme)} alt="Nice Gadgets logo" />
      </Link>
    </div>
  );
};
