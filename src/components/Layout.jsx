// import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import '../sass/layout.scss'

export default function Layout(props) {

    return (
        <>
            <Header />
            <main id="main-content" className={'main' + (props.page ? ' main__' + props.page : '')}>
                <div className="main__container">
                    {props.children}
                </div>
            </main>
            <Footer isLoading={props.isLoading} />
        </>
    );
}