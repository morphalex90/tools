import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import logo from './logo.svg';
import * as serviceWorker from './serviceWorker';

const API_URL = 'https://phplaravel-382225-1341568.cloudwaysapps.com';
// const API_URL = 'http://api.local';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      average_star: 0,
      count_star: 0,
      vote: '',
      ip: '',
      url: '',
      auth_username: '',
      auth_password: ''
    };
  }

  componentDidMount() {
    this.getAverageStar();
  }

  async getAverageStar() {
    try {
      let response = await fetch(API_URL+'/api/v1/tools/average_star');
      let responseJson = await response.json();
      this.setState({ average_star: responseJson.average, count_star: responseJson.count });
     } catch(error) {
      console.error(error);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  starSubmit = (e) => {
    e.preventDefault();
    this.getAverageStar(); // sync stars in footer
    const data = new FormData(e.target);
    let response = fetch(API_URL+'/api/v1/tools/star', { method: 'post', body: data})
    console.log(response);
    this.getAverageStar(); // sync stars in footer
  }

  siteSubmit = (e) => {
    e.preventDefault();
    const { url, auth_username, auth_password } = this.state;
    console.log(url + auth_username + auth_password);
  }

  render() {
    // document.title = 'Tools - Morpheus90' ; 
    const { url, auth_username, auth_password } = this.state;

    return (
      <div className="App">

        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <br />
                    <header className="text-center">
                      <form className="form-inline inspect" action="/getsiteurl" method="get" onSubmit={this.siteSubmit}>
                        <div className="form-group search-url">
                          <input type="text" name="url" className="form-control" value={url} onChange={this.onChange} required />
                        </div>
                        <input type="hidden" value="100" name="id" />
                        <button type="submit" className="btn">Inspect</button>
                        <a href="/" className="btn" title="Reset">Reset</a>
                        <a className="btn" data-toggle="collapse" href="#options">Options</a>
                        <div id="options" className="collapse">
                          <br />
                          <div className="row">
                              <div className="col-sm-4 text-left">
                                <h5>HTTP Authentication</h5>
                                <div>If your site is password protected</div>
                              </div>
                              <div className="col-sm-4">
                                  <div className="form-group">
                                    <label htmlFor="auth_username">Username</label>
                                    <input type="text" name="auth_username" id="auth_username" value={auth_username} onChange={this.onChange} className="form-control" />
                                  </div>
                              </div>
                              <div className="col-sm-4">
                                  <div className="form-group">
                                    <label htmlFor="auth_password">Password</label>
                                    <input type="text" name="auth_password" id="auth_password" value={auth_password} onChange={this.onChange} className="form-control" />
                                  </div>
                              </div>
                          </div>
                        </div>
                      </form>
                    </header>
                    
                        <ul className="nav nav-tabs" id="sections" role="tablist">
                            <li className="nav-item"><a className="nav-link active" id="link-tab" data-toggle="tab" href="#link" role="tab" aria-controls="link" aria-selected="true">Link (0)</a></li>
                            <li className="nav-item"><a className="nav-link" id="img-tab" data-toggle="tab" href="#img" role="tab" aria-controls="img" aria-selected="false">Images (0)</a></li>
                            <li className="nav-item"><a className="nav-link" id="headings-tab" data-toggle="tab" href="#headings" role="tab" aria-controls="headings" aria-selected="false">Headings (0)</a></li>
                            <li className="nav-item"><a className="nav-link" id="meta-tab" data-toggle="tab" href="#meta" role="tab" aria-controls="meta" aria-selected="false">Meta (0)</a></li>
                            <li className="nav-item"><a className="nav-link" id="robots-tab" data-toggle="tab" href="#robots" role="tab" aria-controls="robots" aria-selected="false">Robots</a></li>
                            <li className="nav-item"><a className="nav-link" id="sitemap-tab" data-toggle="tab" href="#sitemap" role="tab" aria-controls="sitemap" aria-selected="false">Sitemap</a></li>
                            <li className="nav-item"><a className="nav-link" id="others-tab" data-toggle="tab" href="#others" role="tab" aria-controls="others" aria-selected="false">Others (0)</a></li>
                            <li className="nav-item"><a className="nav-link" id="structured_data-tab" data-toggle="tab" href="#structured_data" role="tab" aria-controls="structured_data" aria-selected="false">Structured Data (0)</a></li>
                            
                              <li className="nav-item"><a className="nav-link link-error" id="errors-tab" data-toggle="tab" href="#errors" role="tab" aria-controls="errors" aria-selected="false">Errors (0)</a></li>
                            
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="link" role="tabpanel" aria-labelledby="link-tab">All links</div>
                            <div className="tab-pane fade" id="img" role="tabpanel" aria-labelledby="img-tab">All images</div>
                            <div className="tab-pane fade" id="headings" role="tabpanel" aria-labelledby="headings-tab">All headings</div>
                            <div className="tab-pane fade" id="meta" role="tabpanel" aria-labelledby="meta-tab">All meta</div>
                            <div className="tab-pane fade" id="robots" role="tabpanel" aria-labelledby="robots-tab">All robots</div>
                            <div className="tab-pane fade" id="sitemap" role="tabpanel" aria-labelledby="sitemap-tab">All sitemap</div>
                            <div className="tab-pane fade" id="others" role="tabpanel" aria-labelledby="others-tab">All others</div>
                            <div className="tab-pane fade" id="structured_data" role="tabpanel" aria-labelledby="structured_data-tab">All structured ata</div>
                            {/* @if(!empty($errors)) */}
                            <div className="tab-pane fade" id="errors" role="tabpanel" aria-labelledby="errors-tab">All errors</div>
                            {/* @endif */}
                        </div>

                    {/* <a href="#" id="main-content" title="Main Content">Main Contant</a> */}

                        <div className="content">
                            <div className="row">
                                <div className="col-sm-9">
                                    <h1>Tools by Piero Nanni</h1>
                                    <h2>This tool has been created in order to provide a little help when in trouble with SEO problematics.</h2>
                                    <h3>If you have suggestions or if you want to leave a message, check my <a href="https://www.pieronanni.com" target="_blank" title="Visit me!" rel="noopener noreferrer">website</a></h3>
                                </div>
                                <aside className="col-sm-3">
                                    <span>Do you like what are you seeing? Give me a feedback</span>
                                    <form className="vote" onSubmit={this.starSubmit}>
                                        <input type="hidden" name="ip" />
                                        <div className="radio"><label><input type="radio" name="vote" value="1" onChange={this.onChange} required /> 1 star (crappy)</label></div>
                                        <div className="radio"><label><input type="radio" name="vote" value="2" onChange={this.onChange} /> 2 star (indecent)</label></div>
                                        <div className="radio"><label><input type="radio" name="vote" value="3" onChange={this.onChange} /> 3 star (medium)</label></div>
                                        <div className="radio"><label><input type="radio" name="vote" value="4" onChange={this.onChange} /> 4 star (not bad)</label></div>
                                        <div className="radio"><label><input type="radio" name="vote" value="5" onChange={this.onChange} /> 5 star (superbe)</label></div>
                                        <button type="submit" className="btn">Submit</button>
                                        <div className="response"></div>
                                    </form>

                                </aside>
                            </div>
                        </div>
                
                </div>
            </div>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-8">Idea &amp; code by <a href="https://www.pieronanni.com" target="_blank" title="Visit me!" rel="noopener noreferrer">Piero Nanni</a>, completely rebuilt during Hack Days at <a href="https://purrgroup.com" target="_blank" title="Purr Digital">Purr Digital</a></div>
              <div className="col-sm-4 text-right">
                <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                  <meta itemProp="bestRating" content="5" />
                  {this.state.average_star === '' && <span className="loading">*</span>}<span itemProp="ratingValue">{this.state.average_star}</span><span>/5 stars from</span> {this.state.count_star === '' && <span className="loading">*</span>}<span itemProp="reviewCount">{this.state.count_star}</span> feedbacks
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