const URL = require ("../assets/fake.png")
const IMGWIDTH = parseInt(window.innerWidth/5) - 20 

export function Colonnes ({state, dispatch}) {
  
    return (

        <div className="colonnes">
        {state.data.map((el, inc) => {

            return (
                // élements flex
                <div key={`div-${inc}`} className="colonne-element" >
                    
                    {/* titre */}
                    <p key={`title-${inc}`} className="colonne-title">{el.title}</p>
                    
                    {/* image */}
                    <div className="colonne-image">
                        <img key={`image-${inc}`} width={IMGWIDTH} src={URL} alt="" />
                    </div>

                    {/* affichage clics et prix */}
                    <div className="colonne-price">
                        <div className="colonne-price-left">{state.ids[el.id]}</div>
                        <div className="colonne-price-right">{el.price}</div>
                    </div>

                    {/* boutons ajout panier */}
                    <div>
                        <button
                            onClick={() => dispatch({type: "adId", payload: {id: el.id, price: el.price }})}
                            className="btn btn-success colonne-button"
                            key={`button-${inc}`}>
                                ajouter au panier
                        </button>
                    </div>

                </div> 
                // fin colonne element
            )
         
         })}
        </div>
    )
}