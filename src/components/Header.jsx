import { Link } from "react-router-dom";
import '../sass/header.scss'

export default function Header() {

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">Tools by Piero Nanni</Link>
                </div>

                <div className="header__menu">
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><a href="https://www.pieronanni.com/contact" target="_blank" rel="no-referer">Contact</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}