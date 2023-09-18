import { useEffect, useReducer } from "react"

// tri inititial du panier : enlever les articles non sélectionnés
// le panier vient de Customer (state), puis de Rooting
function triInitialePanier (panier) {
    const articlesSelectionnes = []
    let totaux = 0

    for (let i = 1; i < panier.data.length ; i++ ) {
        //qté supérieure à zéro
        if (parseInt(panier.ids[i]) > 0) {
            // variables mises en forme
            const title = panier.data[i-1].title.slice(0, 30) + "..."
            const nbArticles = parseInt(panier.ids[i]) 
            const prix = parseInt(panier.data[i-1].price.replace("$", ""))
            const total = nbArticles * prix

            //total
            totaux += total

            // ajout au tableau 2d
            articlesSelectionnes.push([title, nbArticles, prix, total])
        }
    }
    return {
        articles: articlesSelectionnes,
        totaux: totaux
    }
    
}


// retourne une liste avec les articles et l'article enlevé ou ajouté
// retourne le nouveau total 
function modifyCart(panier, ligne, how) {
    const nouveauPanier = []
    let newTotal = 0

    for (let i = 0; i < panier.length ; i ++) {
        // ajouter la ligne si non sélectionnée
        if (i !== ligne) {
            nouveauPanier.push(panier[i])
            newTotal += panier[i][3]
        } else {
            // si décrément, on passe 
            if (panier[i][1] === 1 && how === "moins") continue 
            else {
                // calcul nouvelle quantité, nouveau sous-total, nouveau total
                const newQte = how === "moins" ? panier[i][1] -1 : panier[i][1] + 1
                const newTotalProv = newQte * panier[i][2] 
                nouveauPanier.push([panier[i][0], newQte, panier[i][2], newTotalProv])
                newTotal += newTotalProv
            }
        }
    }
    return {
        articles: nouveauPanier,
        totaux: newTotal
    }

}

// ajouter ou retirer un article du panier
function reducer(state, action) {
    switch(action.type) {
        case "moins":
            const newPanierMoins = modifyCart(state.panier, action.payload, "moins") 
            return {...state, panier: newPanierMoins.articles, total: newPanierMoins.totaux}
        case "plus":
            const newPanierPlus = modifyCart(state.panier, action.payload, "plus") 
            return {...state, panier: newPanierPlus.articles, total: newPanierPlus.totaux}
        default:
            return {...state}
    }
}

export function CartPage ({panier}) {

    const [state, dispatch] = useReducer(reducer, {
        panier: triInitialePanier(panier).articles,
        total: triInitialePanier(panier).totaux
    })

    return (
        <div className="row">
            <table className="table">
                <thead>
                    <tr key={`entete`}>
                    <th key={`karticle`}>article</th>
                    <th key={`knb`}>nombre d'articles</th>
                    <th key={`kprix`}>prix unitaire</th>
                    <th key={`ktotal`}>total</th>
                    <th key={`kmoins`}></th>
                    <th key={`kplus`}></th>
                    </tr>
                </thead>
                <tbody>

                {state.panier.map((el, inc) => {
                    return (
                        <tr key={`${el[0]}tr`}>
                            <td key={`${el[0]}0`}>{el[0]}</td>
                            <td key={`${el[0]}1`}>{el[1]}</td>
                            <td key={`${el[0]}2`}>{el[2]} $</td>
                            <td key={`${el[0]}3`}>{el[3]} $</td>
                            <td key={`${el[0]}4`}>
                                <button className="btn btn-danger" onClick={() => dispatch({type:"moins", payload: inc})}>-</button>
                            </td>
                            <td key={`${el[0]}5`}>
                                <button className="btn btn-primary" onClick={() => dispatch({type:"plus", payload: inc})}>+</button>
                            </td>
                        </tr>
                   )
                })}
                <tr style={{borderTop: "3px solid darkgreen"}} key={`trtotal`}>
                            <td key={`total0`}></td>
                            <td key={`total1`}></td>
                            <td key={`total2`}></td>
                            <td key={`total3`}><b>{state.total} $</b></td>
                            <td key={`total4`}></td>
                            <td key={`total5`}></td>
                        </tr>
                </tbody>
                </table>


                <button className="btn btn-primary" disabled>Payer</button>
        </div>
    )
}
