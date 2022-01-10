const { parentPort } = require('worker_threads')
const request = require("request");
const cheerio = require("cheerio");
const links = require("./countries.json");







setInterval(updateData, 100000);

//setInterval(updateData2, 12000);

//1 milisecond = 15 minutes
//1 milisecond = 5 minutes

function updateData() {

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

    for (let i = 0; i < 20; i++) {

        const options = {
            url: links1[i].casesAddress,
            method: "GET",
            proxy: proxyGenerator()
        };

        request(options, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

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
                    country: links[i].name,
                    alphaCode: links1[i].Alpha3Code,
                    numericCode: links[i].NumericCode,
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
                    country: links[i].name,
                    alphaCode: links1[i].Alpha3Code,
                    numericCode: links[i].NumericCode,
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
                        countyOfThisCountry: links[i].name,
                        alphaCode: links1[i].Alpha3Code,
                        numericCode: links[i].NumericCode
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
                    country.push(links1[i].name)
                    countryalphacode.push(links[i].Alpha3Code)
                    countrynummericcode.push(links[i].NumericCode)
                }

                // console.log(timeStamp);
                //  console.log(hoursAgo);

                //  console.log(article_headings);
            } else {
                console.log("Error scraping site, please try again");
            }

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
            parentPort.postMessage(specificArticles1.length)
            if (specificArticles1.length == 20) {

                //    phase2()

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
        });
    }


}





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
    });
}










const links2 = require("./filestorage/countrycases.json");

parentPort.postMessage(links2.length)





