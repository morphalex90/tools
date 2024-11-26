import { ReactNode } from "react";
// import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import '../sass/layout.scss'

export default function Layout({ page, children, isLoading }: { page: string, children: ReactNode, isLoading?: boolean }) {

    return (
        <>
            <Header />
            <main id="main-content" className={'main' + (page ? ' main__' + page : '')}>
                <div className="main__container">
                    {children}
                </div>
            </main>
            <Footer isLoading={isLoading || false} />
        </>
    );
}