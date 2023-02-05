import React from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css';
// import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { contactsFilterAction } from "redux/contact/contact.slice";

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.contacts.filter);

    
    const handleFilter = evt => {
        dispatch(contactsFilterAction(evt.currentTarget.value))
    }

    
    return (
        <label>
            <p className={css.Filter__filter}>
                Find contacts by name 
            </p>
            <input
                type="text"
                className={css.Filter__input}
                value={filter}
                onChange={handleFilter}
            />
        </label> 

    );
}

export default Filter;

Filter.propTypes = {
    value: PropTypes.string,
}