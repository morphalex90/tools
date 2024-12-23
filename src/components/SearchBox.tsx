// import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import axios from '../lib/axios';
import '../sass/searchbox.scss'

export default function SearchBox() {
    const [inputs, setInputs] = useState({ url: '' });
    const [optionsToggle, setOptionsToggle] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const handleOptionsToggle = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setOptionsToggle(!optionsToggle)
    }

    const sendData = (e: FormEvent) => {
        e.preventDefault();
        // console.log(inputs);

        axios.post('/api/v1/tools/scans', inputs)
            .then((response) => {
                // console.log(response.data);
                window.location.href = '/scan/' + response.data.uuid
            });
    }

    return (
        <section className="search-box">
            <div className="search-box__container">
                <form className="inspect" onSubmit={sendData}>
                    <label htmlFor="url" className="visually-hidden">Url</label>
                    <input type="url" name="url" id="url" className="search-box__url" required value={inputs.url} onChange={handleChange} maxLength={255} />
                    <button type="submit" className="btn">Scan</button>
                    <button type="button" className="btn" onClick={handleOptionsToggle}>Options</button>

                    <div className={'search-box__options' + (optionsToggle === false ? '' : ' --open')}>
                        <br />
                        <div>Work in Progress!</div>
                        {/* <h4>HTTP Authentication</h4>
                        <p>In case the site is password protected</p>
                        <label htmlFor="auth_username">Username </label>
                        <input type="text" name="auth_username" id="auth_username" className="inspect__username" onChange={handleChange} />
                        <br />
                        <label htmlFor="auth_password">Password </label>
                        <input type="text" name="auth_password" id="auth_password" className="inspect_password" onChange={handleChange} /> */}
                    </div>
                </form>
            </div>
        </section>
    );
}