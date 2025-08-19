import Footer from "./Footer"
import Navbar from "./Navbar"
import '@fontsource-variable/rubik';

const Layout = ({children}) =>{
    return (
        <>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}

export default Layout;