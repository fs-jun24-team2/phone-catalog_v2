import { useTranslation } from 'react-i18next';

export const useFooterLinks = () => {
  const { t } = useTranslation();
  return [
    {
      href: 'https://github.com/fs-jun24-team2/phone-catalog',
      label: 'Github',
    },
    {
      href: '/contacts',
      label: t('contacts'),
    },
    {
      href: '/rights',
      label: t('rights'),
    },
  ];
};
