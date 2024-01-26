import React from 'react';
import { useNavigate } from 'react-router-dom';
import suras from '../assets/suras.json';

const List = () => {
    const navigate = useNavigate();


    const handleSuraClick = (suraNumber) => {
        navigate(`/${suraNumber}`);
    };

    return (
        <div className="w-screen h-screen bg-white p-2 overflow-y-auto flex flex-col items-center">
            <div className="flex bg-sky-400/70 mb-5 py-4 px-2 rounded lg:w-1/2 w-full font-semibold justify-center text-3xl text-neutral-800">
                {`SURE BAŞLIKLARI`}
            </div>
            {Object.entries(suras).map(([suraNumber, suraTitle]) => {

                const s = suraTitle.split("\n");
                const name = s[0];
                const title = s[1] ? s[1] : "";

                return (
                    <button
                        key={suraNumber}
                        onClick={() => handleSuraClick(suraNumber)}
                        className="lg:w-1/2 w-full flex justify-between mb-3 bg-neutral-100 hover:bg-blue-100 text-neutral-800 font-semibold border border-neutral-400 rounded shadow"
                    >
                        <div className="bg-neutral-800 text-sky-500 w-14 py-2 px-2 rounded-l font-semibold text-base lg:text-xl">{suraNumber}</div>
                        <div className="flex w-full justify-between font-serif font-normal text-lg lg:text-2xl">
                            <div className="py-1.5 pl-2">{name}</div>
                            <div className="py-1.5 pr-2">{title}</div>
                        </div>
                    </button>
                )
            })}
        </div>
    );
};

export default List;
