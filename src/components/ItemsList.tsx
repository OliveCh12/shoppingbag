import React, { useContext, useState } from 'react'
import { GlobalContext } from "../GlobalContext"
import "boxicons";

const ItemsList = () => {

    const [usersContext, setUsersContext] = useContext(GlobalContext);
    const [isVisible, setIsVisible] = useState(false)

    // Remove User to Global Context
    function removeItem(userIndex: number, itemIndex: number): void {
        const initialState = [...usersContext]
        initialState[userIndex].items.splice(itemIndex, 1)
        setUsersContext(initialState)
    }

    // Format Number as a currency
    function formatPrice(price: number) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
    }

    // Sum all values together
    function sumOfValues() {
        const itemsValues = usersContext.map((user: any) => user.items).flat(1).map((item: any) => item.quantity * item.price)
        if (itemsValues.length === 0) {
            return formatPrice(0)
        }
        return formatPrice(itemsValues.reduce((a: number, b: number) => a + b))
    }





    return (
        <div className="card" style={{ gridColumn: 2, gridRow: "1 / span 2" }}>
            <div className="card__header">
                <h3>Items</h3>
                <span>Total : <strong>{sumOfValues()}</strong></span>
            </div>

            <div className="card__body" style={{ overflow: "auto", height: "60vh" }}>
                {usersContext.map((user: any, userIndex: number) => (
                    <div className="list">
                        {user.items.length === 0 ? (
                            ""
                        ) :
                            (
                                <div className="list__item-header">
                                    <div className="list__item-user" style={{ color: user.color }}>
                                        <span>{user.username}</span>
                                        <box-icon type='solid' name='down-arrow-circle' onClick={() => setIsVisible(!isVisible)}></box-icon>
                                    </div>
                                </div>
                            )}
                        <div className="list__items">
                            {user.items.map((item: any, itemIndex: number) => (
                                <div className="list__item--big" style={{ borderRight: `8px solid ${user.color}` }}>
                                    <div className="list__item-body">
                                        <div className="list__item-header">
                                            <div className="list__item-name"><strong>{item.name}</strong></div>
                                            <button className="button button--transparent" onClick={() => removeItem(userIndex, itemIndex)}>
                                                <box-icon name='x-circle'></box-icon>
                                            </button>
                                        </div>
                                        <div className="list__item-footer">
                                            <span>Quantity : {item.quantity}</span>
                                            <span>Unit Price: {formatPrice(item.price)}</span>
                                            <span className="list__item-price">{formatPrice(item.quantity * item.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="card__footer">
                <span className="card__total">{sumOfValues()}</span>
            </div>
        </div>
    )
}

export default ItemsList