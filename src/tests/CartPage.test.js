import {CartPage} from "../cart/CartPage"
import { Customer } from "../articles/Customer";
import { fireEvent, render } from '@testing-library/react'


describe("test du cart page", () => {

    // data pour test à passer au composant
    const data = {
        data: [
            {
                id: 1,
                title: "item1",
                price: "10$"
            },
            {
                id: 2,
                title: "item2",
                price: "20$"
            }
        ],
        ids: {
            1: 2,
            2: 0
        }
    }

    it("should have one item in cart", () => {
        render (<CartPage panier={data}/>)
        expect(document.querySelectorAll("td")[3].textContent).toBe("20 $")
        expect(document.querySelectorAll("td")[1].textContent).toBe("2")
    })

    it("should have 3 same articles in cart", () => {
        render (<CartPage panier={data}/>)
        fireEvent.click(document.querySelectorAll("table button")[1])
        expect(document.querySelectorAll("td")[3].textContent).toBe("30 $")
    })

    it("should have 1 same article in cart", () => {
        render (<CartPage panier={data}/>)
        fireEvent.click(document.querySelector("table button"))
        expect(document.querySelectorAll("td")[3].textContent).toBe("10 $")

    })

})