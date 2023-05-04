
import fetch from "node-fetch";
import { load } from 'cheerio';

// url for data
const URL = "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw=laptop&_sacat=0&LH_TitleDesc=0&_odkw=computer&_osacat=0";

const getRawData = async function(URL){
   return fetch(URL)
   .then(function(response){
       response.text()
    }).then(function(data){
        return data;
    });
};

const getLaptopTitles = async function(){

    const getLaptopTitleData = await getRawData(URL);
    //parsing the data
    const parsedLaptopTitle = load(getLaptopTitleData);
    //extracting the data
    const laptopTable = parsedLaptopTitle('.srp-results.srp-list.clearfix')[0]
    .children[1].children;
    console.log("Title --- Price --- Location ");

    laptopTable.forEach(function(row){
        //extracting ul tags
        if (row.name === 'ul'){
            let title = null,
            price = null,
            location = null;

            const columns = row.children.filter(function(column){
                column.name === "ul";
            });
            //extracting title
            const titleColumn = columns[0];
            if (titleColumn){
                title = titleColumn.children[0];
                if (title){
                    title = title.children[0].data;
                }
            }
            if (title){
                console.log(`${title} --- ${Price} --- ${Location}`);
                console.log("Hello world!");
            }
        }

    });

};
//invoking the main function
getLaptopTitles();



   
    