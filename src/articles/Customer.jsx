import { useEffect, useReducer } from "react"
import data from '../data/data'
import '../css/style.css'
import { Cart } from "./Cart"
import { SearchBar } from "./SearchBar"
import {Colonnes} from './Colonnes'

// reducer de tri et de gestion de panier
function reducerSort (state, action) {
    switch (action.type) {
        case "alphabetique": 
            // tri alphabétique des articles
            return {...state, 
                data: state.data.sort((a, b) => (a.title > b.title ? 1 : -1)),
                boxes : {
                    croissant: false,
                    decroissant: false
                }
        }
        case "croissant" : 
            // tri croissant des articles
            return {...state, 
                data: state.data.sort((a, b) => (parseInt(a.price.replace("$", "")) > parseInt(b.price.replace("$", "")) ? 1 : -1)),
                boxes : {
                    croissant: action.payload.croissant,
                    decroissant: action.payload.decroissant
                }
        }
        case "decroissant" : 
            // tri décroissant des articles
            return {...state, 
                data: state.data.sort((a, b) => (parseInt(a.price.replace("$", "")) > parseInt(b.price.replace("$", "")) ? -1 : 1)),
                boxes : {
                    croissant: action.payload.croissant,
                    decroissant: action.payload.decroissant
                }
            }
        case "search" :
            // recherche par titre d'article
            const data = []
            state.initialData.forEach(el => {
                if (el.title.search(action.payload) !== -1) {
                    data.push(el)
                }
            }) 
            return {...state, data: data, texte: action.payload}
        case "ids": 
            // initialisation quantités à 0
            const dic = {}    
            state.data.map(el => dic[el.id] = 0)
            return {...state, ids: dic}
        case "adId":
            // ajout d'une quantité pour un article
            return {...state, 
                ids : {...state.ids, [action.payload.id] : state.ids[action.payload.id] + 1},
                cart: state.cart + parseInt(action.payload.price.replace("$", ""))     
            }
        case "resetCart":
            // réinitialisation du total et des quantités d'articles
            const dico = {}    
            state.data.map(el => dico[el.id] = 0)
            return {...state, ids: dico, cart: 0}

        default :
            return {...state}
    }
}

export function Customer ({setPanier}) {

    // initialisation reducer
    const [state, dispatch] = useReducer (reducerSort, {
        data : data,
        texte: "",
        initialData: [...data],
        boxes: {
            croissant: false,
            decroissant: false
        },
        ids: {},
        cart: 0
    })

    // initialiser les quantités d'articles à 0
    useEffect(() => {
        dispatch({type: "ids"})
    }, [])
   
    // mise à jour du composant parent Rooting
    useEffect(() => {
        setPanier(state)
    },[state.cart])

    // dispatch impossible dans Cart, bug non résolu
    const toogleCart = () => {
        dispatch({type: "resetCart"})
    }


    return (
        <div>
            <div className="row">

                <div className="col col-3">
                    <Cart state={state} toogleCart={toogleCart} />
                </div> 
                
                <div className="col col-9">
                    <SearchBar state={state} dispatch={dispatch} />
                    <Colonnes state={state} dispatch={dispatch} />
                </div> 

                <div className="footer"></div>

            </div>
        </div>
    )
}