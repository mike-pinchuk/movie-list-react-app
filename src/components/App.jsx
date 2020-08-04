import React from 'react';
// import moviesData from '../moviesData'
import MovieItem from './MovieItem'
import 'bootstrap/dist/css/bootstrap.min.css'
import { API_URL, API_KEY_3 } from '../utils/api'
import MovieTabs from './MovieTabs'
import '../App.css'


//UI = fn(state, props)
// console.log(moviesData)

class App extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'popularity.desc'
    }
  }

  componentDidMount() {
    // console.log('didMounted')
    this.getMovies()
    // console.log('after fetch')
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('didUpdated: ', prevProps, + ' ', prevState)
    // console.log('new', this.props, this.state)

    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies()
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then(response => {
      // console.log('then')
      return response.json()
    }).then(data => {
      // console.log('data', data)
      this.setState({
        movies: data.results
      })
    })
  }

  removeMovie = movie => {
    const updateList = this.state.movies.filter((item) => {
      return item.id !== movie.id
    })
    // console.log(updateList)
    this.setState({
      movies: updateList
    })
  }

  removeMovieFromWillWatch = movie => {
    const updateMovieWillWatch = this.state.moviesWillWatch.filter((item) => {
      return item.id !== movie.id
    })

    this.setState({
      moviesWillWatch: updateMovieWillWatch
    })

  }

  addMovieToWillWatchList = movie => {
    const updateWillWatch = [...this.state.moviesWillWatch]
    updateWillWatch.push(movie);
    this.setState({
      moviesWillWatch: updateWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  }

  render() {
    // console.log(this)

    return (
      <div className="conteiner">
        <div className="row ml-4">
          <div className="col-9">
            <div className="row mb-4 mt-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-4 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatchList={this.addMovieToWillWatchList}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-3 mt-4">
            <p>Will Watch: {this.state.moviesWillWatch.length} movies</p>
          </div>
        </div>
      </div>

    )
  }
}

// function App() {
//   return (
//     <div>
//       {moviesData[1].title}
//     </div>
//   );
// }

export default App;
