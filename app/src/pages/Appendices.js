import React from 'react';
import { Link } from 'react-router-dom';
import "./Appendices.css"
import Navbar from '../components/Navbar';

const Appendices = () => {

  const menuItems = [
    { path: "/ek/giris", label: "Giriş" },
    { path: "/ek/1", label: "Ek 1 - Büyük Mucizelerden Biri [74:35]" },
    { path: "/ek/2", label: "Ek 2 - Tanrı’nın Antlaşma Elçisi [3:81]" },
    { path: "/ek/3", label: "Ek 3 - Kuran’ı Kolaylaştırdık [54:17]" },
    { path: "/ek/4", label: "Ek 4 - Kuran Neden Arapça Vahyolundu?" },
    { path: "/ek/5", label: "Ek 5 - Cennet ve Cehennem" },
    { path: "/ek/6", label: "Ek 6 - Tanrı’nın Büyüklüğü" },
    { path: "/ek/7", label: "Ek 7 - Biz Niçin Yaratıldık?" },
    { path: "/ek/8", label: "Ek 8 - Şefaat Efsanesi" },
    { path: "/ek/9", label: "Ek 9 - İbrahim: İslam’ın İlk Elçisi" },
    { path: "/ek/10", label: "Ek 10 - Tanrı’nın Çoğul Kipi Kullanımı" },
    { path: "/ek/11", label: "Ek 11 - Diriliş Günü" },
    { path: "/ek/12", label: "Ek 12 - Muhammed Peygamberin Rolü" },
    { path: "/ek/13", label: "Ek 13 - İslam’ın İlk Direği" },
    { path: "/ek/14", label: "Ek 14 - Kader" },
    { path: "/ek/15", label: "Ek 15 - Dini Görevler: Tanrı’dan Bir Armağan" },
    { path: "/ek/16", label: "Ek 16 - Beslenme Haramları" },
    { path: "/ek/17", label: "Ek 17 - Ölüm" },
    { path: "/ek/18", label: "Ek 18 - Kuran İhtiyacınız Olan Her Şeydir" },
    { path: "/ek/19", label: "Ek 19 - Hadis ve Sünnet: Şeytani Bidatler" },
    { path: "/ek/20", label: "Ek 20 - Kuran: Başka Hiçbir Bir Kitaba Benzemez" },
    { path: "/ek/21", label: "Ek 21 - Şeytan: Düşmüş Melek" },
    { path: "/ek/22", label: "Ek 22 - İsa" },
    { path: "/ek/23", label: "Ek 23 - Vahyin Kronolojik Sırası" },
    { path: "/ek/24", label: "Ek 24 - Kuran’dan İki Sahte Ayet Çıkarıldı" },
    { path: "/ek/25", label: "Ek 25 - Dünyanın Sonu" },
    { path: "/ek/26", label: "Ek 26 - İslam’ın Üç Elçisi" },
    { path: "/ek/27", label: "Ek 27 - Senin Tanrın Kim?" },
    { path: "/ek/28", label: "Ek 28 - Muhammed Tanrı’nın Vahiylerini Kendi Eliyle Yazdı" },
    { path: "/ek/29", label: "Ek 29 - Kayıp Besmele" },
    { path: "/ek/30", label: "Ek 30 - Çok Eşlilik" },
    { path: "/ek/31", label: "Ek 31 - Evrim: İlahi Kontrollü Bir Süreç" },
    { path: "/ek/32", label: "Ek 32 - Kritik Yaş 40" },
    { path: "/ek/33", label: "Ek 33 - Tanrı Neden Şimdi Bir Elçi Gönderdi?" },
    { path: "/ek/34", label: "Ek 34 - Bekaret/İffet: Gerçek İmanlıların Bir Özelliği" },
    { path: "/ek/35", label: "Ek 35 - Uyuşturucu Maddeler & Alkol " },
    { path: "/ek/36", label: "Ek 36 - Büyük Bir Ulusun Bedeli" },
    { path: "/ek/37", label: "Ek 37 - İslam’da Adalet Sistemi" },
    { path: "/ek/38", label: "Ek 38 - Yaratıcı’nın İmzası" },

  ];

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <li key={index}>
        <Link to={item.path}>{item.label}</Link>
      </li>
    ));
  };

 


  return (
    <>
    <Navbar/>
    <div className='appendices-container font-serif'>
      <h1>EKLER</h1>
      <ul className='tablo-ul'>
        {renderMenuItems()}
      </ul>
     
    </div>
    </>
  );
 
};

export default Appendices;
