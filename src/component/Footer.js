import { Link } from 'react-router-dom';
import '../assest/Footer.css';

function Footer() {
    return (
        <div className='text-light' style={{ backgroundColor: '#001' }}>
            <div className="container">
                <footer className="py-5">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3 desktop-view">
                            <h5>Tổng đài miễn phí</h5>
                            <ul className="nav flex-column">
                                {/* <li className="nav-item nav-item1 mb-2">Tư vấn sản phẩm(Miễn phí)<br />1800.6601 (nhánh 1)</li> */}
                                <li className="nav-item nav-item1 mb-2">Góp ý, khiếu nại<br></br> 1800.6616 (8h00 - 22h00)</li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-3 mb-3 desktop-view">
                            <h5>Chính sách</h5>
                            <ul className="nav flex-column">
                                {/* <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách đổi trả</a></li> */}
                                <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách bảo mật</a></li>
                                <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách thu thập & xử lý dữ liệu cá nhân</a></li>
                                <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách về thông tin và quyền riêng tư</a></li>
                                <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách về phim</a></li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-3 mb-3 desktop-view">
                            <h5>Về chúng tôi</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item nav-item1 mb-2"><Link to={'/introduction'} className="nav-link p-0">Giới thiệu về My Cinema VN</Link></li>
                                <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Quy chế hoạt động</a></li>
                                <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Câu hỏi thường gặp</a></li>
                                <li className="nav-item nav-item1 mb-2"><a href="https://phim.nguonc.com/" className="nav-link p-0" target="_blank" rel="noopener noreferrer">API</a></li>
                            </ul>
                        </div>
                        {/* mobile view */}
                        <div class="accordion mobile-view mb-3" id="accordionPanelsStayOpenExample" data-bs-theme="dark">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Tổng đài miễn phí
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div class="accordion-body">
                                        <ul className="nav flex-column">
                                            {/* <li className="nav-item nav-item1 mb-2">Tư vấn mua hàng (Miễn phí)<br /><a href="#" className="nav-link p-0 fw-bold">1800.6601 (nhánh 1)</a></li> */}
                                            <li className="nav-item nav-item1 mb-2">Góp ý, khiếu nại<a href="#" className="nav-link p-0 fw-bold">1800.6616 (8h00 - 22h00)</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        Về chúng tôi
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div class="accordion-body">
                                        <ul className="nav flex-column">
                                            <li className="nav-item nav-item1 mb-2"><Link to={'/introduction'} className="nav-link p-0">Giới thiệu về My Cinema VN</Link></li>
                                            <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Quy chế hoạt động</a></li>
                                            <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Câu hỏi thường gặp</a></li>
                                            <li className="nav-item nav-item1 mb-2"><a href="https://phim.nguonc.com/" className="nav-link p-0" target="_blank" rel="noopener noreferrer">API</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                        Chính sách
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                    <div class="accordion-body">
                                        <ul className="nav flex-column">
                                            <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách bảo mật</a></li>
                                            <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách thu thập & xử lý dữ liệu cá nhân</a></li>
                                            <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách về thông tin và quyền riêng tư</a></li>
                                            <li className="nav-item nav-item1 mb-2"><a href="#" className="nav-link p-0">Chính sách về phim</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-4 mb-3">
                            <form>
                                <h5>Đăng ký để nhận thông tin mới nhất</h5>
                                <p className='text-secondary'>Những bộ phim hấp dẫn đang chờ bạn*</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2 footer-input">
                                    <label for="newsletter1" className="visually-hidden">Địa chỉ Email</label>
                                    <input id="newsletter1" type="text" className="form-control " placeholder="Địa chỉ Email" />
                                    <button className="btn btn-warning" type="button">Đăng ký</button>
                                </div>
                            </form>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7667.867296560544!2d108.21709039309195!3d16.06893258844196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142182e92db258b%3A0x1207f994ee77c1fc!2zQ0dWIFZpbmNvbSDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1733289490849!5m2!1svi!2s" width="100%" height="250" className='mt-2' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between border-top">
                        <p>&copy; 2024 Company, Inc. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default Footer;
