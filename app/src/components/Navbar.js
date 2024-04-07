import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate'i import edin

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate hook'undan bir instance oluşturun

    // Menü linkine tıklama işleyicisi
    const handleLinkClick = (path) => {
        setIsOpen(false);

        if (path == "/ekler") {
            window.location.href = "/ekler";
        } else {
            navigate(path); // navigate fonksiyonunu kullanarak ilgili path'e yönlendir
        }
    }


    return (
        <nav className="fixed top-0 w-full z-50 bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <img src='logo192.png' className="w-12 h-8" alt="Logo" />
                </div>
                <div className="hidden md:flex space-x-4">
                    <button onClick={() => handleLinkClick('/')} className="hover:text-gray-400">Kur'an Oku</button>
                    <button onClick={() => handleLinkClick('/ekler')} className="hover:text-gray-400">Ekler</button>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                        <svg className="w-6 h-6 text-gray-500 hover:text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            {/* Üç çizgiyi çizmek için path d değerini ayarlayın */}
                            <path d="M3 6h18M3 12h18M3 18h18"></path>
                        </svg>
                    </button>

                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mobile-menu mt-4">
                    <ul>
                        <li className="border-t border-gray-700">
                            <button onClick={() => handleLinkClick('/')} className="block text-sm px-2 py-4 w-full text-left hover:bg-gray-700">Kur'an Oku</button>
                        </li>
                        <li className="border-t border-gray-700">
                            <button onClick={() => handleLinkClick('/ekler')} className="block text-sm px-2 py-4 w-full text-left hover:bg-gray-700">Ekler</button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
