import React, { useState, useEffect, useRef, useCallback } from 'react';
import appendices from "../assets/appendices/appendices_tr.json";
import { useParams } from 'react-router-dom';
import "./Appendices.css"
import Navbar from '../components/Navbar';

const Apps = () => {

    let { appId } = useParams();
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        if (appId) {
          setSelected(appId);
        }
      }, [appId]);

    const direction = "ltr";
    const lang = "tr";
    const appx = "Ek";
    const containerRef = useRef(null);
    const appendixRef = useRef({});

    const [appendixMap, setAppendixMap] = useState({});
    const images = require.context('../assets/pictures/', false, /\.jpg$/);

    const textRef = useRef({});

    const [isRefsReady, setIsRefsReady] = useState(false);

    const mapAppendicesData = useCallback((appendices) => {
        const appendixMap = {};
        let currentAppendixNum = 1;
        let globalContentOrder = 1;

        appendices.forEach(page => {
            if (page.page < 397) {
                return;
            }
            let allContentItems = [];
            Object.entries(page.titles || {}).forEach(([key, title]) => {
                allContentItems.push({
                    type: 'title',
                    content: title,
                    key: parseInt(key)
                });
            });

            const collectContent = (type, data) => {
                Object.entries(data || {}).forEach(([key, value]) => {
                    if (value) {
                        allContentItems.push({ type, content: value, key: parseInt(key) });
                    }

                });
            };
            collectContent('text', page.text);
            collectContent('evidence', page.evidence);
            collectContent('table', page.table);
            collectContent('picture', page.picture);

            allContentItems.sort((a, b) => a.key - b.key);
            allContentItems.forEach(item => {
                item.order = globalContentOrder++;
                if (item.type === 'title') {
                    const match = item.content.match(new RegExp(`${appx}\\s*(\\d+)`));
                    if (/\d+/.test(item.content) && match) {
                        currentAppendixNum = match[1];
                    }
                }
                if (!appendixMap[currentAppendixNum]) {
                    appendixMap[currentAppendixNum] = { content: [] };
                }

                appendixMap[currentAppendixNum].content.push(item);
            });
        });

        Object.values(appendixMap).forEach(appendix => {
            appendix.content.sort((a, b) => a.order - b.order);
        });

        return appendixMap;
    }, []);

    useEffect(() => {
        const initialAppendixMap = mapAppendicesData(appendices);
        setAppendixMap(initialAppendixMap);
    }, [mapAppendicesData]);

    useEffect(() => {
        if (selected && isRefsReady) {
            setTimeout(() => {
                
                    if (appendixRef.current && appendixRef.current[`appendix-${selected}`] && isRefsReady) {
                        appendixRef.current[`appendix-${selected}`].scrollIntoView({ behavior: 'smooth' });
                    }

            }, 266);

        }
    }, [selected, isRefsReady, textRef]);

    const handleRefsReady = () => {
        setIsRefsReady(true);
    };

    const renderTable = useCallback((tableData, key) => {

        const tableRef = tableData.ref;
        const { title: columnHeaders, values } = tableData;

        // Calculating rows based on column count
        const columnCount = columnHeaders.length;
        const rows = [];
        for (let i = 0; i < values.length; i += columnCount) {
            rows.push(values.slice(i, i + columnCount));
        }

        return (
            <div key={key} className={`text-neutral-700`}>
                <div className={` my-4 overflow-x-scroll`}>
                    <div className={`bg-neutral-200 w-full rounded text-sm py-2 text-center `}>
                        {tableRef}
                    </div>
                    <table className={`table-auto w-full text-base md:text-lg bg-neutral-200 border-collapse border-2 border-neutral-900`}>
                        <thead>
                            <tr>
                                {columnHeaders.map((header, index) => (
                                    <th key={index} className={`border border-neutral-900 p-2 break-words`}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={`row-${rowIndex}`}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={`cell-${rowIndex}-${cellIndex}`} className={`border-2 border-neutral-900 p-2 text-center break-words`}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }, []);

    const renderContentItem = (appno, item, index) => {
        switch (item.type) {
            case 'title':
                
                const isAppendixTitle = new RegExp(appx + "\\s*(\\d+)", "i").test(item.content);

                return (
                    <div
                        key={`title-${appno + index}`}
                        dir={direction}
                        className={`sticky top-0 flex items-center justify-center text-center p-2 font-semibold text-neutral-800 bg-neutral-200 `}
                        ref={isAppendixTitle ? el => appendixRef.current[`appendix-${item.content.match(/\d+/)[0]}`] = el : null}>
                        {item.content}
                    </div>
                );
            case 'text':
                return (

                    <div
                        lang={lang}
                        dir={direction}
                        key={`text-${index}`}
                        ref={(el) => textRef.current[appno + "-" + index] = el}
                        //onClick={(e) => handleClick(e, appno, index)}
                        className={`rounded bg-white text-neutral-800 p-1 mb-1.5 flex w-full text-justify hyphens-auto`}>
                        <div className={`overflow-x-scroll`}>
                            <p className={`px-1 break-words`}>{item.content}</p>
                        </div>
                    </div>
                );
            case 'evidence':
                return (
                    <div
                        dir={direction}
                        key={`evidence-${index}`}
                        className={`bg-neutral-200 text-neutral-700 rounded  text-base md:text-lg p-3 border my-3 border-neutral-900`}>
                        {Object.entries(item.content.lines).map(([lineKey, lineValue]) => (
                            <p key={`${lineKey}`} className={`whitespace-pre-wrap my-1`}>{lineValue}</p>
                        ))}
                        {item.content.ref.length > 0 && (
                            <p>{"[" + item.content.ref.join(', ') + "]"}</p>
                        )}
                    </div>
                );
            case 'picture':
                if (!item.content.no) return;
                const imageUrl = images(`./${parseInt(item.content.no)}.jpg`);
                // SPECIAL RENDER FOR PICTURE 10
                if (parseInt(item.content.no) === 10) {
                    return (
                        <div key={`picture-${index}`} className={`flex flex-col flex-1 items-center justify-center w-full px-1`}>
                            <div className={` flex p-1 overflow-y-auto`}>
                                <div className={` flex flex-col justify-between `}>
                                    {item.content.data.slice(0, 4).map((word) => (
                                        <div className={`p-1.5 whitespace-nowrap text-right`}>{word}</div>
                                    ))}
                                </div>
                                <img src={imageUrl} alt={imageUrl} className={`object-contain `} />
                                <div className={` flex flex-col justify-between`}>
                                    {item.content.data.slice(4, 8).map((word) => (
                                        <div className={`p-1.5 flex-1 whitespace-pre text-left`}>{word}</div>
                                    ))}
                                </div>
                            </div>
                            {item.content.text && (
                                <div className={`text-neutral-800/80 w-full text-base flex justify-center`}>
                                    <div className={`p-2`}>{item.content.text}</div>
                                </div>
                            )}
                        </div>
                    );
                }
                // SPECIAL RENDER FOR PICTURE 22
                if (parseInt(item.content.no) === 22) {
                    return (
                        <div key={`picture-22-special`} className={`flex flex-col space-y-1.5 flex-1 items-center justify-center w-full px-1 mb-2`}>

                            {item.content.text && Object.entries(item.content.text).map(([pickey, text]) => (
                                <div className={`rounded  flex flex-wrap md:flex-nowrap justify-between`}>
                                    <img src={images(`./${pickey}.jpg`)} alt={imageUrl} className={`object-contain`} />
                                    <div lang={lang} className={`p-2 text-justify hyphens-auto break-words`}>{text}</div>
                                </div>

                            ))}
                        </div>
                    );

                }
                return (
                    <div key={`picture-${index}`} className={`flex flex-col flex-1 items-center justify-center w-full px-1 mb-2`}>
                        <div className={`rounded  flex justify-center`}>
                            <img src={imageUrl} alt={imageUrl} className={`object-center`} />
                        </div>
                        {item.content.text && (
                            <div className={`text-neutral-800/80 w-full text-base flex justify-center`}>
                                <div className={`p-2`}>{item.content.text}</div>
                            </div>
                        )}
                    </div>
                );
            case 'table':
                return renderTable(item.content, `table-${index}`);
            default:
                return (
                    <div key={`unknown-${index}`} className={`text-neutral-800/80 flex flex-1 items-center justify-center w-full`}>
                        {`Unrecognized structured data or could not parse the data...`}
                    </div>
                );
        }
    };

    const renderAppendices = () => {
        const appendixContent = appendixMap[selected]?.content || [];
        let groups = [];
        let currentGroup = [];

        appendixContent.forEach((item, index) => {
            if (item.type === 'title' || index === 0) {
                if (currentGroup.length > 0) {
                    groups.push(currentGroup);
                }
                currentGroup = [renderContentItem(selected, item, `${item.type}-${index}`)];
            } else {
                currentGroup.push(renderContentItem(selected, item, `${item.type}-${index}`));
            }
        });
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return (
            <div className={`px-1.5`} key={selected} ref={() => handleRefsReady()}>
                {groups.map((group, groupIndex) => (
                    <div key={`group-${groupIndex}`} className="group">
                        {group.map((element) => element)}
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div
            className={`h-screen w-screen relative bg-neutral-200 overflow-y-auto py-16 text-neutral-800 text-lg md:text-xl lg:text-2xl select-text`}>
            <div
                ref={containerRef}
                // onScroll={loadMoreAppendices}
                className={` font-serif`}>
                <Navbar/>
                {renderAppendices()}

                {!isRefsReady &&
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex text-neutral-900/60 select-none`}>
                        <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className={`opacity-25`} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className={`opacity-75`} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {`Yükleniyor...`}
                    </div>
                }

            </div>
        </div>
    );
};

export default Apps;
