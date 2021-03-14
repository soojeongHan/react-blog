import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';
import { WriteIcon, RemoveIcon, EditIcon, SearchIcon } from 'src/files/';

const cx = classNames.bind(styles);

type HeaderType = {
  goHomepage: () => void;
  handleRemove: () => void;
  handleChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchAndFocus: () => void;
  handleSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  goPage: (url: string) => void;
  isPostPage: boolean;
  postId?: string;
  logged: boolean;
  searchInputRef: any;
  searchViewRef: any;
  searchData: string[] | null;
}

const Header: React.FC<HeaderType> = ({ goHomepage, handleRemove, handleChangeSearchInput, handleSearchAndFocus, goPage, handleSearchKeyPress, isPostPage, postId, logged, searchInputRef, searchViewRef, searchData }) => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        <div className={cx('brand')} onClick={goHomepage}>
          <div className={cx('logo')}></div>
          <div>Soo Blog</div>
        </div>
        <div className={cx('right')}>
          {(isPostPage && logged) &&
            <div className={cx('edit', 'logo')} onClick={() => goPage(`/editor?id=${postId}`)}><img src={EditIcon} alt="EditIcon" /></div>
          }
          {(isPostPage && logged) &&
            <div className={cx('remove', 'logo')} onClick={handleRemove}><img src={RemoveIcon} alt="RemoveIcon" /></div>
          }
          {logged && <div className={cx('write', 'logo')} onClick={() => goPage('/editor')}><img src={WriteIcon} alt="WriteIcon" /></div>}
          <div className={cx('search', 'logo')} onClick={handleSearchAndFocus}>
            <img src={SearchIcon} alt="searchIcon" />
          </div>
          <input
            className={cx('search-input')}
            type="search"
            ref={searchInputRef}
            onChange={(e) => handleChangeSearchInput(e)}
            onKeyPress={(e) => handleSearchKeyPress(e)} />
          <div className={cx('search-view')} ref={searchViewRef}>
            <ul>
              {searchData && searchData.map((v, i) => <li key={i} onClick={() => goPage(`/search/${v}`)}>{v}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;