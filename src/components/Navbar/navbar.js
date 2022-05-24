import React, { Component } from "react"
import {MenuItems} from "./MenuItems"
import "./Navbar.css"
import 'font-awesome/css/font-awesome.min.css';
import {Button} from "../Button"
import { Link, useLocation, Outlet } from "react-router-dom"


class Navbar extends Component {
    state = {
        clicked: false
    }


    render() {
        return (
            <nav className="NavbarItems">
                <h1><a className="nav-links" style={{textDecoration: "none"}} href="/">PlayGames</a></h1>
                <ul className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>{item.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar