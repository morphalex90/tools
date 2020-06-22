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
      url: 'https://www.pieronanni.com',
      auth_username: '',
      auth_password: '',
      search: 0,
      options_open: false,
      active_tab: 'link',
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

  onOpenOptions = (e) => {
    const options_open = this.state.options_open;
    this.setState({ options_open: !options_open });
  }

  changeTab = (e) => {
    e.preventDefault();
    let tab = e.target.getAttribute('data-tab');
    console.log(tab);
    this.setState({ active_tab: tab });
  }

  starSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(API_URL+'/api/v1/tools/star', { method: 'post', body: data}).then(response => this.getAverageStar() );
  }

  siteSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(API_URL+'/api/v1/tools/step_link', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_link: response.count, step_link: response.response, search: 1 }) )
    .then(response => this.stepImage(data) );
  }

  stepImage(data) {
    fetch(API_URL+'/api/v1/tools/step_image', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_image: response.count, step_image: response.response }) )
    .then(response => this.stepHeading(data) );
  }

  stepHeading(data) {
    fetch(API_URL+'/api/v1/tools/step_heading', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_heading: response.count, step_heading: response.response }) )
    .then(response => this.stepMeta(data) );
  }

  stepMeta(data) {
    fetch(API_URL+'/api/v1/tools/step_meta', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_meta: response.count, step_meta: response.response }) )
    .then(response => this.stepRobots(data) );
  }

  stepRobots(data) {
    fetch(API_URL+'/api/v1/tools/step_robots', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_robots: response.count, step_robots: response.response }) )
    .then(response => this.stepSitemap(data) );
  }

  stepSitemap(data) {
    fetch(API_URL+'/api/v1/tools/step_sitemap', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_sitemap: response.count, step_sitemap: response.response }) )
    .then(response => this.stepOthers(data) );
  }

  stepOthers(data) {
    fetch(API_URL+'/api/v1/tools/step_others', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_others: response.count, step_others: response.response }) )
    .then(response => this.stepStructuredData(data) );
  }

  stepStructuredData(data) {
    fetch(API_URL+'/api/v1/tools/step_structured_data', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_structured_data: response.count, step_structured_data: response.response }) )
    .then(response => this.stepErrors(data) );
  }

  stepErrors(data) {
    fetch(API_URL+'/api/v1/tools/step_errors', { method: 'post', body: data})
    .then(response => response.json())
    .then(response => this.setState({ count_errors: response.count, step_errors: response.response }) );
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
                      <form className="inspect" onSubmit={this.siteSubmit}>
                        <input type="text" name="url" className="inspect__url" value={url} onChange={this.onChange} required />
                        <button type="submit" className="btn">Inspect</button>
                        <a href="/" className="btn" title="Reset">Reset</a>
                        <button type="button" className="btn" onClick={this.onOpenOptions}>Options</button>

                        <div className={this.state.options_open ? 'options is-active': 'options'}>
                          <br />
                          <div className="row">
                              <div className="col-sm-4 text-left">
                                <h4>HTTP Authentication</h4>
                                <p>In case the site is password protected</p>
                              </div>
                              <div className="col-sm-4">
                                <label htmlFor="auth_username">Username</label>
                                <input type="text" name="auth_username" id="auth_username" value={auth_username} onChange={this.onChange} className="inspect__username" />
                              </div>
                              <div className="col-sm-4">
                                <label htmlFor="auth_password">Password</label>
                                <input type="text" name="auth_password" id="auth_password" value={auth_password} onChange={this.onChange} className="inspect_password" />
                              </div>
                          </div>
                        </div>
                      </form>
                    </header>
                    
                    {this.state.search === 1 && <div>
                      <ul className="nav">
                        <li><button type="button" className={this.state.active_tab === 'link' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="link">Link ({this.state.count_link})</button></li>
                        <li><button type="button" className={this.state.active_tab === 'img' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="img">Images ({this.state.count_image})</button></li>
                        <li><button type="button" className={this.state.active_tab === 'headings' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="headings">Headings ({this.state.count_heading})</button></li>
                        <li><button type="button" className={this.state.active_tab === 'meta' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="meta">Meta ({this.state.count_meta})</button></li>
                        <li><button type="button" className={this.state.active_tab === 'robots' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="robots">Robots</button></li>
                        <li><button type="button" className={this.state.active_tab === 'sitemap' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="sitemap">Sitemap</button></li>
                        <li><button type="button" className={this.state.active_tab === 'others' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="others">Others ({this.state.count_others})</button></li>
                        <li><button type="button" className={this.state.active_tab === 'structured_data' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="structured_data">Structured Data ({this.state.count_structured_data})</button></li>
                        <li><button type="button" className={this.state.active_tab === 'errors' ? 'nav-link is-active': 'nav-link'} onClick={this.changeTab} data-tab="errors">Errors ({this.state.count_errors})</button></li>
                      </ul>

                      <div className="tab-content">
                        <div className={this.state.active_tab === 'link' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_link }} />
                        <div className={this.state.active_tab === 'img' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_image}} />
                        <div className={this.state.active_tab === 'headings' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_heading}} />
                        <div className={this.state.active_tab === 'meta' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_meta}} />
                        <div className={this.state.active_tab === 'robots' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_robots}} />
                        <div className={this.state.active_tab === 'sitemap' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_sitemap}} />
                        <div className={this.state.active_tab === 'others' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_others}} />
                        <div className={this.state.active_tab === 'structured_data' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_structured_data}} />
                        <div className={this.state.active_tab === 'errors' ? 'tab-pane is-active': 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_errors}} />
                      </div>
                    </div> }

                    {this.state.search === 0 && <div>
                      <a href="main-content" className="visually-hidden" title="Main Content">Main Contant</a>

                      <div className="content" id="main-content">
                        <div className="row">
                          <div className="col-sm-9">
                            <h1>Tools by Piero Nanni</h1>
                            <h2>This tool has been created in order to provide a little help when in trouble with SEO problematics</h2>
                            <h3>If you have suggestions or if you want to leave a message, check my <a href="https://www.pieronanni.com" target="_blank" title="Visit me!" rel="noopener noreferrer">website</a></h3>
                          </div>
                          <aside className="col-sm-3">
                            <span>Do you find this tool useful? Tell me what do you think</span>
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
                    </div> }
                
                </div>
            </div>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-8">Idea &amp; code by <a href="https://www.pieronanni.com" target="_blank" title="Visit me!" rel="noopener noreferrer">Piero Nanni</a>, first rebuild in Laravel during Hack Days at <a href="https://purrgroup.com" title="Purr Digital">Purr Digital</a>, second rebuild in Lumen + React</div>
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