import React from 'react';
import Header from './../layout/Header';
import Footer from './../layout/Footer';

import axios from 'axios';
const API_URL = 'https://phplaravel-382225-1341568.cloudwaysapps.com';
// const API_URL = 'http://api.local';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

            search: 0,
            active_tab: 'link',
            message_status: '',
            message_text: '',
        };
    }

    componentDidMount() {
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeTab = (e) => {
        e.preventDefault();
        let tab = e.target.getAttribute('data-tab');
        // console.log(tab);
        this.setState({ active_tab: tab });
    }

    siteSubmit = (e) => {
        this.setState({ isLoading: true });
        e.preventDefault();
        const data = new FormData(e.target);
        fetch(API_URL + '/api/v1/tools/step_link', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_link: response.count, step_link: response.response, search: 1 }))
            .then(response => this.stepImage(data));
    }

    stepImage(data) {
        fetch(API_URL + '/api/v1/tools/step_image', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_image: response.count, step_image: response.response }))
            .then(response => this.stepHeading(data));
    }

    stepHeading(data) {
        fetch(API_URL + '/api/v1/tools/step_heading', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_heading: response.count, step_heading: response.response }))
            .then(response => this.stepMeta(data));
    }

    stepMeta(data) {
        fetch(API_URL + '/api/v1/tools/step_meta', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_meta: response.count, step_meta: response.response }))
            .then(response => this.stepRobots(data));
    }

    stepRobots(data) {
        fetch(API_URL + '/api/v1/tools/step_robots', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_robots: response.count, step_robots: response.response }))
            .then(response => this.stepSitemap(data));
    }

    stepSitemap(data) {
        fetch(API_URL + '/api/v1/tools/step_sitemap', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_sitemap: response.count, step_sitemap: response.response }))
            .then(response => this.stepOthers(data));
    }

    stepOthers(data) {
        fetch(API_URL + '/api/v1/tools/step_others', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_others: response.count, step_others: response.response }))
            .then(response => this.stepStructuredData(data));
    }

    stepStructuredData(data) {
        fetch(API_URL + '/api/v1/tools/step_structured_data', { method: 'post', body: data })
            .then(response => response.json())
            .then(response => this.setState({ count_structured_data: response.count, step_structured_data: response.response, isLoading: false })); //// IS LOADING
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <br />
                            <Header />

                            <div>
                                <a href="main-content" className="visually-hidden" title="Main Content">Main Contant</a>

                                <div className="content" id="main-content">




                                    {this.state.search === 1 && <div>
                                        <ul className="nav">
                                            <li><button type="button" className={this.state.active_tab === 'link' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="link">Link ({this.state.count_link})</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'img' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="img">Images ({this.state.count_image})</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'headings' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="headings">Headings ({this.state.count_heading})</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'meta' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="meta">Meta ({this.state.count_meta})</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'robots' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="robots">Robots</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'sitemap' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="sitemap">Sitemap</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'others' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="others">Others ({this.state.count_others})</button></li>
                                            <li><button type="button" className={this.state.active_tab === 'structured_data' ? 'nav-link is-active' : 'nav-link'} onClick={this.changeTab} data-tab="structured_data">Structured Data ({this.state.count_structured_data})</button></li>
                                        </ul>

                                        <div className="tab-content">
                                            <div className={this.state.active_tab === 'link' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_link }} />
                                            <div className={this.state.active_tab === 'img' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_image }} />
                                            <div className={this.state.active_tab === 'headings' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_heading }} />
                                            <div className={this.state.active_tab === 'meta' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_meta }} />
                                            <div className={this.state.active_tab === 'robots' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_robots }} />
                                            <div className={this.state.active_tab === 'sitemap' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_sitemap }} />
                                            <div className={this.state.active_tab === 'others' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_others }} />
                                            <div className={this.state.active_tab === 'structured_data' ? 'tab-pane is-active' : 'tab-pane'} dangerouslySetInnerHTML={{ __html: this.state.step_structured_data }} />
                                        </div>
                                    </div>}





                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />
                {this.state.isLoading === true && <div className="loading"></div>}

                {this.state.message_status !== '' &&
                    <div className={'message message__' + this.state.message_status}>
                        <div>{this.state.message_text}</div>
                    </div>
                }
            </React.Fragment>
        );

    }
}

export default Search;