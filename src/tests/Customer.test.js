import { Customer } from "../articles/Customer";
import { fireEvent, render } from '@testing-library/react'



describe("test de la page Customer", () => {

    const setPanier = () => {
        return
    }

    it("should have a least one title", () => {
        render (<Customer setPanier={setPanier} />)
        expect(document.querySelector(".colonne-title").textContent).toBe("accusamus beatae ad facilis cum similique qui sunt")
    })

    it("should have 29 items ", () => {
        render (<Customer setPanier={setPanier} />)
        expect(document.querySelectorAll(".colonne-title").length).toBe(29)
    })
})

describe("test Customer events", () => {

    const setPanier = () => {
        return
    }

    it("should increment", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.click(document.querySelector(".colonne-element button"))
        expect(parseInt(document.querySelector(".colonne-price-left").textContent)).toBe(1)
        
    })

    it("should add 34 $ to cart", () => {
        render (<Customer setPanier={setPanier} />)
        const increment = 
        fireEvent.click(document.querySelector(".colonne-element button"))
        expect(document.querySelector(".cart-price").textContent).toBe("Total : 34 $")
    })

    it("should empty the cart", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.click(document.querySelector(".colonne-element button"))
        fireEvent.click(document.querySelector(".cart button"))
        expect(document.querySelector(".cart-price").textContent).toBe("Total : 0 $")
    })

    it("should empty reset inc", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.click(document.querySelector(".colonne-element button"))
        fireEvent.click(document.querySelector(".cart button"))
        expect(parseInt(document.querySelector(".colonne-price-left").textContent)).toBe(0)
    })
})

describe("test tris", () => {

    const setPanier = () => {
        return
    }

    it("should have 2 items by search bar", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.change( document.querySelector(".search-bar input"), {target: {value: 'acc'}})
        expect(document.querySelectorAll(".colonne-title").length).toBe(2)
    })

    it("should sort by item croissant", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.click(document.querySelectorAll(".search-bar input")[1])
        expect(document.querySelector(".colonne-price-right").textContent).toBe("22$")
    })

    it("should sort by item decroissant", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.click(document.querySelectorAll(".search-bar input")[2])
        expect(document.querySelector(".colonne-price-right").textContent).toBe("70$")
    })

    it("should sort by ordre alphabétique", () => {
        render (<Customer setPanier={setPanier} />)
        fireEvent.click(document.querySelectorAll(".search-bar input")[1])
        fireEvent.click(document.querySelectorAll(".search-bar input")[1])
        expect(document.querySelector(".colonne-price-right").textContent).toBe("34$")
    })
})
