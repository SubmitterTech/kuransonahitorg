import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Verses = ({ verses, titles, notes, verses_eng, titles_eng, notes_eng }) => {
    const { no } = useParams();
    const [showNotes, setShowNotes] = useState({});
    const [showEnglish, setShowEnglish] = useState(false);

    const toggleNotesVisibility = (vno) => {
        setShowNotes(prevShowNotes => ({
            ...prevShowNotes,
            [vno]: !prevShowNotes[vno]
        }));
    };

    useEffect(() => {
        // localStorage'dan 'language' anahtarını kontrol et
        const language = localStorage.getItem('language');

        if (!language) {
            localStorage.setItem('language', JSON.stringify("tr"));
            setShowEnglish(false);
        } else {
            // Eğer 'language' anahtarı varsa ve değeri 'eng' ise 'showEnglish' değerini true yap
            if (JSON.parse(localStorage.getItem("language")) === "eng") {
                setShowEnglish(true)
            }
            else {
                setShowEnglish(false)
            }

        }

    }, []);


    const renderVerseText = (text) => {
        return text.split(/(TANRI|GOD)/).map((part, index) => (
            <span key={index}>
                {part === "TANRI" || part === "GOD" ? <span className="font-semibold">{part}</span> : part}
            </span>
        ));
    };

    return (
        
            <div className={`select-text w-screen h-screen bg-white py-2 flex flex-col overflow-y-auto`}>
                <div className='flex justify-end w-screen m-0 p-0 my-1'>
                    <div className={`${showEnglish ? "bg-gray-400" : "bg-gray-300"} px-2 py-2 mx-2 flex justify-center items-center h-[35px] w-[70px] cursor-pointer`} onClick={() => {

                        setShowEnglish(!showEnglish)
                        localStorage.setItem("language", JSON.stringify(showEnglish ? "tr" : "eng"))
                    }}>
                        {showEnglish ? "TR" : "TR-EN"}
                    </div>
                </div>
                {verses ? (
                    Object.entries(verses[no]).map(([vno, text]) => (
                        <div key={vno} className="p-2 flex w-full text-xl flex-col">
                            {titles && titles[no][vno] && <div className="text-center "><span className="italic font-serif whitespace-pre mt-3 font-semibold text-wrap">{titles[no][vno]}</span></div>}
                            {showEnglish && (titles_eng && titles_eng[no][vno] && <div className="text-center "><span className="italic font-serif whitespace-pre mt-3 font-semibold text-wrap">{titles_eng[no][vno]}</span></div>)}
                            <div className="text-justify">{`[${no}:${vno}] `}<span className="font-serif">{renderVerseText(text)}</span></div>
                            {showEnglish && (<div className="text-justify">{`[${no}:${vno}] `}<span className="font-serif">{renderVerseText(verses_eng[no][vno])}</span></div>)}
                            {notes && notes[no + `:` + vno] && (
                                <button
                                    onClick={() => toggleNotesVisibility(vno)}
                                    className="text-left underline text-sky-500 hover:text-sky-800 select-none"
                                >
                                    {showEnglish ? "Footnote (Dipnot)" : "Dipnot"}
                                </button>
                            )}

                            {showNotes[vno] && notes[no + `:` + vno] && (
                                <div className={`text-justify text-neutral-600 font-serif my-3 whitespace-pre-line ${showNotes[vno] ? 'opacity-100' : 'opacity-0'} border border-gray-300 px-1 py-1`}>
                                    {notes[no + `:` + vno].join('\n\n')}
                                </div>
                            )}
                            {showEnglish && (showNotes[vno] && notes_eng[no + `:` + vno] && (
                                <div className={`text-justify text-neutral-600 font-serif my-3 whitespace-pre-line ${showNotes[vno] ? 'opacity-100' : 'opacity-0'} border border-gray-300 px-1 py-1`}>
                                    {notes_eng[no + `:` + vno].join('\n\n')}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex text-neutral-900 select-none">
                        {/* Loading Spinner */}
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Yükleniyor ...
                    </div>
                )}
                <div className="w-full text-center mt-7">♦ ♦ ♦ ♦</div>

                {no === "114" && notes['end'] && (
                    <div className={`text-justify text-xl p-2 text-neutral-800 font-serif my-3 whitespace-pre-line `}>
                        {notes['end'].join('\n')}
                    </div>
                )}

                {no === "114" && notes_eng['end'] && (
                    <div className={`text-justify text-xl p-2 text-neutral-800 font-serif my-3 whitespace-pre-line `}>
                        {notes_eng['end'].join('\n')}
                    </div>
                )}
            </div>
       
    );
};

export default Verses;
