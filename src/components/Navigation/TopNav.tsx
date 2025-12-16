import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuData } from '../../data/menuData';
import { useAuth } from '../../contexts/AuthContext';
import type { MainMenu } from '../../types/menu';
import './TopNav.css';

export default function TopNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isFullMenuClosing, setIsFullMenuClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 권한 체크 함수
  const hasAccess = (roles?: ('admin' | 'user')[]) => {
    if (!roles) return true;
    return roles.includes(user?.role as 'admin' | 'user');
  };

  // 권한에 따른 메뉴 필터링 (메인메뉴, 카테고리, 아이템 모두)
  const accessibleMenuData = useMemo(() => {
    if (!user) return [];

    return menuData
      .filter((menu) => hasAccess(menu.roles))
      .map((menu) => {
        if (!menu.categories) return menu;

        const filteredCategories = menu.categories
          .filter((category) => hasAccess(category.roles))
          .map((category) => ({
            ...category,
            items: category.items.filter((item) => hasAccess(item.roles))
          }))
          .filter((category) => category.items.length > 0);

        return { ...menu, categories: filteredCategories };
      })
      .filter((menu) => menu.path || (menu.categories && menu.categories.length > 0));
  }, [user]);

  const activeMenuData = accessibleMenuData.find((menu) => menu.id === activeMenu);

  // 검색 결과 필터링 (권한 필터링된 메뉴 기준)
  const filteredMenuData = useMemo(() => {
    if (!searchQuery.trim()) return accessibleMenuData;

    const query = searchQuery.toLowerCase();
    return accessibleMenuData
      .map((menu) => {
        if (!menu.categories) return null;

        const filteredCategories = menu.categories
          .map((category) => ({
            ...category,
            items: category.items.filter((item) =>
              item.label.toLowerCase().includes(query)
            ),
          }))
          .filter((category) => category.items.length > 0);

        if (filteredCategories.length === 0 && !menu.label.toLowerCase().includes(query)) {
          return null;
        }

        return { ...menu, categories: filteredCategories };
      })
      .filter(Boolean) as MainMenu[];
  }, [searchQuery, accessibleMenuData]);

  const closeFullMenu = () => {
    setIsFullMenuClosing(true);
    setTimeout(() => {
      setIsFullMenuOpen(false);
      setIsFullMenuClosing(false);
      setSearchQuery('');
    }, 250);
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullMenuOpen) {
        closeFullMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullMenuOpen]);

  return (
    <>
      <nav className="top-nav">
        <div className="nav-container">
          <div className="logo">
            <Link to="/">
              <img src="/E-Logo.png" alt="실적관리시스템" />
            </Link>
          </div>
          <ul className="nav-menu">
            {accessibleMenuData.map((menu) => (
              <li
                key={menu.id}
                className={`nav-item ${activeMenu === menu.id ? 'active' : ''}`}
              >
                {menu.path ? (
                  <Link to={menu.path} className="nav-link">
                    {menu.label}
                  </Link>
                ) : (
                  <span
                    className="nav-link"
                    onClick={() => handleMenuClick(menu.id)}
                  >
                    {menu.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-right">
            {/* 사용자 정보 */}
            <div className="user-info">
              <span className="user-name">{user?.id}</span>
            </div>
            {/* 햄버거 메뉴 아이콘 */}
            <button
              className="hamburger-btn"
              onClick={() => setIsFullMenuOpen(true)}
              aria-label="전체 메뉴"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* 로그아웃 버튼 */}
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
        {/* 메가 메뉴 */}
        {activeMenuData && activeMenuData.categories && activeMenuData.categories.length > 0 && (
          <div className="mega-menu">
            <div className="mega-menu-content">
              {activeMenuData.categories.map((category) => (
                <div key={category.id} className="menu-category">
                  <h3 className="category-title">{category.label}</h3>
                  <ul className="category-items">
                    {category.items.map((item) => (
                      <li key={item.id}>
                        <Link to={item.path} onClick={() => setActiveMenu(null)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 나라장터 스타일 전체 메뉴 */}
      {isFullMenuOpen && (
        <div className={`fullmenu-overlay ${isFullMenuClosing ? 'closing' : ''}`}>
          <div className="fullmenu-header">
            <h2 className="fullmenu-title">전체메뉴</h2>
            <div className="fullmenu-search">
              <input
                type="text"
                placeholder="어떤 메뉴를 찾으세요?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="fullmenu-actions">
              <button className="fullmenu-close-btn" onClick={closeFullMenu}>✕</button>
            </div>
          </div>
          <div className="fullmenu-body">
            {filteredMenuData.filter((menu) => menu.id !== 'notice').map((menu) => (
              <div key={menu.id} className="fullmenu-row">
                <div className="fullmenu-row-title">
                  {menu.path ? (
                    <Link to={menu.path} onClick={closeFullMenu}>{menu.label}</Link>
                  ) : (
                    <span>{menu.label}</span>
                  )}
                </div>
                <div className="fullmenu-row-content">
                  {menu.categories?.map((category) => (
                    <div key={category.id} className="fullmenu-category">
                      {category.label && (
                        <h4 className="fullmenu-category-title">{category.label}</h4>
                      )}
                      <div className="fullmenu-items">
                        {category.items.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            className="fullmenu-item"
                            onClick={closeFullMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
