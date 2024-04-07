import React, { useEffect } from 'react';
import appendicesData from "../assets/appendices/appendices_tr.json";
import { Link, useParams } from 'react-router-dom';
import "./Appendices.css"
import Navbar from '../components/Navbar';

const Appendices = () => {

  let { ekId } = useParams();


  useEffect(() => {
    if (ekId) {
      const element = document.getElementById(ekId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [ekId]);

  // Menü öğelerini içeren dizi
  const menuItems = [
    { path: "/ekler/Ek1", label: "Ek 1 - Büyük Mucizelerden Biri [74:35]" },
    { path: "/ekler/Ek2", label: "Ek 2 - Tanrı’nın Antlaşma Elçisi [3:81]" },
    { path: "/ekler/Ek3", label: "Ek 3 - Kuran’ı Kolaylaştırdık [54:17]" },
    { path: "/ekler/Ek4", label: "Ek 4 - Kuran Neden Arapça Vahyolundu?" },
    { path: "/ekler/Ek5", label: "Ek 5 - Cennet ve Cehennem" },
    { path: "/ekler/Ek6", label: "Ek 6 - Tanrı’nın Büyüklüğü" },
    { path: "/ekler/Ek7", label: "Ek 7 - Biz Niçin Yaratıldık?" },
    { path: "/ekler/Ek8", label: "Ek 8 - Şefaat Efsanesi" },
    { path: "/ekler/Ek9", label: "Ek 9 - İbrahim: İslam’ın İlk Elçisi" },
    { path: "/ekler/Ek10", label: "Ek 10 - Tanrı’nın Çoğul Kipi Kullanımı" },
    { path: "/ekler/Ek11", label: "Ek 11 - Diriliş Günü" },
    { path: "/ekler/Ek12", label: "Ek 12 - Muhammed Peygamberin Rolü" },
    { path: "/ekler/Ek13", label: "Ek 13 - İslam’ın İlk Direği" },
    { path: "/ekler/Ek14", label: "Ek 14 - Kader" },
    { path: "/ekler/Ek15", label: "Ek 15 - Dini Görevler: Tanrı’dan Bir Armağan" },
    { path: "/ekler/Ek16", label: "Ek 16 - Beslenme Haramları" },
    { path: "/ekler/Ek17", label: "Ek 17 - Ölüm" },
    { path: "/ekler/Ek18", label: "Ek 18 - Kuran İhtiyacınız Olan Her Şeydir" },
    { path: "/ekler/Ek19", label: "Ek 19 - Hadis ve Sünnet: Şeytani Bidatler" },
    { path: "/ekler/Ek20", label: "Ek 20 - Kuran: Başka Hiçbir Bir Kitaba Benzemez" },
    { path: "/ekler/Ek21", label: "Ek 21 - Şeytan: Düşmüş Melek" },
    { path: "/ekler/Ek22", label: "Ek 22 - İsa" },
    { path: "/ekler/Ek23", label: "Ek 23 - Vahyin Kronolojik Sırası" },
    { path: "/ekler/Ek24", label: "Ek 24 - Kuran’dan İki Sahte Ayet Çıkarıldı" },
    { path: "/ekler/Ek25", label: "Ek 25 - Dünyanın Sonu" },
    { path: "/ekler/Ek26", label: "Ek 26 - İslam’ın Üç Elçisi" },
    { path: "/ekler/Ek27", label: "Ek 27 - Senin Tanrın Kim?" },
    { path: "/ekler/Ek28", label: "Ek 28 - Muhammed Tanrı’nın Vahiylerini Kendi Eliyle Yazdı" },
    { path: "/ekler/Ek29", label: "Ek 29 - Kayıp Besmele" },
    { path: "/ekler/Ek30", label: "Ek 30 - Çok Eşlilik" },
    { path: "/ekler/Ek31", label: "Ek 31 - Evrim: İlahi Kontrollü Bir Süreç" },
    { path: "/ekler/Ek32", label: "Ek 32 - Kritik Yaş 40" },
    { path: "/ekler/Ek33", label: "Ek 33 - Tanrı Neden Şimdi Bir Elçi Gönderdi?" },
    { path: "/ekler/Ek34", label: "Ek 34 - Bekaret/İffet: Gerçek İmanlıların Bir Özelliği" },
    { path: "/ekler/Ek35", label: "Ek 35 - Uyuşturucu Maddeler & Alkol " },
    { path: "/ekler/Ek36", label: "Ek 36 - Büyük Bir Ulusun Bedeli" },
    { path: "/ekler/Ek37", label: "Ek 37 - İslam’da Adalet Sistemi" },
    { path: "/ekler/Ek38", label: "Ek 38 - Yaratıcı’nın İmzası" },

  ];

  // Menü öğelerini render etmek için bir fonksiyon
  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <li key={index}>
        <Link to={item.path}>{item.label}</Link>
      </li>
    ));
  };

  // Tablo verilerini render etmek için bir fonksiyon
  const renderTable = (tableData) => {
    const { ref, title, values } = tableData;
    const columns = title.length;
    const rows = [];

    for (let i = 0; i < values.length; i += columns) {
      rows.push(values.slice(i, i + columns));
    }

    return (
      <div className='tables'>
        <h4>{ref}</h4>
        <table>
          <thead>
            <tr>
              {title.map((columnTitle, index) => (
                <th key={index}>{columnTitle}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Resimleri render etmek için bir fonksiyon
  const renderPicture = (pictureData) => {
    const imagePath = `pictures/${pictureData.no}.jpg`; // Bu yolu projenize göre güncelleyin

    // `pictureData.text` bir nesne ise, nesnenin değerlerini mapleyerek render edin
    const renderText = (text) => {
      if (typeof text === 'object') {
        return (
          <div>
            {Object.entries(text).map(([key, value]) => (
              <p key={key}>{value}</p>
            ))}
          </div>
        );
      }
      // `text` bir string ise, doğrudan render edin
      return <p>{text}</p>;
    };

    return (
      <div className='picture'>
        <img src={imagePath} alt={typeof pictureData.text === 'object' ? 'Image' : pictureData.text} style={{ maxWidth: "100%" }} />
        {renderText(pictureData.text)}
      </div>
    );
  };



  return (
    <>
    <Navbar/>
    <div className='appendices-container font-serif'>
      <h1>EKLER</h1>
      {/* Menüyü burada render ediyoruz */}
      <ul className='tablo-ul'>
        {renderMenuItems()}
      </ul>
      {/* Mevcut yapıyı koruyoruz */}
      {appendicesData.map((appendix, pageIndex) => (
        <div key={pageIndex}>
          {/* <h2>Page: {appendix.page}</h2> */}
          {(() => {
            const combined = [];

            // titles varsa ekleniyor
            if (appendix.titles) {
              Object.entries(appendix.titles).forEach(([key, value]) => {
                combined.push({ order: parseInt(key, 10), content: value, type: 'title' });
              });
            }

            // text varsa ekleniyor
            if (appendix.text) {
              Object.entries(appendix.text).forEach(([key, value]) => {
                combined.push({ order: parseInt(key, 10), content: value, type: 'text' });
              });
            }

            // evidence ve lines varsa ekleniyor
            if (appendix.evidence) {
              Object.entries(appendix.evidence).forEach(([key, evidenceItem]) => {
                if (evidenceItem.lines) {
                  // 'ref' bilgilerini birleştirip bir string haline getiriyoruz.
                  // 'ref' bilgisi yoksa, bu kısmı boş bırakıyoruz.
                  let refs = evidenceItem.ref ? evidenceItem.ref.join(", ") : "";

                  Object.entries(evidenceItem.lines).forEach(([lineKey, lineValue]) => {
                    combined.push({
                      order: parseInt(key, 10),
                      content: lineValue,
                      type: 'evidence',
                      // Her bir 'line' için 'ref' bilgisini burada ekliyoruz.
                      ref: refs
                    });
                  });
                }
              });
            }

            // Table işleniyor
            if (appendix.table) {
              Object.entries(appendix.table).forEach(([key, table]) => {
                combined.push({
                  order: parseInt(key, 10),
                  content: table,
                  type: 'table'
                });
              });
            }

            // Picture işleniyor (Örnek veri yapısına bağlı olarak değişiklik gösterebilir)
            if (appendix.picture) {
              Object.entries(appendix.picture).forEach(([key, picture]) => {
                combined.push({
                  order: parseInt(key, 10),
                  content: picture,
                  type: 'picture'
                });
              });
            }



            // Sıralama ve render etme
            return combined.sort((a, b) => a.order - b.order).map((item, index) => {
              let titleId = null;
              if (item.type === 'title' && item.content.startsWith("Ek ")) {
                // Regex kullanarak boşlukları kaldırıyoruz.
                titleId = item.content.replace(/\s+/g, '');
              }


              return (

                <div key={index} className='text-xl '>
                  {item.type === 'title' && (
                    <h1
                      // Burada hesaplanan titleId'yi kullanıyoruz. Eğer titleId null ise, id ataması yapılmayacak.
                      id={titleId || undefined}
                    >
                      {item.content}
                    </h1>
                  )}
                  {item.type === 'text' && <p className='text-justify hyphens-auto'>{item.content}</p>}
                  {item.type === 'evidence' && (
                    <div>
                      <p>{item.content}</p>
                      {item.ref && <p>[{item.ref}]</p>}
                    </div>
                  )}
                  {item.type === 'table' && renderTable(item.content)}
                  {item.type === 'picture' && renderPicture(item.content)}
                </div>
              );
            });

          })()}


        </div>
      ))}
    </div>
    </>
  );
 
};

export default Appendices;
