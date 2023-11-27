import SiteNav from "./SiteNav"
import UserNav from "./UserNav"
import '../styles/Header.css';
import { Link } from "react-router-dom";


export const Header = () => {
    return (
        <header className="FauxtelHeader">
            <Link to="/"><img className="FauxtelLogo" src='fauxtellogo2.svg'  alt="fauxtel hotel logo" /></Link>
            <div className="NavWrapper">
                <UserNav />
                <SiteNav />
            </div>
        </header>
    )
}