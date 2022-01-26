import React from 'react';

// import Notifications from './../Layout/Notifications';

import axios from 'axios';

const API_URL = 'https://phplaravel-382225-1341568.cloudwaysapps.com';
// const API_URL = 'http://api.local';

class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            vote: '',
            ip: '',
        };
    }

    starSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });

        let data = new FormData(e.target);

        axios
            .post(API_URL + '/api/v1/tools/star', data)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ message_status: 'success', message_text: 'Thank you' }, () => this.getAverageStar());
                }
                this.setState({ isLoading: false });
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    this.setState({ message_status: 'warning', message_text: error.response.data.vote[0] });
                } else {
                    console.log(error);
                    this.setState({ message_status: 'error', message_text: 'Something went bananas, contact the administrator' });
                }
                this.setState({ isLoading: false });
            });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            // https://upload.wikimedia.org/wikipedia/commons/5/57/FA_star.svg
            <aside className="col-sm-3">
                <span>Do you find this tool useful? Let me know what do you think</span>
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
        );
    }
}

export default Aside;
