import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames';
import icon from 'src/files';
import { SearchDataType } from 'src/redux/modules/search';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type HeaderType = {
  goHomepage: () => void,
  goEditorPage: (postId?: string) => void,
  showRemoveModal: () => void,
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearchAndFocus: () => void,
  handleSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  goPage: (url: string) => void,
  toggleMenuDisplay: (bool?: boolean | undefined) => void,
  handleLoginClick: (e: any) => void,
  isDisplayCategory: boolean,
  postId: string | undefined,
  logged: boolean,
  searchInputRef: React.MutableRefObject<HTMLInputElement | null>,
  searchViewRef: React.MutableRefObject<HTMLDivElement | null>,
  searchData: SearchDataType[] | null,
  searchPath: string | undefined,
  searchView: boolean,
  page: number,
}

const Header: React.FC<HeaderType> = ({
  goHomepage, goEditorPage, showRemoveModal, handleSearchInput, handleSearchAndFocus, handleSearchKeyPress, goPage, toggleMenuDisplay, handleLoginClick,
  isDisplayCategory, postId, logged, searchInputRef, searchViewRef, searchData, searchPath, searchView, page
}) => {
  return (
    <header className={cx('header')}>
      <div className={cx('header-content')}>
        {/* LOGO */}
        <div className={cx('brand')} onClick={goHomepage}>
          <div className={cx('logo')} />
          <div>Soo Blog</div>
        </div>

        {/* RIGHT 부분에 차지할 요소 */}
        <div className={cx('right')}>
          {/* CATEGORY */}
          <div className={cx('menu')} onClick={() => toggleMenuDisplay()}>
            <img className={cx("menu-icon", isDisplayCategory ? "enter" : "leave")} src={icon.MenuIcon} alt="menu" />
            <div className={cx('menu-list', isDisplayCategory ? "enter" : "leave")}>
              <ul>
                {
                  ["JavaScript", "Problem Solving", "AWS", "ETC"].map((v, i) =>
                    <li key={i}>
                      <Link to={`/category/${v.replace(/(\s*)/g, "")}`}>
                        {v}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>

          {/* CRUD FUNCTION ICON LIST */}
          {logged &&
            <div className={cx("post-button-wrapper", logged && "display")}>
              {postId &&
                <>
                  <div className={cx('edit', 'logo')} onClick={() => goEditorPage(postId)}><img src={icon.EditIcon} alt="EditIcon" /></div>

                  <div className={cx('remove', 'logo')} onClick={showRemoveModal}><img src={icon.RemoveIcon} alt="RemoveIcon" /></div>
                </>
              }
              <div className={cx('write', 'logo')} onClick={() => goEditorPage()}><img src={icon.WriteIcon} alt="WriteIcon" /></div>
            </div>
          }

          {/* SEARCH */}
          <div className={cx('search')}>
            {/* SEARCH LOGO */}
            <div className={cx('search', 'logo')} onClick={handleSearchAndFocus}>
              <img src={icon.SearchIcon} alt="SearchIcon" />
            </div>
            {/* SEARCH INPUT */}
            <div className={cx('search-wrapper')}>
              <input
                className={cx('search-input')}
                type="search"
                ref={searchInputRef}
                onChange={(e) => handleSearchInput(e)}
                onKeyPress={(e) => handleSearchKeyPress(e)}
                defaultValue={searchPath} />
              {/* SEARCH RESULT VIEW */}
              <div className={cx('search-view', searchData && searchView && 'enable')} ref={searchViewRef} >
                <ul>
                  {searchData && searchData.map((v, i) =>
                    <li key={i} onClick={() => goPage(`/post/${v.postId}`)}>
                      {v.title}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* USER AUTH */}
          <div className={cx('user', 'logo')} onClick={(e) => handleLoginClick(e)}>
            <img src={logged ? icon.UserIcon : icon.LoginIcon} alt="UserIcon" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;