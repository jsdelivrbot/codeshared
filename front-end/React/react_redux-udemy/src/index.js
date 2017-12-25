import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import YTSearch from "youtube-api-search";

import _ from "lodash";

const API_KEY = "AIzaSyCaa0Hx9YQgQYtcC3NHTMvA2vgEpmez_w0";

// Create a new component. This component should produce some HTML.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("surchboards");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's generated HTML nd put it on the page (DOM).
// The second parameter of the method render is an actual DOM element, into which the App component will
// be rendered and added.
ReactDOM.render(<App />, document.querySelector(".container"));
