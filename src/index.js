import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import logo from './logo.svg';
import * as serviceWorker from './serviceWorker';

// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
// let url = 'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&thumbsize=big&ordering=newest';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { average_star: '' };
  }

  componentDidMount() {
    this.getAverageStar();
  }

  async getAverageStar() {
    try {
      let response = await fetch('https://phplaravel-382225-1341568.cloudwaysapps.com/api/v1/tools/average_star');
      // let response = await fetch('http://api.local/api/v1/tools/average_star');
      let responseJson = await response.json();
      this.setState({ average_star: responseJson });
     } catch(error) {
      console.error(error);
    }
  }

  render() {
    // document.title = 'Tools - Morpheus90' ; 
    // document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically";

    return (
      <div className="App">
        <header className="header">
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-sm-4"><img src={logo} className="App-logo" alt="logo" title="Logo" /></div> */}
                    <div className="col-sm-8">Menu</div>
                </div>
            </div>
        </header>

        <section>
            <div className="container-fluid">
                <div className="row">
                    <h1 className="col-sm-12">Tools</h1>

                </div>
            </div>
        </section>

        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">Idea &amp; code by <a href="https://www.pieronanni.com" target="_blank" title="Visit me!">Piero Nanni</a>, completely rebuilt during Hack Days at <a href="https://purrgroup.com" target="_blank" title="Purr Digital">Purr Digital</a></div>
                    <div className="col-sm-4 text-right">
                        <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                            <meta itemProp="bestRating" content="5" />
                            {this.state.average_star.length === 0 && <span className="loading">*</span>}<span itemProp="ratingValue">{this.state.average_star}</span><span>/5 stars based on</span> <span itemProp="reviewCount">5</span> customer reviews                             
                        </div>
                    </div>
                </div>
            </div>
        </footer>

      </div>
    );

  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

serviceWorker.unregister();