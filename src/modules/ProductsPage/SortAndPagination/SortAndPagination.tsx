import styles from './SortAndPagination.module.scss';

import React, { useContext } from 'react';
import { SingleValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import { ThemeMethodsContext } from '@/context/ThemeContext';
import { SelectedOption } from '@/types/SelectedOption';
import { SearchParamsType } from '@/types/SearchParamsType';
import { SortSelector } from './SortSelector/SortSelector';

interface SortAndPaginationPanelProps {
  onHandleItemPerPage: (perPage: number) => void;
  totalItems: number;
}

export const SortAndPaginationPanel: React.FC<SortAndPaginationPanelProps> = ({
  onHandleItemPerPage,
  totalItems,
}) => {
  const { t } = useTranslation();
  const updateSearchParams = useUpdateSearchParams();
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get(SearchParamsType.query);
  const searchQueryValue = searchQuery ? searchQuery : '';

  const { isDarkTheme } = useContext(ThemeMethodsContext);

  const handleSortChange = (selectedOption: SingleValue<SelectedOption>) => {
    updateSearchParams({
      [SearchParamsType.sort]: selectedOption ? selectedOption.value : null,
    });
  };

  const handleItemsPerPageChange = (
    selectedOption: SingleValue<SelectedOption>,
  ) => {
    const perPage =
      selectedOption && selectedOption.value === 'all'
        ? totalItems
        : Number(selectedOption?.value || 0);

    updateSearchParams({
      [SearchParamsType.perPage]: selectedOption ? selectedOption.value : null,
    });

    onHandleItemPerPage(perPage);
  };

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParam = event.target.value ? event.target.value : null;

    updateSearchParams({
      [SearchParamsType.query]: newSearchParam,
    });
  };

  return (
    <div className={cn('grid-container', [styles.selectors])}>
      <SortSelector
        label={t('sortBy')}
        options={[
          { value: 'cheapest', label: t('cheapest') },
          { value: 'alphabetically', label: t('alphabetically') },
          { value: 'age', label: t('newest') },
        ]}
        className={styles.selectors__sort}
        onChange={handleSortChange}
      />

      <SortSelector
        label={t('itemsPerPage')}
        options={[
          { value: '4', label: '4' },
          { value: '8', label: '8' },
          { value: '16', label: '16' },
          { value: 'all', label: 'All' },
        ]}
        className={styles.selectors__pagination}
        onChange={handleItemsPerPageChange}
      />

      <div className={styles.selectors__search}>
        <p className={styles['selectors__search-title']}>{t('search')}:</p>

        <input
          type="text"
          value={searchQueryValue}
          onChange={handleSearchOnChange}
          placeholder={t('searchPlaceholder')}
          className={cn(styles['selectors__search-input'], {
            [styles.dark]: isDarkTheme,
          })}
        />
      </div>
    </div>
  );
};

export default SortAndPaginationPanel;
