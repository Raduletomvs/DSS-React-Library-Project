import React, { useState } from 'react';
import './App.css';

const booksData = [{
    id: 1,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    isbn: "978-0140280197",
    price: "$19.99",
    publicationDate: "1998-09-01"
},

{
    id: 2,
    title: "The 80/20 Principle",
    author: "Richard Koch",
    isbn: "978-0385491747",
    price: "$17.99",
    publicationDate: "1949-06-08",
},

{
    id: 3,
    title: "Are You Indispensable?",
    author: "Seth Godin",
    isbn: "978-1591844099",
    price: "$15.99",
    publicationDate: "2010-01-26",
}]

function App() {
    const [books, setBooks] = useState(booksData);
    const [selectedBook, setSelectedBook] = useState({ id: '', title: '', author: '', isbn: '', price: '', publicationDate: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedBook({ ...selectedBook, [name]: value });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const validateBook = () => {
        if (!selectedBook.title || !selectedBook.author || !selectedBook.isbn || !selectedBook.price || !selectedBook.publicationDate) {
            alert('All fields must be filled out');
            return false;
        }
        return true;
    };

    const handleSave = () => {
        if (!validateBook()) return;

        const formattedDate = formatDate(selectedBook.publicationDate);

        setBooks((prevBooks) => {
            if (selectedBook.id) {
                return prevBooks.map(book => (book.id === selectedBook.id ? { ...selectedBook, publicationDate: formattedDate } : book));
            } else {
                const newBook = { ...selectedBook, id: prevBooks.length + 1, publicationDate: formattedDate };
                return [...prevBooks, newBook];
            }
        });

        handleClear();
    };

    const handleDelete = (id) => {
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== id).map((book, index) => ({ ...book, id: index + 1 })));
        handleClear();
    };

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    const handleClear = () => {
        setSelectedBook({ id: '', title: '', author: '', isbn: '', price: '', publicationDate: '' });
    };

    return (
        <div className="app-container">
            <Navbar />
            <div className="library-container">
                <ul className="content-list">
                <h2>List of all books:</h2>
                    {books.length > 0 ? (
                       books.map(book => (
                        <li key={book.id} onClick={() => handleSelectBook(book)}>
                            <span className="id"><strong>ID: </strong> {book.id}</span>
                            <p className="field1"><strong>Title: </strong> {book.title}</p>
                            <p className="field2"><strong>Author: </strong> {book.author}</p>
                            <p className="field3"><strong>ISBN: </strong>  {book.isbn}</p>
                            <p className="field4"><strong>Price: </strong> {book.price}</p>
                            <p className="field5"><strong>Publication Date :</strong> {book.publicationDate}</p>
                            <button className="deleteButton" onClick={(e) => { e.stopPropagation(); handleDelete(book.id); }}>Delete</button>
                        </li>
                    ))
                    ) : (
                        <p>Oops. No books have been found yet.</p>
                    )}
                </ul>
                <div className="content-details">
                    <h2>Enter book details:</h2>
                    <form>
                        <input id="field1" name="title" value={selectedBook.title} onChange={handleChange} placeholder="Title" required />
                        <input id="field2" name="author" value={selectedBook.author} onChange={handleChange} placeholder="Author" required />
                        <input id="field3" name="isbn" value={selectedBook.isbn} onChange={handleChange} placeholder="ISBN" required />
                        <input id="field4" name="price" value={selectedBook.price} onChange={handleChange} placeholder="Price" required />
                        <input id="field5" name="publicationDate" type="date" value={selectedBook.publicationDate} onChange={handleChange} required />
                        <button id="saveButton" type="button" onClick={handleSave}>Save</button>
                        <button id="clearButton" type="button" onClick={handleClear}>Clear</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function Navbar() {
    return (
        <header className="navbar">
            <img src="https://i.pinimg.com/736x/e6/9d/67/e69d67edadb25b4a46e5afc583b9cf1d.jpg" alt="Logo" style={{ width: '50px'}}/>
                       
            <span style={{ marginLeft: '10px' }}><strong>Library Management System</strong></span>
        </header>
    );
}

function Footer() {
    return <footer className="footer">DSS React Project | Radoslav Zahariev</footer>;
}

export default App;
