import React from 'react';
import Header from './../layout/Header';
import Footer from './../layout/Footer';
import Aside from './../layout/Aside';

// const API_URL = 'https://phplaravel-382225-1341568.cloudwaysapps.com';
// const API_URL = 'http://api.local';

class WatchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            message_text: '',
            message_status: '',
        };
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
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <h1>Tools by Piero Nanni</h1>
                                            <h2>This tool has been created in order to provide a little help when in trouble with SEO problematics</h2>
                                            <h3>If you have suggestions or if you want to leave a message, write me <a href="https://www.pieronanni.com/contact" target="_blank" title="Visit me!" rel="noopener noreferrer">here</a></h3>
                                        </div>
                                        <Aside />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />
                {this.state.isLoading === true && <div className="loading"></div>}
                {/* <Alert message={this.state.message_text} status={this.state.message_status} /> */}
            </React.Fragment>
        );
    }
}

export default WatchList;
