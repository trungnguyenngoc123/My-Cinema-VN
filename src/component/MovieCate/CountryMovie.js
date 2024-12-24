
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchMovieCate, fetchMovieCountry, fetchNewMovies } from '../../service/MovieService';
import { setCategoryMovies, setCountryMovies, setNewMovies } from '../MovieStore';
import '../../assest/MovieCate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import LoadingComponent from '../LoadingComponent';
import Pagination from '../Pagination'; // Import the Pagination component
import { Helmet } from 'react-helmet';

function CountryMovie() {

    const { country } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = query.get('page') || 1;
        setCurrentPage(Number(page));
    }, [location.search]);

    useEffect(() => {
        const loadCountryMovie = async () => {
            setLoading(true);
            const newMoviesData = await fetchMovieCountry(country,currentPage);
            dispatch(setCountryMovies(newMoviesData));
            setLoading(false);
        };
        loadCountryMovie();
    }, [dispatch, country, currentPage]);

    const countryMovies = useSelector((state) => state.countryMovies);

    if (loading) {
        return <LoadingComponent />; // Render LoadingComponent when loading
    }
   
    return (
        <div className='container-fluid bg-dark text-light' style={{paddingTop:'80px'}}>
            <Helmet>
                <title>Phim {countryMovies.cat.title}</title>
                <meta name="description" content={countryMovies.cat.title} />
            </Helmet>
            <h4>Danh sách Phim {countryMovies.cat.title}</h4>  {/*để tạm*/}
            <div className='row'>
                {countryMovies.items.map((movie) => (
                    <div className='col-6 col-md-2 col-sm-4 mb-3'>
                        <div className='card position-relative tooltip-wrapper border-0 w-100'>
                            <div className='img-container position-relative overflow-hidden'>
                                <img
                                    src={movie.thumb_url}
                                    alt={movie.name}
                                    className='hover-thumb w-100'
                                    height={350}
                                />
                                <div className="play-button">
                                    <Link to={`/watch/${movie.slug}`}>
                                        <FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" />
                                    </Link>
                                </div>
                            </div>
                            <div className='movie--name position-absolute'>
                                <Link to={`/watch/${movie.slug}`} className='text-decoration-none'>
                                    <h6 className='text-center text-light'>{movie.name}</h6>
                                </Link>
                            </div>
                            <div className="tooltip-content">{movie.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                totalPages={countryMovies.paginate.total_page}
                currentPage={currentPage}
                baseUrl={`/danh-sach/quoc-gia/${country}`}
            />
        </div>
    );
}

export default CountryMovie;
