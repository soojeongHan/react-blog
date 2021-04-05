import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';
import icon from 'src/files';
import { SearchDataType } from 'src/redux/modules/search';

const cx = classNames.bind(styles);

type HeaderType = {
  goHomepage: () => void;
  handleRemove: () => void;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchAndFocus: () => void;
  handleSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  goPage: (url: string) => void;
  toggleMenuDisplay: (bool?: boolean | undefined) => void;
  isMenuDisplay: boolean;
  isPostPage: boolean;
  postId?: string;
  logged: boolean;
  searchInputRef: any;
  searchViewRef: any;
  searchData: SearchDataType[] | null;
  searchPath: string | undefined;
}

const Header: React.FC<HeaderType> = ({
  goHomepage, handleRemove, handleSearchInput, handleSearchAndFocus, handleSearchKeyPress, goPage, toggleMenuDisplay,
  isMenuDisplay, isPostPage, postId, logged, searchInputRef, searchViewRef, searchData, searchPath
}) => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        <div className={cx('brand')} onClick={goHomepage}>
          <div className={cx('logo')} />
          <div>Soo Blog</div>
        </div>

        <div className={cx('right')}>
          <div className={cx('menu')} onClick={() => toggleMenuDisplay()}>
            <img className={cx("menu-icon", isMenuDisplay ? "enter" : "leave")} src={icon.MenuIcon} alt="menu" />
            <div className={cx('menu-list', isMenuDisplay ? "enter" : "leave")}>
              <ul>
                {
                  ["Javascript", "Problem Solving", "AWS", "ETC"].map((v, i) =>
                    <li key={i} onClick={() => goPage(`/category/${v.replace(/(\s*)/g, "")}`)}>{v}</li>
                  )
                }
              </ul>
            </div>
          </div>

          <div className={cx('search-wrapper')}>
            {(isPostPage && logged) &&
              <div className={cx('edit', 'logo')} onClick={() => goPage(`/editor?id=${postId}`)}><img src={icon.EditIcon} alt="EditIcon" /></div>
            }
            {(isPostPage && logged) &&
              <div className={cx('remove', 'logo')} onClick={handleRemove}><img src={icon.RemoveIcon} alt="RemoveIcon" /></div>
            }
            {logged && <div className={cx('write', 'logo')} onClick={() => goPage('/editor')}><img src={icon.WriteIcon} alt="WriteIcon" /></div>}
            <div className={cx('search', 'logo')} onClick={handleSearchAndFocus}>
              <img src={icon.SearchIcon} alt="searchIcon" />
            </div>
            <input
              className={cx('search-input')}
              type="search"
              ref={searchInputRef}
              onChange={(e) => handleSearchInput(e)}
              onKeyPress={(e) => handleSearchKeyPress(e)}
              defaultValue={searchPath} />
            <div className={cx('search-view')} ref={searchViewRef} >
              <ul>
                {searchData && searchData.map((v, i) => <li key={i} onClick={() => goPage(`/post/${v.postId}`)}>{v.title}</li>)}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;