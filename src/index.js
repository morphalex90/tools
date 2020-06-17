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
      console.log(response);
      // let responseJson = await response.json();
      // console.log('test2: '+responseJson);
      this.setState({ average_star: response.body.toString() });
     } catch(error) {
      console.error(error);
    }
  }

  render() {
    document.title = 'Tools - Morpheus90' ; 
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
                    {/* {this.state.average_star.length === 0 && <div className="col-sm-12">Loading...</div>} */}
                    <div>{this.state.average_star}</div>

                    {/* {this.state.video.map(item => (
                        <div key={item.video.title} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 video">
                            <div><a href={'/video/'+item.video.video_id} title={item.video.title}>{item.video.title}</a></div>
                            <div className="video__image"><img src={this.convertImage(item.video.default_thumb, item.video.thumbs)} alt={item.video.title} /></div>
                        </div>
                    ))} */}
                </div>
            </div>
        </section>

        {/* <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <form name="contact" method="POST">
                  <input type="hidden" name="form-name" value="contact" />
                  <p>
                    <label>Your Name: <input type="text" name="name"/></label>
                  </p>
                  <p>
                    <label>Your Email: <input type="email" name="email"/></label>
                  </p>
                  <p>
                    <label>Message: <textarea name="message"></textarea></label>
                  </p>
                  <p>
                    <button type="submit">Send</button>
                  </p>
              </form>
            </div>
          </div>
        </div>
      </section> */}

      </div>
    );

  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

serviceWorker.unregister();