import React from 'react';

// import axios from 'axios';

const API_URL = 'https://phplaravel-382225-1341568.cloudwaysapps.com';
// const API_URL = 'http://api.local';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            average_star: 0,
            count_star: 0,
        };
    }

    componentDidMount() {
        this.getAverageStar();
    }

    async getAverageStar() {
        try {
            let response = await fetch(API_URL + '/api/v1/tools/average_star');
            let responseJson = await response.json();
            this.setState({ average_star: responseJson.average, count_star: responseJson.count, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
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
        );
    }
}

export default Footer;
