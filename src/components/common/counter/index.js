import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../features/counter/counterSlice';

const CounterPage = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Збільшити значення на 1"
                    onClick={() => dispatch(increment())}
                >
                    Збільшити
                </button>
                <span>{count}</span>
                <button
                    aria-label="Зменшити значення на 1"
                    onClick={() => dispatch(decrement())}
                >
                    Зменшити
                </button>
            </div>
            <div>
                <button
                    aria-label="Збільшити значення на вказану величину"
                    onClick={() => dispatch(incrementByAmount(5))}
                >
                    Збільшити на 5
                </button>
            </div>
        </div>
    );
};

export default CounterPage;