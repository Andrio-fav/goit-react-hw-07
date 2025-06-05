import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import css from './App.module.css'

import userData from './userData.json'
export default function App() {
  const STORAGE_KEY = 'contacts';

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || userData,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  function addContact(values, actions) {
    values.id = values.name + values.number;
    setContacts((prev) => {
      return [...prev, values];
    });
    actions.resetForm();
  }
  
  function delContact(id) {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  }

  const [filterValue, setFilterValue] = useState('');
  function filterDebounce() {
    let timeoutId;
    return function (event) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setFilterValue(event.target.value);
      }, 300);
    };
  }
  const onChange = filterDebounce();
  
  // const filtredContacts = contacts;
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase()),
  );
  console.log('App refresh');

  return (
    <div className={css.wrapper}>
       <h1>Phonebook</h1>
       <ContactForm handleSubmit={addContact} />
       <SearchBox filterValue={filterValue} onChange={onChange} />
       <ContactList contacts={filteredContacts} onDelete={delContact} />
    </div>
  )
}
