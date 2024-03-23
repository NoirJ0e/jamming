import React, { useState } from 'react';
// Import useSelector() and useDispatch() hooks from react-redux
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectCount,
} from './counterSlice';

function Counter() {
  // Create a useSelector() hook for selectCount and set it to a variable called count
  const count = useSelector(selectCount);
  // Create a useDispatch() hook and set it to a variable called dispatch
  const dispatch = useDispatch();

  return (
    <div>
      <div className='item-counter'>
        <button className='remove-btn' aria-label="Decrement value"
          onClick={() => {dispatch(decrement())}}
        >
          -
        </button>
        <span className='counter-text'>{count}</span>
        <button className='add-btn' aria-label="Increment value"
          onClick={() => {dispatch(increment())}}
        >
          +
        </button>
      </div>
      <div className='add-to-cart'>
        <button className='add-to-cart-btn' onClick={() => alert(`Added ${count} items to the cart!`)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
export default Counter;
