import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TfiCut } from "react-icons/tfi";
import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { deleteContactAction } from 'redux/contact/contact.slice';

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const filter = useSelector(state => state.contacts.filter);

    const filteredContacts = (filter === '')
        ? contacts
        : contacts.filter(contact => {
            return contact.name.toLowerCase().includes(filter.toLowerCase())
        });


    return (
        <ul className={css.ContactList__list}>
            {filteredContacts.map(({ id, name, number }) => (
            
                <li key={id}
                    className={css.ContactList__item}>
                    <p className={css.ContactList__name}>{name.split(" ").map((word) => {
                        return word[0].toUpperCase() + word.substring(1);
                    }).join(" ")}
                    </p>
                    <p className={css.ContactList__phone}>{number}</p>
                    <button
                        type="button"
                        className={css.ContactList__button}
                        onClick={() => dispatch(deleteContactAction(id))}
                    >
                        Delete <TfiCut size={10} />
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default ContactList;

ContactList.propTypes = {
    filteredContacts: PropTypes.arrayOf(PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })),
}