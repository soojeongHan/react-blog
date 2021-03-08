import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';
import Button from 'src/components/common/Button';
import SearchIcon from 'src/files/search.png';

const cx = classNames.bind(styles);

type HeaderType = {
  goHomepage: () => void;
  handleRemove: () => void;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  goSearchPage: (content: string) => void;
  isEditing: boolean;
  postId?: string;
  logged: boolean;
  searchInputRef: any;
  searchViewRef: any;
  searchData: string[] | null;
}

const Header: React.FC<HeaderType> = ({ isEditing, postId, goHomepage, handleRemove, handleSearchInput, handleFocus, goSearchPage, logged, searchInputRef, searchViewRef, searchData }) => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        <div className={cx('brand')} onClick={goHomepage}>
          <div className={cx('logo')}></div>
          <div>Soo Blog</div>
        </div>
        <div className={cx('right')}>
          {(isEditing && logged) &&
            <Button theme="outline" to={`/editor?id=${postId}`}>수정</Button>
          }
          {(isEditing && logged) &&
            <Button theme="outline" onClick={handleRemove}>삭제</Button>
          }
          {logged && <Button theme="outline" to="/editor">새 포스트</Button>}
          <div className={cx('search-logo')} onClick={handleFocus}>
            <img src={SearchIcon} alt="searchIcon" />
          </div>
          <input className={cx('search-input')} type="search" onChange={(e) => handleSearchInput(e)} ref={searchInputRef} autoComplete="xxx" />
          <div className={cx('search-view')} ref={searchViewRef}>
            <ul>
              {searchData && searchData.map((v, i) => <li key={i} onClick={() => goSearchPage(v)}>{v}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;