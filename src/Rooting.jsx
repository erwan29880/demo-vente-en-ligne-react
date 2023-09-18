import { useState, useEffect } from "react"
import { CartIcon } from "./icons/Icons"
import {Customer} from "./articles/Customer"
import { CartPage } from "./cart/CartPage"


function NavBar () {
    
    // panier -> vient de l'enfant Customer, et transmis au CartPage
    const [panier, setPanier] = useState({})
    const [page, setPage] = useState(<Customer setPanier={setPanier}/>)

    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                    <button className="btn btn-success" onClick={() => setPage(<Customer setPanier={setPanier} />)}>Articles</button>
                    <a className="navbar-brand" href="#">Ma Boutique</a>
                    <div>
                        <button className="btn btn-success me-3" onClick={() => setPage(<CartPage panier={panier}/>)}><CartIcon /></button>
                    </div>
            </nav>
            <h1>Vente en ligne !</h1>

        {page}
        </div>
    )
    
}

export function Rooting () {
    
    return (
        <div>
            <NavBar />
        </div>
    )
}