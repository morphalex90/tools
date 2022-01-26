import React from 'react';
// import { Redirect } from 'react-router-dom';

// import Notifications from './../Layout/Notifications';

// import axios from 'axios';

// const API_URL = 'https://phplaravel-382225-1341568.cloudwaysapps.com';
// const API_URL = 'http://api.local';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            url: 'https://www.pieronanni.com/about',
            auth_username: '',
            auth_password: '',
            options_open: false,
        };
    }

    onOpenOptions = (e) => {
        this.setState({ options_open: !this.state.options_open });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    siteSubmit = (e) => {
        e.preventDefault();
        window.location.href = '/search/' + this.state.url;
    }

    render() {
        return (
            <header className="text-center">
                <form className="inspect" onSubmit={this.siteSubmit}>
                    <input type="text" name="url" className="inspect__url" value={this.state.url} onChange={this.onChange} required />
                    <button type="submit" className="btn">Inspect</button>
                    <a href="/" className="btn" title="Reset">Reset</a>
                    <button type="button" className="btn" onClick={this.onOpenOptions}>Options</button>
                    <div className={'options' + (this.state.options_open ? ' is-active' : '')}>

                        <br />
                        <div className="row">
                            <div className="col-sm-4 text-left">
                                <h4>HTTP Authentication</h4>
                                <p>In case the site is password protected</p>
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="auth_username">Username</label>
                                <input type="text" name="auth_username" id="auth_username" value={this.state.auth_username} onChange={this.onChange} className="inspect__username" />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="auth_password">Password</label>
                                <input type="text" name="auth_password" id="auth_password" value={this.state.auth_password} onChange={this.onChange} className="inspect_password" />
                            </div>
                        </div>
                    </div>
                </form>
            </header>
        );
    }
}

export default Header;
