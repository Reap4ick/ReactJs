import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';

const CounterPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    const products = [
        {
            id: 1,
            title: 'Product 1',
            description: 'Description for Product 1',
            imageUrl: 'https://fs1.secunda.com.ua/content/news/a11005/1.jpg', //'https://static.wikia.nocookie.net/fnaf-fanon-animatronics/images/4/40/%D0%91%D0%B0%D0%BD%D0%B0%D0%BD.png/revision/latest?cb=20190614113143&path-prefix=ru',
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Description for Product 2',
            imageUrl: 'https://fs1.secunda.com.ua/content/news/a11005/1.jpg',
        },
    ];

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const getProductQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Товари</h2>
                <button className="btn btn-primary" onClick={() => setShowCart(true)}>
                    Кошик ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </button>
            </div>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={product.imageUrl} className="card-img-top" alt="Product" />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <div className="quantity-controls">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => handleRemoveFromCart(product.id)}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{getProductQuantity(product.id)}</span>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`modal fade ${showCart ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: showCart ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Кошик</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setShowCart(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                                        <img src={item.imageUrl} alt={item.title} style={{ width: '50px' }} />
                                        <div className="flex-grow-1 mx-2">{item.title}</div>
                                        <div className="quantity-controls">
                                            <button className="btn btn-outline-secondary" onClick={() => handleRemoveFromCart(item.id)}>-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="btn btn-outline-secondary" onClick={() => handleAddToCart(item)}>+</button>
                                        </div>
                                    </div>
                                ))
                                //close
                            ) : (
                                <p>Кошик порожній</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowCart(false)}>Закрити</button>
                        </div>
                    </div>
                </div>
            </div>
            {showCart && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default CounterPage;
