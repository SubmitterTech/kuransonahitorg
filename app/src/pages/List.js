import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import suras from '../assets/suras.json';
import surasEng from '../assets/suras_eng.json';
import Navbar from '../components/Navbar';

const List = () => {
    const navigate = useNavigate();

    const [showEnglish, setShowEnglish] = useState(false);

    useEffect(() => {
        // localStorage'dan 'language' anahtarını kontrol et
        const language = localStorage.getItem('language');

        // Eğer 'language' anahtarı yoksa, varsayılan bir değerle oluştur
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

    const handleSuraClick = (suraNumber) => {
        navigate(`/${suraNumber}`);
    };

    return (

        <div className='bg-gray-600 h-fit w-full'>
            <Navbar />
            <div className="content w-screen flex-1 bg-white p-2 overflow-y-auto flex flex-col items-center mt-16">
                <div className="flex justify-end  w-full h-full lg:pr-5 p-0 mb-2  mr-0 translate-x-2">
                    <div
                        className={`${showEnglish ? 'bg-gray-400' : 'bg-gray-300'} px-2 py-2 mx-2 flex justify-center items-center rounded shadow-md h-12 w-20 cursor-pointer`}
                        onClick={() => {
                            setShowEnglish(!showEnglish);
                            localStorage.setItem('language', JSON.stringify(showEnglish ? 'tr' : 'eng'));
                        }}
                    >
                        {showEnglish ? 'TR' : 'TR-EN'}
                    </div>
                </div>
                <div className="flex bg-sky-400/70 mb-5 py-4 px-2 rounded lg:w-1/2 w-full font-semibold justify-center text-3xl text-neutral-800">
                    SURE BAŞLIKLARI
                </div>
                {Object.entries(suras).map(([suraNumber, suraTitle]) => {
                    const s = suraTitle.split('\n');
                    const name = s[0];
                    const title = s[1] ? s[1] : '';

                    const suraTitleEng = surasEng[suraNumber];
                    let nameEng, titleEng;

                    if (suraTitleEng) {
                        const sEng = suraTitleEng.split('\n');
                        nameEng = sEng[2];
                        titleEng = sEng[3] ? sEng[3] : '';
                    } else {
                        nameEng = '';
                        titleEng = '';
                    }

                    return (
                        <div
                            key={suraNumber}
                            onClick={() => handleSuraClick(suraNumber)}
                            className="lg:w-1/2 max-w-full w-full mx-auto flex justify-between mb-3 bg-neutral-100 hover:bg-blue-100 text-neutral-800 font-semibold border border-neutral-400 rounded shadow overflow-hidden" // max-w-full ekledik
                        >
                            <div className="bg-neutral-800 text-sky-500 w-14 max-h-max flex items-center justify-center rounded-l font-semibold text-base lg:text-xl">
                                <div className="h-full flex items-center">{suraNumber}</div>
                            </div>
                            <div className="flex flex-1 h-full justify-between font-serif font-normal text-lg lg:text-2xl">
                                <div className="py-1.5 pl-2">
                                    {name} {showEnglish ? `/ ${nameEng}` : ''}
                                </div>
                                <div className="py-1.5 pr-2">
                                    {title} {showEnglish ? `/ ${titleEng}` : ''}
                                </div>
                            </div>
                        </div>



                    );
                })}
            </div>
        </div>

    );
};
export default List;
