const { pool } = require('../utils/db');
const fs = require('fs');

let language = 'pl';

exports.homepage = async (req, res) => {

  try {
    pool.getConnection((err, conn) => {
      if (err)
        throw new Error(
          `Failed to connect to database, please check whether the server is running...${err}`
        );
      console.log(`Connection has been established - ID : ${conn.threadId}`);

      conn.query( 'SELECT * FROM `category` UNION SELECT * FROM `photos`', async (err, data) => {
        conn.release();
        try {
          const recordsEn = await data.map(function (el) {
            return {
              _key: el._key,
              type: el.type,
              name: el.name_en,
              image: el.image,
              description: el.description_en,
            };
          });

          const recordsPl = await (
            await data.map(function (el) {
            return {
              _key: el._key,
              type: el.type,
              name: el.name_pl,
              image: el.image,
              description: el.description_pl,
            };
          }))

          const dbRecords = language === 'en' ? recordsEn : recordsPl;

          const menuLogoName = dbRecords.filter((e) => e.type === 'menu-logo-name');
          const menuMainPage = dbRecords.filter((e) => e.type === 'menu-main-page');
          const menuMainAbout = dbRecords.filter((e) => e.type === 'menu-main-about');
          const menuMainContact = dbRecords.filter((e) => e.type === 'menu-main-contact');
          const menuMainSearch = dbRecords.filter((e) => e.type === 'menu-main-search');
          const mainArticule = dbRecords.filter((e) => e.type === 'main_articule');
          const mainArticuleLast = dbRecords.filter((e) => e.type === 'main-articule-last');
          const mainArticuleRandom = dbRecords.filter((e) => e.type === 'main-articule-random');
          const categories = dbRecords.filter((e) => e.type === 'category');
          const informationAboutUs = dbRecords.filter((e) => e.type === 'information-about-us');
          const contactUs = dbRecords.filter((e) => e.type === 'contact-us');
          const contactUsPhone = dbRecords.filter((e) => e.type === 'contact-us-phone');
          const address = dbRecords.filter((e) => e.type === 'address');
          const addressStreet = dbRecords.filter((e) => e.type === 'address-street');

//           let efg = []
//         const pic = () => {conn.query('SELECT * FROM `photos`', async (err, pictures) => {
//             conn.release();
//                 return efg = pictures
//           })}
// pic()
//           console.log(efg);


          const photosEn = await (
            await data.map(function (el) {
            return {
              id: el.id,
              type: el.type,
              _key: el._key,
              name: el.name_en,
              subHtml: el.description_en,
              src: el.image,
            };
          }))
          const photosPl = await (
            await data.map(function (el) {
            return {
              id: el.id,
              type: el.type,
              _key: el._key,
              name: el.name_pl,
              subHtml: el.description_pl,
              src: el.image,
            };
          }))
          const dbPhotos = language === 'en' ? photosEn : photosPl;
          const dString = JSON.stringify(dbPhotos);
          const destynation = 'public/js/data.js';
          const write = () => {
            fs.writeFile(destynation, dString, function (err) {
              if (err) return console.log(err);
              console.log('Data has been updated > data.js');
            });
          };
          write();

          res.render('index', {
            title: 'Meble na wymiar',
            menuLogoName,
            menuMainPage,
            menuMainAbout,
            menuMainContact,
            menuMainSearch,
            mainArticule,
            mainArticuleLast,
            mainArticuleRandom,
            categories,
            informationAboutUs,
            contactUs,
            contactUsPhone,
            address,
            addressStreet,
          });
        } catch (error) {
          res.status(500).send({ message: error.message || 'There is an Error' });
        }
      });
    });
  } catch (error) {
    res.status(500).send({ message: error.message || 'There is an Error' });
  }
};

exports.homepage_pl = async (req, res) => {
  language = 'pl';
  res.redirect('/');
};
exports.homepage_en = async (req, res) => {
  language = 'en';
  res.redirect('/');
};