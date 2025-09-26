import Menu from "../Menu";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="flex items-center justify-between bg-white border-b-2 border-gray-100 sticky top-0 z-40 shadow-sm md:justify-center md:gap-10" role="banner">
            <Link to="/"><img src={logo} alt="Logo do AuraMed" className="m-2 w-25 " /></Link>
            <Menu />
        </header>
    )
}