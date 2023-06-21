import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){

    return (
        
        <div className="py-4 px-8 flex flex-col min-h-screen">
            {/* HEADER WILL BE ALWAYS THERE */}
            
            <Header />
            {/* placeholder for child routes defined in app.jsx*/}
            <Outlet/>
        </div>
    )
}