import { SiteNav } from "./SiteNav"
import { UserNav } from "./UserNav"
import '../styles/Header.css';
import { Link } from "react-router-dom";
import BookNav from "./BookNav";


export const Header = () => {
    return (
        <header className="HeaderWrapper">
            <div className='FauxtelHeader'>
                <Link to="/"><img className="FauxtelLogo" src='fauxtellogo2.svg' alt="fauxtel hotel logo" /></Link>
                <div className="BookNowWrapper">
                    <BookNav />
                </div>  
                <UserNav />
            </div>




            <div className="NavWrapper">
                <hr className='headerDivider' />
                <SiteNav />
            </div>
        </header>
    )
}
