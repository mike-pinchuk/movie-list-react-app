import React from 'react';
import moviesData from '../moviesData'
import MovieItem from './MovieItem'
import 'bootstrap/dist/css/bootstrap.min.css'

//UI = fn(state, props)
// console.log(moviesData)

class App extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    }
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
    console.log(this.moviesWillWatch)
    this.setState({
      moviesWillWatch: updateWillWatch
    });
  };

  render() {
    // console.log(this)
    return (
      <div className="conteiner">
        <div className="row">
          <div className="col-9">
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
          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
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
