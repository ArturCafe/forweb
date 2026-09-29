import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ArtcoreHeader = () => {
  // Состояния для интерактивных элементов интерфейса
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Обработчик отправки формы поиска
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Поиск ключевого слова:', formData.get('s'));
    // Здесь реализуется логика перенаправления на страницу результатов поиска
    setIsSearchOpen(false); 
  };

  return (
    <header className="site-header container-fluid">
      <div className="top-header">
        <div className="logo col-md-6 col-sm-6">
          <h1>
            <Link to="/">
              <em>Art</em>Core
            </Link>
          </h1>
          <span>Responsive HTML5 Template</span>
        </div>
      </div>

      {/* Главная навигационная панель */}
      <div className="main-header">
        <div className="row">
          <div className="main-header-left col-md-3 col-sm-6 col-xs-8">
            {/* Кнопка открытия поиска */}
            <button
             
              className="btn-left fa fa-search"
              onClick={() => setIsSearchOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Open search"
            />
            
            {/* Полноэкранный поиск (Появляется при клике) */}
            <div 
              id="search-overlay" 
              className={isSearchOpen ? 'active' : ''} 
              style={{ display: isSearchOpen ? 'block' : 'none' }}
            >
              <button 
                className="close-search"
                onClick={() => setIsSearchOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Close search"
              >
                <i className="fa fa-times-circle"></i>
              </button>
              <div className="search-form-holder">
                <h2>Type keywords and hit enter</h2>
                <form id="search-form" onSubmit={handleSearchSubmit}>
                  <input type="search" name="s" placeholder="" autoComplete="off" />
                </form>
              </div>
            </div>
            
            {/* Стрелки переключения (для слайдера) */}
            <a href="#" className="btn-left arrow-left fa fa-angle-left"></a>
            <a href="#" className="btn-left arrow-right fa fa-angle-right"></a>
          </div>

          {/* Главное меню (Десктопная версия) */}
          <div className="menu-wrapper col-md-9 col-sm-6 col-xs-4">
            {/* Гамбургер-кнопка для мобильных устройств */}
            <button
              className="toggle-menu visible-sm visible-xs"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Toggle navigation menu"
            >
              <i className="fa fa-bars"></i>
            </button>
            <ul className="sf-menu hidden-xs hidden-sm">
              <li className="active"><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li>
                <Link to="/projects">Projects</Link>
                <ul>
                  <li><Link to="/projects/two-columns">Two Columns</Link></li>
                  <li><Link to="/projects/three-columns">Three Columns</Link></li>
                  <li><Link to="/projects/single">Project Single</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
                <ul>
                  <li><Link to="/blog/masonry">Blog Masonry</Link></li>
                  <li><Link to="/blog/single">Post Single</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/pages">Pages</Link>
                <ul>
                  <li><Link to="/pages/our-team">Our Team</Link></li>
                  <li><Link to="/pages/archives">Archives</Link></li>
                  <li><Link to="/pages/columns">Columns</Link></li>
                  <li><Link to="/pages/404">404 Page</Link></li>
                </ul>
              </li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Адаптивное меню (Мобильная версия - скрывается/показывается динамически) */}
      <div 
        id="responsive-menu" 
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
      >
        <ul>
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
          <li>
            <Link to="/projects">Projects</Link>
            <ul>
              <li><Link to="/projects/two-columns" onClick={() => setIsMobileMenuOpen(false)}>Two Columns</Link></li>
              <li><Link to="/projects/three-columns" onClick={() => setIsMobileMenuOpen(false)}>Three Columns</Link></li>
              <li><Link to="/projects/single" onClick={() => setIsMobileMenuOpen(false)}>Project Single</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
            <ul>
              <li><Link to="/blog/masonry" onClick={() => setIsMobileMenuOpen(false)}>Blog Masonry</Link></li>
              <li><Link to="/blog/single" onClick={() => setIsMobileMenuOpen(false)}>Post Single</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/pages">Pages</Link>
            <ul>
              <li><Link to="/pages/our-team" onClick={() => setIsMobileMenuOpen(false)}>Our Team</Link></li>
              <li><Link to="/pages/archives" onClick={() => setIsMobileMenuOpen(false)}>Archives</Link></li>
              <li><Link to="/pages/columns" onClick={() => setIsMobileMenuOpen(false)}>Columns</Link></li>
              <li><Link to="/pages/404" onClick={() => setIsMobileMenuOpen(false)}>404 Page</Link></li>
            </ul>
          </li>
          <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default ArtcoreHeader;
