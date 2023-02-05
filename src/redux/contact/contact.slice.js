import { createSlice } from '@reduxjs/toolkit';
import { contactsInitState } from './contact.init-state';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Notiflix from 'notiflix';

const contactSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitState,
    reducers: {
        addContactAction: (state, { payload }) => {
            const newContact = state.contacts.find(contact => (
                contact.name.toLowerCase() === payload.name.toLowerCase()
                ||
                contact.number === payload.number
            ));
            if (newContact) {
                return Notiflix.Notify.warning(`${newContact.name} is already in your phonebook `)
            } else {
                state.contacts.push(payload);
            }
        },
        contactsFilterAction: (state, { payload }) => {
            state.filter = payload;
        },
        deleteContactAction: (state, { payload }) => {
            state.contacts = state.contacts.filter(contact => contact.id !== payload)
        },

    },
});

export const { contactsFilterAction, deleteContactAction, addContactAction } = contactSlice.actions;
//******* */
const persistConfig = {
    key: 'myPhoneBook',
    storage,
    // blacklist: ['filter'],
}
export const contactsReducer = persistReducer(persistConfig, contactSlice.reducer);