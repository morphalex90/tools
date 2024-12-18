import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import '../sass/footer.scss'

export default function Footer({ isLoading }: { isLoading: boolean }) {
    const [stars, setStars] = useState(null);
    const [feedbacks, setFeedbacks] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/v1/tools/average_star')
                .then((response) => {
                    setStars(response.data.average);
                    setFeedbacks(response.data.count);
                });
        }
        fetchData();
    }, []);

    return (
        <>
            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__copy">Idea &amp; code by <a href="https://www.pieronanni.me" target="_blank">Piero Nanni</a></div>
                    <div className="footer__feedbacks">
                        <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                            <meta itemProp="bestRating" content="5" />
                            {stars === null && <span className="loading">*</span>}<span itemProp="ratingValue">{stars}</span><span>/5 stars from</span> {feedbacks === null && <span className="loading">*</span>}<span itemProp="reviewCount">{feedbacks}</span> feedbacks
                        </div>
                    </div>
                </div>
            </footer>

            {isLoading === true && <div className="loading"></div>}
            {/* <Alert message={props.message_text} status={props.message_status} /> */}
        </>
    );
}