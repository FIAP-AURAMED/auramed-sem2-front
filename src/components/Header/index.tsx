import Menu from "../Menu";
import logo from '../../assets/logo.png'


export default function Header() {
    return (
        <header className="flex items-center justify-between bg-white border-b-2 border-gray-100 sticky top-0 z-40 shadow-sm md:justify-center md:gap-10" role="banner">
            <img src={logo} alt="Logo do AuraMed" className="m-2 w-25 lg:w-35" />
            <Menu />
        </header>
    )
}