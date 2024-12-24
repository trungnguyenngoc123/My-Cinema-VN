import { configureStore, createSlice } from '@reduxjs/toolkit';
const newMovieSlice = createSlice({
    name: 'newMovies',
    initialState: [],
    reducers: {
        setNewMovies(state, action) {
            return action.payload;
        }
    }
});
const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: {},
    reducers: {
        setMovieDetails(state, action) {
            return action.payload;
        }
    }
});
const categoryMoviesSlice = createSlice({
    name: 'categoryMovies',
    initialState: {},
    reducers: {
        setCategoryMovies(state, action) {
            return action.payload;
        }
    }
});
const searchMovieSlide = createSlice({
    name: 'SearchMovies',
    initialState: {},
    reducers: {
        setSearchMovies(state, action) {
            return action.payload;
        }
    }
});
const countryMoviesSlice = createSlice({
    name: 'countryMovies',
    initialState: {},
    reducers: {
        setCountryMovies(state, action) {
            return action.payload;
        }
    }
});
// test
const chinaMoviesSlice = createSlice({
    name: 'chinaMovies',
    initialState: {},
    reducers: {
        setChinaMovies(state, action) {
            return action.payload;
        }
    }
});
const koreanMoviesSlice = createSlice({
    name: 'koreanMovies',
    initialState: {},
    reducers: {
        setKoreanMovies(state, action) {
            return action.payload;
        }
    }
});
const europeMoviesSlice = createSlice({
    name: 'europeMovies',
    initialState: {},
    reducers: {
        setEuropeMovies(state, action) {
            return action.payload;
        }
    }
});
const vietNamMoviesSlice = createSlice({
    name: 'vietNamMovies',
    initialState: {},
    reducers: {
        setVietNamMovies(state, action) {
            return action.payload;
        }
    }
});
const adventureMovieSlice = createSlice({
    name: 'adventureMovies',
    initialState: {},
    reducers: {
        setAdventureMovies(state, action) {
            return action.payload;
        }
    }
});
const horrifiedMovieSlice = createSlice({
    name: 'horrifiedMovies',
    initialState: {},
    reducers: {
        setHorrifiedMovies(state, action) {
            return action.payload;
        }
    }
});
const actionMovieSlice = createSlice({
    name: 'actionMovies',
    initialState: {},
    reducers: {
        setActionMovies(state, action) {
            return action.payload;
        }
    }
});
const comedyMovieSlice = createSlice({
    name: 'comedyMovies',
    initialState: {},
    reducers: {
        setComedyMovies(state, action) {
            return action.payload;
        }
    }
});
//////////
export const { setNewMovies } = newMovieSlice.actions;
export const { setMovieDetails } = movieDetailsSlice.actions;
export const { setCategoryMovies } = categoryMoviesSlice.actions;
export const { setSearchMovies } = searchMovieSlide.actions;
export const { setCountryMovies } = countryMoviesSlice.actions;
// test
export const { setChinaMovies } = chinaMoviesSlice.actions;
export const { setKoreanMovies } = koreanMoviesSlice.actions;
export const { setEuropeMovies } = europeMoviesSlice.actions;
export const { setAdventureMovies } = adventureMovieSlice.actions;
export const { setHorrifiedMovies } = horrifiedMovieSlice.actions;
export const { setActionMovies } = actionMovieSlice.actions;
export const { setComedyMovies } = comedyMovieSlice.actions;
export const { setVietNamMovies } = vietNamMoviesSlice.actions;
const store = configureStore({
    reducer: {
        newMovies: newMovieSlice.reducer,
        movieDetails: movieDetailsSlice.reducer,
        categoryMovies: categoryMoviesSlice.reducer,
        searchMovies: searchMovieSlide.reducer,
        countryMovies: countryMoviesSlice.reducer,
        // test
        chinaMovies: chinaMoviesSlice.reducer,
        koreanMovies: koreanMoviesSlice.reducer,
        europeMovies: europeMoviesSlice.reducer,
        vietNamMovies: vietNamMoviesSlice.reducer,
        adventureMovies: adventureMovieSlice.reducer,
        horrifiedMovies: horrifiedMovieSlice.reducer,
        actionMovies: actionMovieSlice.reducer,
        comedyMovies: comedyMovieSlice.reducer
    }
});

export default store;
