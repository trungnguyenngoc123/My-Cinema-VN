import React, { useState, useEffect } from 'react';
import '../assest/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Header() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [navbarBg, setNavbarBg] = useState('bg-dark opacity-75');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/tim-kiem?keyword=${searchKeyword}`);
    }
    setSearchKeyword('');
  };

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setNavbarBg('bg-dark');
    } else {
      setNavbarBg('bg-dark opacity-75');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark position-fixed w-100 ${navbarBg}`} style={{ zIndex: '99' }}>
        <div className="container">
          <div className="navbar-brand">
            <Link to={'/'} className='text-decoration-none'  >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src='/images/logo.png' height="50" alt="Logo"/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
                  <span className='fw-medium text-light' style={{ fontSize: '20px' }}>My Cinema</span>
                  <small className='text-info' style={{ fontSize: '14px' }}>Xem là nghiền</small>
                </div>
              </div>
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/'} className="nav-link text-light active" aria-current="page">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link to={`/danh-sach/phim-le`} className="nav-link text-light">Phim lẻ</Link>
              </li>
              <li className="nav-item">
                <Link to={`/danh-sach/phim-bo`} className="nav-link text-light">Phim bộ</Link>
              </li>
              <li className="nav-item">
                <Link to={`/danh-sach/phim-dang-chieu`} className="nav-link text-light">Phim đang chiếu</Link>
              </li>
              <li className="nav-item dropdown hover-dropdown">
                <div className="nav-link text-light dropdown-toggle" role="button" aria-expanded="false">
                  Thể loại
                </div>
                <ul className="dropdown-menu dropdown-hover bg-dark border-1 border-light">
                  <div className='row'>
                    <div className='col-4'>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/chinh-kich'}>Phim chính kịch</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/hanh-dong'}>Phim hành động</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/phim-hai'}>Phim hài</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/lich-su'}>Phim lịch sử</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/bi-an'}>Phim bí ẩn</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/gay-can'}>Phim gay cấn</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/tinh-cam'}>Phim tình cảm</Link></li>
                    </div>
                    <div className='col-4'>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/phieu-luu'}>Phim phiêu lưu</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/hinh-su'}>Phim hình sự</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/gia-dinh'}>Phim gia đình</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/kinh-di'}>Phim kinh dị</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/lang-man'}>Phim lãng mạn</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/chien-tranh'}>Phim chiến tranh</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/hoat-hinh'}>Phim hoạt hình</Link></li>
                    </div>
                    <div className='col-4'>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/gia-tuong'}>Phim giả tưởng</Link></li>
                      <li><Link className="dropdown-item text-light" to={'/danh-sach/tam-ly'}>Phim tâm lý</Link></li>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>

            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm tên phim..."
                aria-label="Search"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success text-light" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
