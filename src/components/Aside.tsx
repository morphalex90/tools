import { type ChangeEvent, useState } from 'react';
import axios from '../lib/axios';
import '../sass/aside.scss'

export default function Aside() {
    const [inputs, setInputs] = useState({});
    const [response, setResponse] = useState(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const feedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setResponse(null);

        axios
            .post('/api/v1/tools/star', inputs)
            .then((response) => {
                if (response.status === 200) {
                    setResponse(response.data.message);
                }
                // this.setState({ isLoading: false });
            })
            .catch((error) => {
                setResponse(error.response.data.message);
            });
    }

    return (
        <aside className="aside">
            <div className="aside__container">
                <p>Do you find this tool useful? Let me know what do you think</p>
                <form className="feedback" onSubmit={feedbackSubmit}>
                    <div className="radio"><label><input type="radio" name="vote" value="1" onChange={handleChange} required /> 1 star (crappy)</label></div>
                    <div className="radio"><label><input type="radio" name="vote" value="2" onChange={handleChange} /> 2 star (indecent)</label></div>
                    <div className="radio"><label><input type="radio" name="vote" value="3" onChange={handleChange} /> 3 star (medium)</label></div>
                    <div className="radio"><label><input type="radio" name="vote" value="4" onChange={handleChange} /> 4 star (not bad)</label></div>
                    <div className="radio"><label><input type="radio" name="vote" value="5" onChange={handleChange} /> 5 star (superbe)</label></div>
                    <button type="submit" className="btn">Submit</button>
                    <div className="feedback__response">{response}</div>
                </form>
            </div>
        </aside>
    );
}