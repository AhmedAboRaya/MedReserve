import { Outlet } from "react-router"
import Navbar from "../ui/navbar/Navbar"

const Layout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            
        </>
    )
}

export default Layout