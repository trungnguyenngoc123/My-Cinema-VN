import React from 'react'

function Introduction() {
    const IntroText = {
        color: '#aba8a8'
    }
    return (
        <div className="bg-dark" style={{ paddingTop: '60px' }}>
            <div className="container pb-5">
                <div style={{ padding: '0 15%' }}>
                    <div className="text-light">
                        <h4 className="pb-3 pt-5">MyCinemaVN - Nền Tảng Xem Phim Trực Tuyến Miễn Phí
                        </h4>
                        <p style={IntroText}>MyCinemaVN là nền tảng xem phim trực tuyến miễn phí, cung cấp một không gian
                            giải
                            trí đỉnh cao cho hàng
                            triệu người dùng với tiêu chí chất lượng, tiện lợi và phong phú. Được thành lập với sứ mệnh đem
                            lại
                            trải nghiệm giải trí hoàn toàn miễn phí, MyCinemaVN đã và đang trở thành điểm đến quen thuộc cho
                            những
                            người yêu thích phim ảnh từ khắp nơi.</p>

                        <h4 className="pb-3 pt-5">Giao Diện Thân Thiện, Dễ Sử Dụng
                        </h4>
                        <p style={IntroText}>MyCinemaVN thiết kế giao diện tối giản, thân thiện để bạn dễ dàng khám phá và
                            tìm
                            kiếm những bộ phim yêu thích. Chỉ với vài thao tác đơn giản, bạn có thể truy cập vào kho phim đa
                            dạng của chúng tôi và thưởng thức những nội dung giải trí đỉnh cao, mọi lúc mọi nơi.</p>

                        <h4 className="pb-3 pt-5">Kho Phim Phong Phú, Đáp Ứng Mọi Thể Loại
                        </h4>
                        <p style={IntroText}>MyCinemaVN mang đến cho bạn hàng ngàn bộ phim thuộc nhiều thể loại, từ hành
                            động,lãng
                            mạn, khoa học viễn tưởng, hoạt hình, đến kinh dị và phiêu lưu. Không ngừng cập nhật, chúng tôi
                            cam
                            kết đem đến cho bạn những bộ phim mới nhất và chất lượng nhất.</p>
                        <div style={IntroText}>
                            <p>Kho phim phong phú của MyCinemaVN bao gồm:</p>
                            <ul>
                                <li>Phim Bộ: Từ các series kinh điển đến các bộ phim truyền hình mới nhất, bạn có thể thưởng
                                    thức liên tục những tập phim hay.</li>
                                <li>Phim Lẻ: Những bộ phim điện ảnh đình đám, từ phim bom tấn Hollywood, châu Á đến những bộ
                                    phim độc lập hấp dẫn.</li>
                                <li>Phim Việt Nam: Đáp ứng nhu cầu của người yêu phim Việt, chúng tôi luôn cập nhật các bộ
                                    phim
                                    Việt Nam mới và nổi tiếng.</li>
                            </ul>
                        </div>


                        <h4 className="pb-3 pt-5">Tính Năng Nổi Bật của MyCinemaVN
                        </h4>
                        <div style={IntroText}>
                            <ul>
                                <li>Xem Phim Miễn Phí Hoàn Toàn: MyCinemaVN hoạt động với phương châm phục vụ cộng đồng, bạn
                                    sẽ
                                    không phải chi trả bất kỳ khoản phí nào để truy cập và xem phim.</li>
                                <li>Cập Nhật Phim Nhanh Chóng: Đội ngũ của chúng tôi làm việc không ngừng nghỉ để cập nhật
                                    những
                                    bộ phim mới nhất, giúp bạn luôn đón đầu xu hướng.</li>
                                <li>Xem Phim Mọi Lúc, Mọi Nơi: Hỗ trợ đa nền tảng từ máy tính, điện thoại đến các thiết bị
                                    thông
                                    minh khác, bạn có thể xem phim mọi lúc, mọi nơi.</li>
                            </ul>
                        </div>

                        <h4 className="pb-3 pt-5">Cam Kết của MyCinemaVN
                        </h4>
                        <p style={IntroText}>Chúng tôi cam kết bảo vệ quyền lợi người dùng với chất lượng dịch vụ tốt
                            nhất.
                            MyCinemaVN không ngừng phát triển và cải thiện để đem lại trải nghiệm xem phim hoàn hảo. An toàn
                            và bảo
                            mật của người dùng luôn là ưu tiên hàng đầu của chúng tôi, vì vậy chúng tôi đảm bảo thông tin cá
                            nhân của bạn luôn được bảo mật tuyệt đối.</p>


                        <h4 class="pb-3 pt-5">API
                        </h4>
                        <p style={IntroText}>MyCinemaVN lấy dữ liệu phim từ website <a className='text-decoration-none' href='https://phim.nguonc.com/' target="_blank" rel="noopener noreferrer">nguonc.com</a> được tin dùng và đảm bảo uy tín luôn cập nhật phim một cách nhanh nhất và với những bộ phim hấp dẫn không thể chối từ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Introduction