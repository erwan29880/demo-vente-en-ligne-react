export function Cart ({state, toogleCart}) {
    
    return (
        <div className="cart">
            <p className="cart-title">Panier</p>
            <p className="cart-price">Total : {state.cart} $</p>
            <button className="btn btn-success btn-cart" onClick={toogleCart}>vider le panier</button>
        </div>
    )
}