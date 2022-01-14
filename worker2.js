const { parentPort } = require('worker_threads')
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const links = require("./countries.json");
var HttpsProxyAgent = require('https-proxy-agent');
const axios = require('axios')
const pos = require('pos')



const sources1 = [


    {
        name : 'wisdom',
        address: 'https://www.brainyquote.com/search_results?q=wisdom',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom1',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=1',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom2',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=2',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom3',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=3',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom4',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=4',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom5',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=5',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom6',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=6',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom7',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=7',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom8',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=8',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom9',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=9',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom10',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=10',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom11',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=11',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom12',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=12',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom13',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=13',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom14',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=14',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom15',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=15',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom16',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=16',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom17',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=17',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom18',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=18',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom19',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=19',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    },
    {
        name : 'wisdom20',
        address: 'https://www.brainyquote.com/search_results?q=wisdom&pg=20',
        base: 'https://quotes.pub',
        tag: 'Wisdom'
    }


]


let proxy1 = []



proxyGenerator()
function proxyGenerator() {
    let ip_addresses = [];
    let port_numbers = [];

    request("https://sslproxies.org/", function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $("td:nth-child(1)").each(function (index, value) {
                ip_addresses[index] = $(this).text();
            });

            $("td:nth-child(2)").each(function (index, value) {
                port_numbers[index] = $(this).text();
            });
        } else {
            console.log("Error loading proxy, please try again");
        }

        ip_addresses.join(", ");
        port_numbers.join(", ");

//    console.log("IP Addresses:", ip_addresses);
        //   console.log("Port Numbers:", port_numbers);

        let random_number = Math.floor(Math.random() * 100);

        //   console.log(ip_addresses[random_number]);
        //  console.log(port_numbers[random_number]);

        let proxy = `http://${ip_addresses[random_number]}:${port_numbers[random_number]}`;
        console.log(proxy);
        proxy1.push(proxy)
    });
}

/*

//const links = require("./countries.json");
var randomnum;

//brainyquote get

const articles = []
var count = 0
var k = 0;
sources1.forEach(source =>{
    axios.get(source.address, { agent:new HttpsProxyAgent(`${proxy1[randomnum]}`)}
    ).then(response => {
        const authorEntry = []
        const authorUrlEntry = []
        const quoteEntry = []
        const quoteUrlEntry = []
        const tagList = []

        const html = response.data
        const $ = cheerio.load(html)
        randomnum = Math.floor(Math.random() * 100);
        console.log(randomnum)
    //    console.log(proxy1[randomnum])

        fs.readFile('wordList.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            words = data.split('\n');
            //  document.querySelector("a[title='view author']").textContent
            $("a[title='view quote']", html).each(function () {
                const tagListquote = []
                const title = $(this).text()
                const url = $(this).attr('href')
                const replacedQuote = title.replaceAll("\n", "")
                quoteEntry.push(replacedQuote);
                quoteUrlEntry.push(url);

                var tagger = new pos.Tagger();
                var taggedWords = tagger.tag(replacedQuote);
                for (i in taggedWords) {
                    var taggedWord = taggedWords[i];
                    var word = taggedWord[0];
                    var tag = taggedWord[1];
                    //   console.log(word + " /" + tag);
                }
                for (let i = 0; i < words.length; i++) {
                    //  console.log(words[1570])
                    //  const land = "a"
                    //   console.log(replacedQuote.includes(words[1570]))
                    if (replacedQuote.toLowerCase().includes(words[i])) {
                        tagListquote.push(words[i])
                    }
                }
                //   console.log(tagListquote)
                tagList.push(tagListquote)
                //   console.log(tagListquote)
                // let quote1 = quote.replace("", " ").length

            })

            $("a[title='view author']", html).each(function () {
                const author = $(this).text()
                const authorurl = $(this).attr('href')

                authorEntry.push(author);
                authorUrlEntry.push(authorurl);

                // let quote1 = quote.replace("", " ").length

            })

            for (let i = 0; i < quoteEntry.length; i++) {

                articles.push({
                    id: i + k,
                    quote: quoteEntry[i],
                    url: source.base + quoteUrlEntry[i],
                    genre: source.tag,
                    tags: tagList[i],
                    author: authorEntry[i],
                    authorUrl: source.base + authorUrlEntry[i]

                })
                parentPort.postMessage(articles.length)
            }
            k += quoteEntry.length;
            if (count.length = sources1.length) {

            console.log(articles)
            parentPort.postMessage(articles)
            require('fs').writeFile(
                './hold2.json',

                JSON.stringify(articles, null, 2),

                function (err) {
                    if (err) {
                        console.error('Crap happens');
                    }
                }
            );
        }
        })
    })
  //  console.log(articles)
    count += 1

})





*/


//const links = require("./countries.json");
var randomnum;

//brainyquote get

const datetime = new Date();
const links1 = require(`./countries.json`);
const articleTitle = []
const articleUrl = []
const articleSource = []
const titleImage = []
const hoursAgo = []
const timeStamp = []
const country = []
const countryalphacode = []
const countrynummericcode = []
const specificArticles1 = []
const specificArticles3 = []
const specificArticles4 = []
const count = 0
var k = 0;
links.forEach(source =>{
    axios.get(source.casesAddress, { agent:new HttpsProxyAgent(`${proxy1[randomnum]}`)}
    ).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        randomnum = Math.floor(Math.random() * 100);
        console.log(randomnum)
        //    console.log(proxy1[randomnum])


        const articleTitle1 = []

///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------

        const totalStats = []

        $("div[class='UvMayb']", html).each(function () {
            //   const title = $(this).text()
            totalStats.push($(this).text())
        })

        const cases = totalStats[0]
        var deaths = totalStats[1]
        var doses = totalStats[2]
        var peopleFullyVaccinated = totalStats[4]

        //    console.log(totalStats.length)

        if (totalStats[1] == 'No data') {
            deaths = totalStats[2]
            doses = totalStats[3]
        }

        if (totalStats[4] == 'No data') {
            peopleFullyVaccinated = totalStats[5]
        }

        if (peopleFullyVaccinated == undefined) {
            //    console.log('woooooooooooooooooooooooooooooow')
            peopleFullyVaccinated = totalStats[3]
        }

        specificArticles1.push({
            country: source.name,
            alphaCode: source.alphaCode,
            numericCode: source.numericCode,
            cases,
            deaths,
            doses,
            peopleFullyVaccinated,
            timestamp: datetime,
            totalStats
        })

        ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------
///dailyreport/country/:quotesId1------------------------------------------------- Daily Report------------------------------------------------------

        const dailyStats = []
        const newCases = []

        $("div[class='tIUMlb']", html).each(function () {
            const title = $(this).text()
            //     const url = $(this).attr('href')
            dailyStats.push($(this).text())
        })


        $("div[class='DlOivf']", html).each(function () {
            const title = $(this).text()
            newCases.push($(this).text())
            //     const url = $(this).attr('href')

        })

        const cases2 = dailyStats[0]
        const deaths2 = dailyStats[1]
        const doses2 = dailyStats[2]
        const percentofpeopleoverpopvaccinated2 = dailyStats[3]
        const newCasesLastWeek2 = newCases[0]

        specificArticles4.push({
            country: source.name,
            alphaCode: source.alphaCode,
            numericCode: source.numericCode,
            cases2,
            newCasesLastWeek2,
            // newDosesLastWeek: newDosesLastWeek1,
            doses2,
            deaths2,
            timestamp: datetime,
            percentofpeopleoverpopvaccinated2
        })

        ///dailyreport/country/:quotesId1------------------------------------------------- Daily Report------------------------------------------------------
        // /countiesreport/cases/country/:quotesId1----------------------------------------COUNTY CASES----------------------------------------------------

        const namesTitle = []
        const numbers = []
        const images = []


        $("td[class='l3HOY']", html).each(function () {
            const title = $(this).text()
            //const url = $(this).attr('href')
            numbers.push($(this).text())

        })

        $("div[class='pcAJd']", html).each(function () {
            const title = $(this).text()
            //const url = $(this).attr('href')
            namesTitle.push($(this).text())
        })


        $("img[class='oIC36d']", html).each(function () {
            // const title = $(this).text()
            //   const url = $(this).attr('src')
            images.push($(this).attr('src'))
        })


        for (let i = images.length; i < namesTitle.length; i++) {
            images.push("No Data")
        }

        var k1 = 0;
        for (let h = 0; h < namesTitle.length; h++) {

            specificArticles3.push({
                name: namesTitle[h],
                symbol: images[h],
                totalCases: numbers[0 + k1],
                newCasesPerDay: numbers[1 + k1],
                casesPerMillion: numbers[3 + k1],
                deaths: numbers[4 + k1],
                timestamp: datetime,
                countyOfThisCountry: source.name,
                alphaCode: source.alphaCode,
                numericCode: source.numericCode
            })
            k1 += 5;
        }

        // /countiesreport/cases/country/:quotesId1----------------------------------------COUNTY CASES----------------------------------------------------
        // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------
        $("a[class='DY5T1d RZIKme']", html).each(function () {
            //  const articleTitle = $(this).text()
            //   const url2 = $(this).attr('href')
            //   const url = base1+url2
            articleTitle1.push($(this).text())
            articleTitle.push($(this).text())
            articleUrl.push("https://news.google.com" + $(this).attr('href'))

        })

        $("a[class='wEwyrc AVN2gc WfKKme ']", html).each(function () {
            //   const title = $(this).text()
            //  const url = $(this).attr('href')
            articleSource.push($(this).text())
        })

        $("img[class='tvs3Id QwxBBf']", html).each(function () {
            //  const title = $(this).text()
            //  const url = $(this).attr('src')
            titleImage.push($(this).attr('src'))
        })

        $("time[class='WW6dff uQIVzc Sksgp']", html).each(function () {
            // const longAgo = $(this).text()
            //   const timeStamp = $(this).attr('datetime')
            //   const url = base1+url2
            hoursAgo.push($(this).text())
            timeStamp.push($(this).attr('datetime'))
        })

        // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------

        for (let k = 0; k < articleTitle1.length; k++) {
            country.push(source.name)
            countryalphacode.push(source.alphaCode)
            countrynummericcode.push(source.numericCode)
        }

        // console.log(timeStamp);
          console.log(hoursAgo);

        //  console.log(article_headings);


        const specificArticles = []

        for (let h = 0; h < articleTitle.length; h++) {
            specificArticles.push({
                articleTitle: articleTitle[h],
                articleUrl: articleUrl[h],
                titleImage: titleImage[h],
                source: articleSource[h],
                hoursAgo: hoursAgo[h],
                timeStamp: timeStamp[h],
                country: country[h],
                alphaCode: countryalphacode[h],
                numericCode: countrynummericcode[h],
            })

        }

        console.log("proc-1")
            console.log(specificArticles1.length)

        parentPort.postMessage(source.name)
        if (specificArticles1.length == links1.length) {


            require('fs').writeFile(
                './filestorage/news.json',

                JSON.stringify(specificArticles, null, 2),

                function (err) {
                    if (err) {
                        console.error('Crap happens');
                    }
                }
            );


            //     console.error(specificArticles)
            //    console.error(specificArticles1)

            require('fs').writeFile(
                './filestorage/totalreport.json',

                JSON.stringify(specificArticles1, null, 2),

                function (err) {
                    if (err) {
                        console.error('Crap happens');
                    }
                }
            );

            require('fs').writeFile(
                './filestorage/dailyreport.json',

                JSON.stringify(specificArticles4, null, 2),

                function (err) {
                    if (err) {
                        console.error('Crap happens');
                    }
                }
            );

            require('fs').writeFile(
                './filestorage/countrycases.json',

                JSON.stringify(specificArticles3, null, 2),

                function (err) {
                    if (err) {
                        console.error('Crap happens');
                    }
                }
            );
        }
    }).catch((err) => console.log(err))
    })















//const links2 = require("./filestorage/countrycases.json");

//parentPort.postMessage(links2.length)





