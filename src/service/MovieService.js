import axios from "axios";

// const API_URL_NEWMOVIES = 'https://phim.nguonc.com/api/films/phim-moi-cap-nhat';

export const fetchNewMovies = async (page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=${page}`);
    return response.data;
};
export const fetchMovieDetails = async (slug) => {
    const response = await axios.get(`https://phim.nguonc.com/api/film/${slug}`);
    return response.data.movie;
}
export const fetchMovieCate = async (cate, page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/${cate}?page=${page}`);
    return response.data;
};
export const fetchSearchMovie = async (search, page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/search?keyword=${search}&page=${page}`);
    return response.data;
}
export const fetchMovieCountry = async (country, page = 1) => {
    const response = await axios.get(`https://phim.nguonc.com/api/films/quoc-gia/${country}?page=${page}`);
    return response.data;
}

// export const fetchMovieCate2 = async (cate) => {
//     const response = await axios.get(`https://phim.nguonc.com/api/films/danh-sach/${cate}?page=2`);
//     return response.data;
// }
// export const fetchAccessories = async () => {
//     const response = await axios.get(API_URL_ACCESSORIES);
//     return response.data;
// };
// export const fetchAccount = async () => {
//     const response = await axios.get(API_URL_ACCOUNTS);
//     return response.data;
// };
// export const fetchPhoneDetails = async () => {
//     const response = await axios.get(API_URL_PHONEDETAILS);
//     return response.data;
// };
// export const fetchCart = async () => {
//     const response = await axios.get(API_URL_CARTS);
//     return response.data;
// };
// export const deleteProductService = async (id) => {
//     const response = await axios.delete(`${API_URL_PRODUCT}/${id}`);
//     return response.data;
// };