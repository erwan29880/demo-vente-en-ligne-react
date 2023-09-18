export function SearchBar ({state, dispatch}) {
    
    const handleChange = (e) => {
        dispatch({type: "search", payload : e.target.value})
    }
    const handleTriCroissant = (e) => {
        e.target.checked ? 
            dispatch({type: "croissant", payload : {croissant: true, decroissant: false}}) : 
            dispatch({type: "alphabetique"})
    } 
    const handleTriDecroissant = (e) => {
        e.target.checked ? dispatch({type: "decroissant", payload : {croissant: false, decroissant: true}}) : 
        dispatch({type: "alphabetique"})
    }

    return (

        <div className="search-bar">    

            <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" value={state.texte} onChange={(handleChange)}/>
            </div>

            <div>            
                <div className="form-check form-check-inline">
                    <input type="checkbox" name="tri-croissant" checked={state.boxes.croissant} className="form-check-input" onChange={handleTriCroissant}/>
                    <label htmlFor="tri-croissant" className="form-check-label">tri croissant</label>
                </div>

                <div className="form-check form-check-inline">
                    <input type="checkbox" name="tri-decroissant" checked={state.boxes.decroissant} className="form-check-input" onChange={handleTriDecroissant}/>
                    <label htmlFor="tri-decroissant" className="form-check-label">tri décroissant</label>
                </div>
            </div>

        </div>
        
        )
}