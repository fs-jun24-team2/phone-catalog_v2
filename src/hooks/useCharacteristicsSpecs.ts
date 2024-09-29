import { useTranslation } from 'react-i18next';
import { Specs } from '@/types/Specs';
type CharacteristicsSpecs = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
};

export const useCharacteristicsSpecs = ({
  screen,
  resolution,
  processor,
  ram,
}: CharacteristicsSpecs) => {
  const { t } = useTranslation();
  return [
    {
      name: t(Specs.Screen),
      value: screen,
    },
    {
      name: t(Specs.Resolution),
      value: resolution,
    },
    {
      name: t(Specs.Processor),
      value: processor,
    },
    {
      name: t(Specs.RAM),
      value: ram,
    },
  ];
};
