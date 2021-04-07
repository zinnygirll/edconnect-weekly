import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
    
    return (
        <>
            <Header user={props.user} />
                <main className="mx-auto">
                    {props.children}
                </main>
            <Footer />
        </>
    )
}

export default Layout;