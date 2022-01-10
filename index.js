const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const links = require("./countries.json");
const request = require('request');
const { Worker } = require('worker_threads')


const app = express()








function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get('/', (req, res)=> {
    res.json('Welcome to the Covid Report API')
    const links = require("./countries.json");

    for (let i = 0; i < links.length; i++) {
        console.log("'"+links[i].NumericCode)
    }
})


    app.get('/totalreport/country/:quotesId1', (req, res) => {

        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/totalreport.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].country == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }


            res.json(result)




        /*
        const quotesId1 = req.params.quotesId1
        const links = require("./countries.json");


    const check = []


       const quotesId = capitalizeFirstLetter(quotesId1);
      // console.log(links.filter(country => country.name != quotesId)[0].casesAddress)

      //  res.json("Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing ")



           const sourceAddress = links.filter(country => country.name == quotesId)[0].casesAddress
    //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
           const alpha3Code = links.filter(country => country.name == quotesId)[0].Alpha3Code
           const numericCode = links.filter(country => country.name == quotesId)[0].NumericCode
           const country = links.filter(country => country.name == quotesId)[0].name
           axios.get(sourceAddress)
               .then(response => {
                   const html = response.data
                   const $ = cheerio.load(html)
                   const specificArticles = []
                   const totalStats = []

                   $("div[class='UvMayb']", html).each(function () {
                       //   const title = $(this).text()
                       totalStats.push($(this).text())
                   })

                   const cases = totalStats[0]
                   const deaths = totalStats[1]
                   const doses = totalStats[2]
                   var peopleFullyVaccinated = totalStats[4]

                   console.log(totalStats.length)

                   if (totalStats.length = 4) {
                       peopleFullyVaccinated = totalStats[3]
                   }


    //console.log(peopleFullyVaccinated.length)
                   specificArticles.push({
                       country,
                       alphaCode: alpha3Code,
                       numericCode: numericCode,
                       cases,
                       deaths,
                       doses,
                       peopleFullyVaccinated
                       //   totalStats
                   })

                   res.json(specificArticles)
                   //  console.log(specificArticles)
               }).catch((err) => console.log(err))
        */

    })


    app.get('/dailyreport/country/:quotesId1', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/dailyreport.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].country == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)

        /*
            const quotesId1 = req.params.quotesId1
            const links = require("./countries.json");





            const quotesId = capitalizeFirstLetter(quotesId1);
        //    const links = require("./countries.json");
            const sourceAddress = links.filter(country => country.name == quotesId)[0].casesAddress
        //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
            const alpha3Code = links.filter(country => country.name == quotesId)[0].Alpha3Code
            const numericCode = links.filter(country => country.name == quotesId)[0].NumericCode
            const country = links.filter(country => country.name == quotesId)[0].name
            axios.get(sourceAddress)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    const specificArticles = []
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


                    const cases = dailyStats[0]
                    const deaths = dailyStats[1]
                    const doses = dailyStats[2]
                    const percentofpeopleoverpopvaccinated = dailyStats[3]
                    const newCasesLastWeek = newCases[0]
                //    const newDosesLastWeek1 = newCases[1]

                    specificArticles.push({
                        country,
                        alphaCode: alpha3Code,
                        numericCode: numericCode,
                        cases,
                        newCasesLastWeek,
                       // newDosesLastWeek: newDosesLastWeek1,
                        doses,
                        deaths,
                        percentofpeopleoverpopvaccinated
                    })

                    res.json(specificArticles)
                    //  console.log(specificArticles)
                }).catch((err) => console.log(err))
        */
    })


    app.get('/countiesreport/cases/country/:quotesId1', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/countrycases.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].countyOfThisCountry == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)

        /*
        const namesTitle = []
        const quotesId1 = req.params.quotesId1
        const links = require("./countries.json");





        const quotesId = capitalizeFirstLetter(quotesId1);
        const sourceAddress = links.filter(country => country.name == quotesId)[0].casesAddress
    //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.name == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.name == quotesId)[0].NumericCode
        const country = links.filter(country => country.name == quotesId)[0].name
        axios.get(sourceAddress)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const numbers = []
                //  const namesTitle = []
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


                //      const symbol = images[0]
                const countryname = namesTitle[0]
                //  const number = numbers[0]

                for (let i = images.length; i < namesTitle.length; i++) {
                    images.push("No Data")
                }

                //    const newDosesLastWeek1 = newCases[1]
                var k1 = 0;
                for (let i = 0; i < namesTitle.length; i++) {




                    specificArticles.push({
                        name: namesTitle[i],
                        symbol: images[i],
                        totalCases: numbers[0+k1],
                        newCasesPerDay: numbers[1+k1],
                        casesPerMillion: numbers[3+k1],
                        deaths: numbers[4+k1]
                    })
                    k1 += 5;
                }
                console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
    */
    })


    app.get('/countiesreport/vaccines/country/:quotesId1', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/countryvaccines.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].countyOfThisCountry == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)

        /*
        const namesTitle = []
        const quotesId1 = req.params.quotesId1
        const links = require("./countries.json");





        const quotesId = capitalizeFirstLetter(quotesId1);
        const sourceAddress = links.filter(country => country.name == quotesId)[0].casesAddress
        const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.name == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.name == quotesId)[0].NumericCode
        const country = links.filter(country => country.name == quotesId)[0].name
        axios.get(source2Address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const numbers = []
                //  const namesTitle = []
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


                //      const symbol = images[0]
                const countryname = namesTitle[0]
                //  const number = numbers[0]

                for (let i = images.length; i < namesTitle.length; i++) {
                    images.push("No Data")
                }

                //    const newDosesLastWeek1 = newCases[1]
                var k1 = 0;
                for (let i = 0; i < namesTitle.length; i++) {
                    specificArticles.push({
                        name: namesTitle[i],
                        symbol: images[i],
                        totalDoses: numbers[0+k1],
                        newDosesPerDay: numbers[1+k1],
                        peopleFullyVaccinated: numbers[3+k1],
                        percentOfPopulationFullyVaccinated: numbers[4+k1]
                    })
                    k1 += 5;
                }
                console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
    */
    })


    app.get('/topcovidnews/country/:quotesId1', (req, res) => {
        //  const namesTitle = []

        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/news.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].country == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)

        /*
        const quotesId1 = req.params.quotesId1
        const links = require("./countries.json");





        const quotesId = capitalizeFirstLetter(quotesId1);
        const sourceAddress = links.filter(country => country.name == quotesId)[0].casesAddress
        //   const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.name == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.name == quotesId)[0].NumericCode
        const country = links.filter(country => country.name == quotesId)[0].name
        axios.get(sourceAddress)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const articleTitle = []
                const articleUrl = []
                const articleSource = []
                const titleImage = []
                const hoursAgo = []
                const timeStamp = []

                $("a[class='DY5T1d RZIKme']", html).each(function () {
                    //  const articleTitle = $(this).text()
                    //   const url2 = $(this).attr('href')
                    //   const url = base1+url2

                    articleTitle.push($(this).text())
                    articleUrl.push("https://news.google.com"+$(this).attr('href'))
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


                for (let i = 0; i < articleTitle.length; i++) {
                    specificArticles.push({
                        articleTitle: articleTitle[i],
                        articleUrl: articleUrl[i],
                        titleImage: titleImage[i],
                        source: articleSource[i],
                        hoursAgo: hoursAgo[i],
                        timeStamp: timeStamp[i]
                    })

                }
                //  console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
    */
    })

const worker = new Worker('./worker.js')

//const worker2 = new Worker('./worker2.js')


worker.on('message', (data) => {
    console.log(data)
    console.log(data.count)
    console.log("k")
})

worker.on("error", (err) => {
    console.error(err);
});

worker.on("exit", () => {
    console.log('Worker exited')

 /*   const worker = new Worker('./worker.js')
    worker.on('message', (data) => {
        console.log(data)
        console.log(data.count)
        console.log("k")
    })   */
});



//worker2.on('message', (data) => {
  //  console.log(data)
//})

//worker2.on("error", (err) => {
 //   console.error(err);
//});

//worker2.on("exit", () => {
//    console.log('Worker exited')
//});


    /*



    function phase2() {


        const articleTitle1 = []
        const articleUrl1 = []
        const articleSource1 = []
        const titleImage1 = []
        const hoursAgo1 = []
        const timeStamp1 = []
        const country1 = []
        const specificArticles11 = []
        const specificArticles31 = []
        const specificArticles41 = []

        for (let i = 44; i < 88; i++) {

            const options = {
                url: links1[i].casesAddress,
                method: "GET",
                proxy: proxyGenerator()
            };

            request(options, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    const articleTitle11 = []

    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------

                    const totalStats1 = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats1.push($(this).text())
                    })

                    const cases = totalStats1[0]
                    var deaths = totalStats1[1]
                    var doses = totalStats1[2]
                    var peopleFullyVaccinated = totalStats1[4]

                    console.log(totalStats1.length)

                    if (totalStats1[1] == 'No data') {
                        deaths = totalStats1[2]
                        doses = totalStats1[3]
                    }

                    if (totalStats1[4] == 'No data') {
                        peopleFullyVaccinated = totalStats1[5]
                    }

                    if (peopleFullyVaccinated == undefined) {
                        //    console.log('woooooooooooooooooooooooooooooow')
                        peopleFullyVaccinated = totalStats1[3]
                    }

                    specificArticles11.push({
                        country: links[i].name,
                        alphaCode: links1[i].Alpha3Code,
                        numericCode: links[i].NumericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated,
                        timestamp: datetime,
                        totalStats1
                    })

                    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------
    ///dailyreport/country/:quotesId1------------------------------------------------- Daily Report------------------------------------------------------

                    const dailyStats1 = []
                    const newCases1 = []

                    $("div[class='tIUMlb']", html).each(function () {
                        const title = $(this).text()
                        //     const url = $(this).attr('href')
                        dailyStats1.push($(this).text())
                    })


                    $("div[class='DlOivf']", html).each(function () {
                        const title = $(this).text()
                        newCases1.push($(this).text())
                        //     const url = $(this).attr('href')

                    })

                    const cases2 = dailyStats1[0]
                    const deaths2 = dailyStats1[1]
                    const doses2 = dailyStats1[2]
                    const percentofpeopleoverpopvaccinated2 = dailyStats1[3]
                    const newCasesLastWeek2 = newCases1[0]

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

                    const namesTitle1 = []
                    const numbers1 = []
                    const images1 = []


                    $("td[class='l3HOY']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        numbers1.push($(this).text())

                    })

                    $("div[class='pcAJd']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        namesTitle1.push($(this).text())
                    })


                    $("img[class='oIC36d']", html).each(function () {
                        // const title = $(this).text()
                        //   const url = $(this).attr('src')
                        images1.push($(this).attr('src'))
                    })


                    for (let i = images1.length; i < namesTitle1.length; i++) {
                        images1.push("No Data")
                    }

                    var k1 = 0;
                    for (let i = 0; i < namesTitle1.length; i++) {

                        specificArticles31.push({
                            name: namesTitle1[i],
                            symbol: images1[i],
                            totalCases: numbers1[0 + k1],
                            newCasesPerDay: numbers1[1 + k1],
                            casesPerMillion: numbers1[3 + k1],
                            deaths: numbers1[4 + k1],
                            timestamp: datetime,
                            countyOfThisCountry: links[i].name
                        })
                        k1 += 5;
                    }

                    // /countiesreport/cases/country/:quotesId1----------------------------------------COUNTY CASES----------------------------------------------------
                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------
                    $("a[class='DY5T1d RZIKme']", html).each(function () {
                        //  const articleTitle = $(this).text()
                        //   const url2 = $(this).attr('href')
                        //   const url = base1+url2
                        articleTitle11.push($(this).text())
                        articleTitle1.push($(this).text())
                        articleUrl1.push("https://news.google.com" + $(this).attr('href'))

                    })

                    $("a[class='wEwyrc AVN2gc WfKKme ']", html).each(function () {
                        //   const title = $(this).text()
                        //  const url = $(this).attr('href')
                        articleSource1.push($(this).text())
                    })

                    $("img[class='tvs3Id QwxBBf']", html).each(function () {
                        //  const title = $(this).text()
                        //  const url = $(this).attr('src')
                        titleImage1.push($(this).attr('src'))
                    })

                    $("time[class='WW6dff uQIVzc Sksgp']", html).each(function () {
                        // const longAgo = $(this).text()
                        //   const timeStamp = $(this).attr('datetime')
                        //   const url = base1+url2
                        hoursAgo1.push($(this).text())
                        timeStamp1.push($(this).attr('datetime'))
                    })

                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------

                    for (let k = 0; k < articleTitle11.length; k++) {
                        country1.push(links1[i].name)
                    }

                    // console.log(timeStamp);
                    console.log(hoursAgo1);

                    //  console.log(article_headings);
                } else {
                    console.log("Error scraping site, please try again");
                }

                const specificArticles1 = []

                for (let i = 110; i < 165; i++) {
                    specificArticles1.push({
                        articleTitle: articleTitle1[i],
                        articleUrl: articleUrl1[i],
                        titleImage: titleImage1[i],
                        source: articleSource1[i],
                        hoursAgo: hoursAgo1[i],
                        timeStamp: timeStamp1[i],
                        country: country1[i]
                    })

                }
                console.log("proc-2")
                console.log(specificArticles11.length)
                if (specificArticles11.length == 44) {

                    phase3()

                    require('fs').writeFile(
                        './filestorage/news2.json',

                        JSON.stringify(specificArticles1, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );


                    console.error(specificArticles1)
                    console.error(specificArticles11)

                    require('fs').writeFile(
                        './filestorage/totalreport2.json',

                        JSON.stringify(specificArticles11, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/dailyreport2.json',

                        JSON.stringify(specificArticles41, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/countrycases2.json',

                        JSON.stringify(specificArticles31, null, 2),

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









    function phase3() {


        const articleTitle2 = []
        const articleUrl2 = []
        const articleSource2 = []
        const titleImage2 = []
        const hoursAgo2 = []
        const timeStamp2 = []
        const country2 = []
        const specificArticles12 = []
        const specificArticles32 = []
        const specificArticles42 = []

        for (let i = 88; i < 132; i++) {

            const options = {
                url: links1[i].casesAddress,
                method: "GET",
                proxy: proxyGenerator()
            };

            request(options, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    const articleTitle12 = []

    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------

                    const totalStats2 = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats2.push($(this).text())
                    })

                    const cases = totalStats2[0]
                    var deaths = totalStats2[1]
                    var doses = totalStats2[2]
                    var peopleFullyVaccinated = totalStats2[4]

                    console.log(totalStats2.length)

                    if (totalStats2[1] == 'No data') {
                        deaths = totalStats2[2]
                        doses = totalStats2[3]
                    }

                    if (totalStats2[4] == 'No data') {
                        peopleFullyVaccinated = totalStats2[5]
                    }

                    if (peopleFullyVaccinated == undefined) {
                        //    console.log('woooooooooooooooooooooooooooooow')
                        peopleFullyVaccinated = totalStats2[3]
                    }

                    specificArticles12.push({
                        country: links[i].name,
                        alphaCode: links1[i].Alpha3Code,
                        numericCode: links[i].NumericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated,
                        timestamp: datetime,
                        totalStats2
                    })

                    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------
    ///dailyreport/country/:quotesId1------------------------------------------------- Daily Report------------------------------------------------------

                    const dailyStats2 = []
                    const newCases2 = []

                    $("div[class='tIUMlb']", html).each(function () {
                        const title = $(this).text()
                        //     const url = $(this).attr('href')
                        dailyStats2.push($(this).text())
                    })


                    $("div[class='DlOivf']", html).each(function () {
                        const title = $(this).text()
                        newCases2.push($(this).text())
                        //     const url = $(this).attr('href')

                    })

                    const cases2 = dailyStats2[0]
                    const deaths2 = dailyStats2[1]
                    const doses2 = dailyStats2[2]
                    const percentofpeopleoverpopvaccinated2 = dailyStats2[3]
                    const newCasesLastWeek2 = newCases2[0]

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

                    const namesTitle2 = []
                    const numbers2 = []
                    const images2 = []


                    $("td[class='l3HOY']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        numbers2.push($(this).text())

                    })

                    $("div[class='pcAJd']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        namesTitle2.push($(this).text())
                    })


                    $("img[class='oIC36d']", html).each(function () {
                        // const title = $(this).text()
                        //   const url = $(this).attr('src')
                        images2.push($(this).attr('src'))
                    })


                    for (let i = images2.length; i < namesTitle2.length; i++) {
                        images2.push("No Data")
                    }

                    var k1 = 0;
                    for (let i = 0; i < namesTitle2.length; i++) {

                        specificArticles32.push({
                            name: namesTitle2[i],
                            symbol: images2[i],
                            totalCases: numbers2[0 + k1],
                            newCasesPerDay: numbers2[1 + k1],
                            casesPerMillion: numbers2[3 + k1],
                            deaths: numbers2[4 + k1],
                            timestamp: datetime,
                            countyOfThisCountry: links[i].name
                        })
                        k1 += 5;
                    }

                    // /countiesreport/cases/country/:quotesId1----------------------------------------COUNTY CASES----------------------------------------------------
                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------
                    $("a[class='DY5T1d RZIKme']", html).each(function () {
                        //  const articleTitle = $(this).text()
                        //   const url2 = $(this).attr('href')
                        //   const url = base1+url2
                        articleTitle12.push($(this).text())
                        articleTitle2.push($(this).text())
                        articleUrl2.push("https://news.google.com" + $(this).attr('href'))

                    })

                    $("a[class='wEwyrc AVN2gc WfKKme ']", html).each(function () {
                        //   const title = $(this).text()
                        //  const url = $(this).attr('href')
                        articleSource2.push($(this).text())
                    })

                    $("img[class='tvs3Id QwxBBf']", html).each(function () {
                        //  const title = $(this).text()
                        //  const url = $(this).attr('src')
                        titleImage2.push($(this).attr('src'))
                    })

                    $("time[class='WW6dff uQIVzc Sksgp']", html).each(function () {
                        // const longAgo = $(this).text()
                        //   const timeStamp = $(this).attr('datetime')
                        //   const url = base1+url2
                        hoursAgo2.push($(this).text())
                        timeStamp2.push($(this).attr('datetime'))
                    })

                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------

                    for (let k = 0; k < articleTitle12.length; k++) {
                        country2.push(links1[i].name)
                    }

                    // console.log(timeStamp);
                    console.log(hoursAgo2);

                    //  console.log(article_headings);
                } else {
                    console.log("Error scraping site, please try again");
                }

                const specificArticles2 = []

                for (let i = 0; i < articleTitle2.length; i++) {
                    specificArticles2.push({
                        articleTitle: articleTitle2[i],
                        articleUrl: articleUrl2[i],
                        titleImage: titleImage2[i],
                        source: articleSource2[i],
                        hoursAgo: hoursAgo2[i],
                        timeStamp: timeStamp2[i],
                        country: country2[i]
                    })

                }
                console.log("proc-3")
                console.log(specificArticles12.length)
                if (specificArticles12.length == 44) {

                    phase4()

                    require('fs').writeFile(
                        './filestorage/news3.json',

                        JSON.stringify(specificArticles2, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );


                    console.error(specificArticles2)
                    console.error(specificArticles12)

                    require('fs').writeFile(
                        './filestorage/totalreport3.json',

                        JSON.stringify(specificArticles12, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/dailyreport3.json',

                        JSON.stringify(specificArticles42, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/countrycases3.json',

                        JSON.stringify(specificArticles32, null, 2),

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



    function phase4() {


        const articleTitle23 = []
        const articleUrl23 = []
        const articleSource23 = []
        const titleImage23 = []
        const hoursAgo23 = []
        const timeStamp23 = []
        const country23 = []
        const specificArticles123 = []
        const specificArticles323 = []
        const specificArticles423 = []

        for (let i = 132; i < 176; i++) {

            const options = {
                url: links1[i].casesAddress,
                method: "GET",
                proxy: proxyGenerator()
            };

            request(options, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    const articleTitle123 = []

    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------

                    const totalStats23 = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats23.push($(this).text())
                    })

                    const cases = totalStats23[0]
                    var deaths = totalStats23[1]
                    var doses = totalStats23[2]
                    var peopleFullyVaccinated = totalStats23[4]

                    console.log(totalStats23.length)

                    if (totalStats23[1] == 'No data') {
                        deaths = totalStats23[2]
                        doses = totalStats23[3]
                    }

                    if (totalStats23[4] == 'No data') {
                        peopleFullyVaccinated = totalStats23[5]
                    }

                    if (peopleFullyVaccinated == undefined) {
                        //    console.log('woooooooooooooooooooooooooooooow')
                        peopleFullyVaccinated = totalStats23[3]
                    }

                    specificArticles123.push({
                        country: links[i].name,
                        alphaCode: links1[i].Alpha3Code,
                        numericCode: links[i].NumericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated,
                        timestamp: datetime,
                        totalStats23
                    })

                    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------
    ///dailyreport/country/:quotesId1------------------------------------------------- Daily Report------------------------------------------------------

                    const dailyStats23 = []
                    const newCases23 = []

                    $("div[class='tIUMlb']", html).each(function () {
                        const title = $(this).text()
                        //     const url = $(this).attr('href')
                        dailyStats23.push($(this).text())
                    })


                    $("div[class='DlOivf']", html).each(function () {
                        const title = $(this).text()
                        newCases23.push($(this).text())
                        //     const url = $(this).attr('href')

                    })

                    const cases2 = dailyStats23[0]
                    const deaths2 = dailyStats23[1]
                    const doses2 = dailyStats23[2]
                    const percentofpeopleoverpopvaccinated2 = dailyStats23[3]
                    const newCasesLastWeek2 = newCases23[0]

                    specificArticles423.push({
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

                    const namesTitle23 = []
                    const numbers23 = []
                    const images23 = []


                    $("td[class='l3HOY']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        numbers23.push($(this).text())

                    })

                    $("div[class='pcAJd']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        namesTitle23.push($(this).text())
                    })


                    $("img[class='oIC36d']", html).each(function () {
                        // const title = $(this).text()
                        //   const url = $(this).attr('src')
                        images23.push($(this).attr('src'))
                    })


                    for (let i = images23.length; i < namesTitle23.length; i++) {
                        images23.push("No Data")
                    }

                    var k1 = 0;
                    for (let i = 0; i < namesTitle23.length; i++) {

                        specificArticles323.push({
                            name: namesTitle23[i],
                            symbol: images23[i],
                            totalCases: numbers23[0 + k1],
                            newCasesPerDay: numbers23[1 + k1],
                            casesPerMillion: numbers23[3 + k1],
                            deaths: numbers23[4 + k1],
                            timestamp: datetime,
                            countyOfThisCountry: links[i].name
                        })
                        k1 += 5;
                    }

                    // /countiesreport/cases/country/:quotesId1----------------------------------------COUNTY CASES----------------------------------------------------
                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------
                    $("a[class='DY5T1d RZIKme']", html).each(function () {
                        //  const articleTitle = $(this).text()
                        //   const url2 = $(this).attr('href')
                        //   const url = base1+url2
                        articleTitle123.push($(this).text())
                        articleTitle23.push($(this).text())
                        articleUrl23.push("https://news.google.com" + $(this).attr('href'))

                    })

                    $("a[class='wEwyrc AVN2gc WfKKme ']", html).each(function () {
                        //   const title = $(this).text()
                        //  const url = $(this).attr('href')
                        articleSource23.push($(this).text())
                    })

                    $("img[class='tvs3Id QwxBBf']", html).each(function () {
                        //  const title = $(this).text()
                        //  const url = $(this).attr('src')
                        titleImage23.push($(this).attr('src'))
                    })

                    $("time[class='WW6dff uQIVzc Sksgp']", html).each(function () {
                        // const longAgo = $(this).text()
                        //   const timeStamp = $(this).attr('datetime')
                        //   const url = base1+url2
                        hoursAgo23.push($(this).text())
                        timeStamp23.push($(this).attr('datetime'))
                    })

                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------

                    for (let k = 0; k < articleTitle123.length; k++) {
                        country23.push(links1[i].name)
                    }

                    // console.log(timeStamp);
                    console.log(hoursAgo23);

                    //  console.log(article_headings);
                } else {
                    console.log("Error scraping site, please try again");
                }

                const specificArticles23 = []

                for (let i = 0; i < articleTitle23.length; i++) {
                    specificArticles23.push({
                        articleTitle: articleTitle23[i],
                        articleUrl: articleUrl23[i],
                        titleImage: titleImage23[i],
                        source: articleSource23[i],
                        hoursAgo: hoursAgo23[i],
                        timeStamp: timeStamp23[i],
                        country: country23[i]
                    })

                }
                console.log("proc-4")
                console.log(specificArticles123.length)
                if (specificArticles123.length == (44)) {
                    phase5()

                    require('fs').writeFile(
                        './filestorage/news4.json',

                        JSON.stringify(specificArticles23, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );


                    console.error(specificArticles23)
                    console.error(specificArticles123)

                    require('fs').writeFile(
                        './filestorage/totalreport4.json',

                        JSON.stringify(specificArticles123, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/dailyreport4.json',

                        JSON.stringify(specificArticles423, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/countrycases4.json',

                        JSON.stringify(specificArticles323, null, 2),

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









    function phase5() {

        const articleTitle234 = []
        const articleUrl234 = []
        const articleSource234 = []
        const titleImage234 = []
        const hoursAgo234 = []
        const timeStamp234 = []
        const country234 = []
        const specificArticles1234 = []
        const specificArticles3234 = []
        const specificArticles4234 = []

        for (let i = 176; i < links.length; i++) {

            const options = {
                url: links1[i].casesAddress,
                method: "GET",
                proxy: proxyGenerator()
            };

            request(options, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    const articleTitle1234 = []

    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------

                    const totalStats234 = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats234.push($(this).text())
                    })

                    const cases = totalStats234[0]
                    var deaths = totalStats234[1]
                    var doses = totalStats234[2]
                    var peopleFullyVaccinated = totalStats234[4]

                    console.log(totalStats234.length)

                    if (totalStats234[1] == 'No data') {
                        deaths = totalStats234[2]
                        doses = totalStats234[3]
                    }

                    if (totalStats234[4] == 'No data') {
                        peopleFullyVaccinated = totalStats234[5]
                    }

                    if (peopleFullyVaccinated == undefined) {
                        //    console.log('woooooooooooooooooooooooooooooow')
                        peopleFullyVaccinated = totalStats234[3]
                    }

                    specificArticles1234.push({
                        country: links[i].name,
                        alphaCode: links1[i].Alpha3Code,
                        numericCode: links[i].NumericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated,
                        timestamp: datetime,
                        totalStats234
                    })

                    ///totalreport/country/:quotesId1-------------------------------------------------Total Report-------------------------------------------------------
    ///dailyreport/country/:quotesId1------------------------------------------------- Daily Report------------------------------------------------------

                    const dailyStats234 = []
                    const newCases234 = []

                    $("div[class='tIUMlb']", html).each(function () {
                        const title = $(this).text()
                        //     const url = $(this).attr('href')
                        dailyStats234.push($(this).text())
                    })


                    $("div[class='DlOivf']", html).each(function () {
                        const title = $(this).text()
                        newCases234.push($(this).text())
                        //     const url = $(this).attr('href')

                    })

                    const cases2 = dailyStats234[0]
                    const deaths2 = dailyStats234[1]
                    const doses2 = dailyStats234[2]
                    const percentofpeopleoverpopvaccinated2 = dailyStats234[3]
                    const newCasesLastWeek2 = newCases234[0]

                    specificArticles4234.push({
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

                    const namesTitle234 = []
                    const numbers234 = []
                    const images234 = []


                    $("td[class='l3HOY']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        numbers234.push($(this).text())

                    })

                    $("div[class='pcAJd']", html).each(function () {
                        const title = $(this).text()
                        //const url = $(this).attr('href')
                        namesTitle234.push($(this).text())
                    })


                    $("img[class='oIC36d']", html).each(function () {
                        // const title = $(this).text()
                        //   const url = $(this).attr('src')
                        images234.push($(this).attr('src'))
                    })


                    for (let i = images234.length; i < namesTitle234.length; i++) {
                        images234.push("No Data")
                    }

                    var k1 = 0;
                    for (let i = 0; i < namesTitle234.length; i++) {

                        specificArticles3234.push({
                            name: namesTitle234[i],
                            symbol: images234[i],
                            totalCases: numbers234[0 + k1],
                            newCasesPerDay: numbers234[1 + k1],
                            casesPerMillion: numbers234[3 + k1],
                            deaths: numbers234[4 + k1],
                            timestamp: datetime,
                            countyOfThisCountry: links[i].name
                        })
                        k1 += 5;
                    }

                    // /countiesreport/cases/country/:quotesId1----------------------------------------COUNTY CASES----------------------------------------------------
                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------
                    $("a[class='DY5T1d RZIKme']", html).each(function () {
                        //  const articleTitle = $(this).text()
                        //   const url2 = $(this).attr('href')
                        //   const url = base1+url2
                        articleTitle1234.push($(this).text())
                        articleTitle234.push($(this).text())
                        articleUrl234.push("https://news.google.com" + $(this).attr('href'))

                    })

                    $("a[class='wEwyrc AVN2gc WfKKme ']", html).each(function () {
                        //   const title = $(this).text()
                        //  const url = $(this).attr('href')
                        articleSource234.push($(this).text())
                    })

                    $("img[class='tvs3Id QwxBBf']", html).each(function () {
                        //  const title = $(this).text()
                        //  const url = $(this).attr('src')
                        titleImage234.push($(this).attr('src'))
                    })

                    $("time[class='WW6dff uQIVzc Sksgp']", html).each(function () {
                        // const longAgo = $(this).text()
                        //   const timeStamp = $(this).attr('datetime')
                        //   const url = base1+url2
                        hoursAgo234.push($(this).text())
                        timeStamp234.push($(this).attr('datetime'))
                    })

                    // /topcovidnews/country/:quotesId1 ----------------------------------------------------NEWS---------------------------------------------

                    for (let k = 0; k < articleTitle1234.length; k++) {
                        country234.push(links1[i].name)
                    }

                    // console.log(timeStamp);
                    console.log(hoursAgo234);

                    //  console.log(article_headings);
                } else {
                    console.log("Error scraping site, please try again");
                }

                const specificArticles234 = []

                for (let i = 0; i < articleTitle234.length; i++) {
                    specificArticles234.push({
                        articleTitle: articleTitle234[i],
                        articleUrl: articleUrl234[i],
                        titleImage: titleImage234[i],
                        source: articleSource234[i],
                        hoursAgo: hoursAgo234[i],
                        timeStamp: timeStamp234[i],
                        country: country234[i]
                    })

                }
                console.log("proc-5")
                console.log(specificArticles1234.length)
                if (specificArticles1234.length == (links.length - 176)) {


                    require('fs').writeFile(
                        './filestorage/news5.json',

                        JSON.stringify(specificArticles234, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );


                    console.error(specificArticles234)
                    console.error(specificArticles1234)

                    require('fs').writeFile(
                        './filestorage/totalreport5.json',

                        JSON.stringify(specificArticles1234, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/dailyreport5.json',

                        JSON.stringify(specificArticles4234, null, 2),

                        function (err) {
                            if (err) {
                                console.error('Crap happens');
                            }
                        }
                    );

                    require('fs').writeFile(
                        './filestorage/countrycases5.json',

                        JSON.stringify(specificArticles3234, null, 2),

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



    // */


    function updateData2() {

        //    const datetime = `${getFullYear()}`
//console.log(datetime)
//console.log("datetime")
        const specificArticles5 = []
        const specificArticles6 = []

        for (let i = 0; i < links.length; i++) {

            const options = {
                url: links1[i].vaccineAddress,
                method: "GET",
                proxy: proxyGenerator()
            };

            request(options, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);


                    const totalStats = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats.push($(this).text())
                    })

                    const cases = totalStats[0]
                    var deaths = totalStats[1]
                    var doses = totalStats[2]
                    var peopleFullyVaccinated = totalStats[4]

                    console.log(totalStats.length)


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


                    specificArticles6.push({
                        country: links[i].name,
                        alphaCode: links1[i].Alpha3Code,
                        numericCode: links[i].NumericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated,
                        totalStats
                    })

                    //     const specificArticles = []
                    const numbers = []
                    const namesTitle = []
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


                    //      const symbol = images[0]
                    const countryname = namesTitle[0]
                    //  const number = numbers[0]

                    for (let i = images.length; i < namesTitle.length; i++) {
                        images.push("No Data")
                    }

                    //    const newDosesLastWeek1 = newCases[1]
                    var k1 = 0;
                    for (let h = 0; h < namesTitle.length; h++) {
                        specificArticles5.push({
                            name: namesTitle[h],
                            symbol: images[h],
                            totalDoses: numbers[0 + k1],
                            newDosesPerDay: numbers[1 + k1],
                            peopleFullyVaccinated: numbers[3 + k1],
                            percentOfPopulationFullyVaccinated: numbers[4 + k1],
                            timestamp: datetime,
                            countyOfThisCountry: links[i].name

                        })
                        k1 += 5;
                    }
                    if (specificArticles6.length == links.length) {
                        require('fs').writeFile(
                            './filestorage/countryvaccines.json',

                            JSON.stringify(specificArticles5, null, 2),

                            function (err) {
                                if (err) {
                                    console.error('Crap happens');
                                }
                            }
                        );
                    }
                }
            });
        }

    }

    app.get('/test', (req, res) => {


        //   console.log(country[1])
        //   res.json(specificArticles)
        //   hoursAgo.length = 0
    })


    app.get('/test1/:quotesId1', (req, res) => {

        const quotesId1 = req.params.quotesId1
        const links = require(`./${quotesId1}.json`);

    })

//this function scrapes a website for ip addrress and then manipulate using a random generator which then is input into the option variable which tricks the https website that is come from another location

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


    /*

    app.get('/stats', (req, res)=> {
        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $("div[class='UvMayb']", html).each(function () {
                const title = $(this).text()
           //     const url = $(this).attr('href')
                articles.push({
                    title
              //      url
                })
            })
    res.json(articles)
        })

    })



    app.get('/statsdaily', (req, res)=> {
        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("div[class='tIUMlb']", html).each(function () {
                    const title = $(this).text()
                    //     const url = $(this).attr('href')
                    articles5.push({
                        title
                        //      url
                    })
                })
                res.json(articles5)
            })

    })




    app.get('/statsweekrange', (req, res)=> {
        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("div[class='DlOivf']", html).each(function () {
                    const title = $(this).text()
                    //     const url = $(this).attr('href')
                    articles5.push({
                        title
                        //      url
                    })
                })
                res.json(articles5)
            })

    })
    // 75745 75762 75775 75779 75784 75793 75795
    // 75796 75798 75800 75802 75806 75814

    app.get('/statstime', (req, res)=> {
        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

    //console.log(response.data)
                    //    console.log($("time[class='vBLAZ Yt6XT']").text());
                    //  console.log($("time[class='vBLAZ Yt6XT']").parent().html());
                    $('time:contains("ago")', html).each(function () {
                        const longAgo = $(this).text()
                     //   const what = $(this).find("time[class='vBLAZ Yt6XT']").attr('datetime')
                        const what = $(this).find('time.vBLAZ.Yt6XT').attr('datetime')
                        const timeStamp = $(this).text()
                        //  console.log(what)

                        articles6.push({
                            longAgo
                            //  timeStamp,
                            // what,
                            // timeStamp
                        })



                    })

                })
        res.json(articles6)
        console.log(articles6)
    })


    app.get('/2', (req, res)=> {
        res.json('Welcome to my Covid Report API')
    })





    app.get('/counties', (req, res)=> {


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("td[class='l3HOY']", html).each(function () {
                      const title = $(this).text()
                    //const url = $(this).attr('href')
                    articles3.push({
                           title
                       // url
                    })
                })
                res.json(articles3)
            })

    })


    app.get('/countiesname', (req, res)=> {


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("div[class='pcAJd']", html).each(function () {
                    const title = $(this).text()
                    //const url = $(this).attr('href')
                    articles2.push({
                        title
                        // url
                    })
                })
                res.json(articles2)
            })

    })


    app.get('/countiesimage', (req, res)=> {


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("img[class='oIC36d']", html).each(function () {
                   // const title = $(this).text()
                    const url = $(this).attr('src')
                    articles2.push({
                       // title
                         url
                    })
                })
                res.json(articles2)
            })

    })









    app.get('/counties1', (req, res)=> {


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=5')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("td[class='l3HOY']", html).each(function () {
                    const title = $(this).text()
                    //const url = $(this).attr('href')
                    articles7.push({
                        title
                        // url
                    })
                })
                res.json(articles7)
            })

    })


    app.get('/countiesname1', (req, res)=> {


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=5')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("div[class='pcAJd']", html).each(function () {
                    const title = $(this).text()
                    //const url = $(this).attr('href')
                    articles8.push({
                        title
                        // url
                    })
                })
                res.json(articles8)
            })

    })

    app.get('/countiesimage1', (req, res)=> {


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=5')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("img[class='oIC36d']", html).each(function () {
                    // const title = $(this).text()
                    const url = $(this).attr('src')
                    articles2.push({
                        // title
                        url
                    })
                })
                res.json(articles2)
            })

    })



    app.get('/3', (req, res)=> {
        res.json('Welcome to my Covid Report API')
    })





    app.get('/news', (req, res)=> {
        const base1 = "https://news.google.com"

        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=5')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("a[class='DY5T1d RZIKme']", html).each(function () {
                    const articleTitle = $(this).text()
                    const url2 = $(this).attr('href')
                    const url = base1+url2
                    articles1.push({
                        articleTitle,
                         url
                    })
                })
                res.json(articles1)
            })

    })


    app.get('/newsname', (req, res)=> {

        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("a[class='wEwyrc AVN2gc WfKKme ']", html).each(function () {
                    const title = $(this).text()
                    //  const url = $(this).attr('href')
                    articles4.push({
                        title
                        // url
                    })
                })
                res.json(articles4)
            })

    })

    app.get('/newsimage', (req, res)=> {

        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("img[class='tvs3Id QwxBBf']", html).each(function () {
                  //  const title = $(this).text()
                      const url = $(this).attr('src')
                    articles9.push({
                        url
                        // url
                    })
                })
                res.json(articles9)
            })

    })


    app.get('/newstime', (req, res)=> {
        const base1 = "https://news.google.com"


        axios.get('https://news.google.com/covid19/map?hl=en-US&mid=%2Fm%2F0jdd&gl=US&ceid=US%3Aen&state=1')
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("time[class='WW6dff uQIVzc Sksgp']", html).each(function () {
                    const longAgo = $(this).text()
                    const timeStamp = $(this).attr('datetime')
                 //   const url = base1+url2
                    articles1.push({
                        longAgo,
                        timeStamp
                    })
                })
                res.json(articles1)
            })

    })




     */


    app.get('/totalreport/alphacode/:quotesId1', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/totalreport.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].alphaCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)


        /*
            const quotesId1 = req.params.quotesId1

            const quotesId = quotesId1.toUpperCase()

            const links = require("./countries.json");
            const sourceAddress = links.filter(country => country.Alpha3Code == quotesId)[0].casesAddress
        //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
            const alpha3Code = links.filter(country => country.Alpha3Code == quotesId)[0].Alpha3Code
            const numericCode = links.filter(country => country.Alpha3Code == quotesId)[0].NumericCode
            const country = links.filter(country => country.Alpha3Code == quotesId)[0].name
            axios.get(sourceAddress)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    const specificArticles = []
                    const totalStats = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats.push($(this).text())
                    })

                    const cases = totalStats[0]
                    const deaths = totalStats[1]
                    const doses = totalStats[2]
                    var peopleFullyVaccinated = totalStats[4]

                    console.log(totalStats.length)

                    if (totalStats.length = 4) {
                        peopleFullyVaccinated = totalStats[3]
                    }


        //console.log(peopleFullyVaccinated.length)
                    specificArticles.push({
                        country,
                        alphaCode: alpha3Code,
                        numericCode: numericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated
                    //    totalStats
                    })

                    res.json(specificArticles)
                    //  console.log(specificArticles)
                }).catch((err) => console.log(err))
        */
    })


    app.get('/dailyreport/alphacode/:quotesId1', (req, res) => {

        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/dailyreport.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].alphaCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)

        /*
            const quotesId1 = req.params.quotesId1

            const quotesId = quotesId1.toUpperCase()

            const links = require("./countries.json");
            const sourceAddress = links.filter(country => country.Alpha3Code == quotesId)[0].casesAddress
        //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
            const alpha3Code = links.filter(country => country.Alpha3Code == quotesId)[0].Alpha3Code
            const numericCode = links.filter(country => country.Alpha3Code == quotesId)[0].NumericCode
            const country = links.filter(country => country.Alpha3Code == quotesId)[0].name
            axios.get(sourceAddress)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    const specificArticles = []
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


                    const cases = dailyStats[0]
                    const deaths = dailyStats[1]
                    const doses = dailyStats[2]
                    const percentofpeopleoverpopvaccinated = dailyStats[3]
                    const newCasesLastWeek = newCases[0]
                    //    const newDosesLastWeek1 = newCases[1]

                    specificArticles.push({
                        country,
                        alphaCode: alpha3Code,
                        numericCode: numericCode,
                        cases,
                        newCasesLastWeek,
                        // newDosesLastWeek: newDosesLastWeek1,
                        doses,
                        deaths,
                        percentofpeopleoverpopvaccinated
                    })

                    res.json(specificArticles)
                    //  console.log(specificArticles)
                }).catch((err) => console.log(err))
        */
    })


    app.get('/countiesreport/cases/alphacode/:quotesId1', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/countrycases.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].alphaCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)


        /*
            const quotesId1 = req.params.quotesId1

            const quotesId = quotesId1.toUpperCase()

            const namesTitle = []

            const links = require("./countries.json");
            const sourceAddress = links.filter(country => country.Alpha3Code == quotesId)[0].casesAddress
        //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
            const alpha3Code = links.filter(country => country.Alpha3Code == quotesId)[0].Alpha3Code
            const numericCode = links.filter(country => country.Alpha3Code == quotesId)[0].NumericCode
            const country = links.filter(country => country.Alpha3Code == quotesId)[0].name
            axios.get(sourceAddress)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    const specificArticles = []
                    const numbers = []
                    //  const namesTitle = []
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


                    //      const symbol = images[0]
                    const countryname = namesTitle[0]
                    //  const number = numbers[0]

                    for (let i = images.length; i < namesTitle.length; i++) {
                        images.push("No Data")
                    }

                    //    const newDosesLastWeek1 = newCases[1]
                    var k1 = 0;
                    for (let i = 0; i < namesTitle.length; i++) {




                        specificArticles.push({
                            name: namesTitle[i],
                            symbol: images[i],
                            totalCases: numbers[0+k1],
                            newCasesPerDay: numbers[1+k1],
                            casesPerMillion: numbers[3+k1],
                            deaths: numbers[4+k1]
                        })
                        k1 += 5;
                    }
                    console.log(images.length)
                    res.json(specificArticles)
                    //  console.log(specificArticles)
                }).catch((err) => console.log(err))
        */
    })


    app.get('/countiesreport/vaccines/alphacode/:quotesId1', (req, res) => {

        /*
        const namesTitle = []
        const quotesId1 = req.params.quotesId1

        const quotesId = quotesId1.toUpperCase()
        const links = require("./countries.json");
        const sourceAddress = links.filter(country => country.Alpha3Code == quotesId)[0].casesAddress
        const source2Address = links.filter(country => country.Alpha3Code == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.Alpha3Code == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.Alpha3Code == quotesId)[0].NumericCode
        const country = links.filter(country => country.Alpha3Code == quotesId)[0].name
        axios.get(source2Address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const numbers = []
                //  const namesTitle = []
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


                //      const symbol = images[0]
                const countryname = namesTitle[0]
                //  const number = numbers[0]

                for (let i = images.length; i < namesTitle.length; i++) {
                    images.push("No Data")
                }

                //    const newDosesLastWeek1 = newCases[1]
                var k1 = 0;
                for (let i = 0; i < namesTitle.length; i++) {
                    specificArticles.push({
                        name: namesTitle[i],
                        symbol: images[i],
                        totalCases: numbers[0+k1],
                        newCasesPerDay: numbers[1+k1],
                        casesPerMillion: numbers[3+k1],
                        deaths: numbers[4+k1]
                    })
                    k1 += 5;
                }
                console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
        */

    })


    app.get('/topcovidnews/alphacode/:quotesId1', (req, res) => {
        //  const namesTitle = []

        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/news.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].alphaCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)


        /*
        const quotesId1 = req.params.quotesId1

        const quotesId = quotesId1.toUpperCase()
        const links = require("./countries.json");
        const sourceAddress = links.filter(country => country.Alpha3Code == quotesId)[0].casesAddress
        //   const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.Alpha3Code == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.Alpha3Code == quotesId)[0].NumericCode
        const country = links.filter(country => country.Alpha3Code == quotesId)[0].name
        axios.get(sourceAddress)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const articleTitle = []
                const articleUrl = []
                const articleSource = []
                const titleImage = []
                const hoursAgo = []
                const timeStamp = []

                $("a[class='DY5T1d RZIKme']", html).each(function () {
                    //  const articleTitle = $(this).text()
                    //   const url2 = $(this).attr('href')
                    //   const url = base1+url2

                    articleTitle.push($(this).text())
                    articleUrl.push("https://news.google.com"+$(this).attr('href'))
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


                for (let i = 0; i < articleTitle.length; i++) {
                    specificArticles.push({
                        articleTitle: articleTitle[i],
                        articleUrl: articleUrl[i],
                        titleImage: titleImage[i],
                        source: articleSource[i],
                        hoursAgo: hoursAgo[i],
                        timeStamp: timeStamp[i]
                    })

                }
                //  console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
    */
    })


    app.get('/totalreport/numericcode/:quotesId', (req, res) => {

        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/totalreport.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].numericCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)

        /*
            const quotesId = req.params.quotesId
            const links = require("./countries.json");
            const sourceAddress = links.filter(country => country.NumericCode == quotesId)[0].casesAddress
        //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
            const alpha3Code = links.filter(country => country.NumericCode == quotesId)[0].Alpha3Code
            const numericCode = links.filter(country => country.NumericCode == quotesId)[0].NumericCode
            const country = links.filter(country => country.NumericCode == quotesId)[0].name
            axios.get(sourceAddress)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    const specificArticles = []
                    const totalStats = []

                    $("div[class='UvMayb']", html).each(function () {
                        //   const title = $(this).text()
                        totalStats.push($(this).text())
                    })

                    const cases = totalStats[0]
                    const deaths = totalStats[1]
                    const doses = totalStats[2]
                    var peopleFullyVaccinated = totalStats[4]

                    console.log(totalStats.length)

                    if (totalStats.length = 4) {
                        peopleFullyVaccinated = totalStats[3]
                    }


        //console.log(peopleFullyVaccinated.length)
                    specificArticles.push({
                        country,
                        alphaCode: alpha3Code,
                        numericCode: numericCode,
                        cases,
                        deaths,
                        doses,
                        peopleFullyVaccinated
                    //    totalStats
                    })

                    res.json(specificArticles)
                    //  console.log(specificArticles)
                }).catch((err) => console.log(err))
        */
    })


    app.get('/dailyreport/numericcode/:quotesId', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/dailyreport.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].numericCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)


        /*
            const quotesId = req.params.quotesId
            const links = require("./countries.json");
            const sourceAddress = links.filter(country => country.NumericCode == quotesId)[0].casesAddress
        //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
            const alpha3Code = links.filter(country => country.NumericCode == quotesId)[0].Alpha3Code
            const numericCode = links.filter(country => country.NumericCode == quotesId)[0].NumericCode
            const country = links.filter(country => country.NumericCode == quotesId)[0].name
            axios.get(sourceAddress)
                .then(response => {
                    const html = response.data
                    const $ = cheerio.load(html)
                    const specificArticles = []
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


                    const cases = dailyStats[0]
                    const deaths = dailyStats[1]
                    const doses = dailyStats[2]
                    const percentofpeopleoverpopvaccinated = dailyStats[3]
                    const newCasesLastWeek = newCases[0]
                    //    const newDosesLastWeek1 = newCases[1]

                    specificArticles.push({
                        country,
                        alphaCode: alpha3Code,
                        numericCode: numericCode,
                        cases,
                        newCasesLastWeek,
                        // newDosesLastWeek: newDosesLastWeek1,
                        doses,
                        deaths,
                        percentofpeopleoverpopvaccinated
                    })

                    res.json(specificArticles)
                    //  console.log(specificArticles)
                }).catch((err) => console.log(err))
        */
    })


    app.get('/countiesreport/cases/numericcode/:quotesId', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/countrycases.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].numericCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)


        /*
        const namesTitle = []
        const quotesId = req.params.quotesId
        const links = require("./countries.json");
        const sourceAddress = links.filter(country => country.NumericCode == quotesId)[0].casesAddress
    //    const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.NumericCode == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.NumericCode == quotesId)[0].NumericCode
        const country = links.filter(country => country.NumericCode == quotesId)[0].name
        axios.get(sourceAddress)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const numbers = []
                //  const namesTitle = []
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


                //      const symbol = images[0]
                const countryname = namesTitle[0]
                //  const number = numbers[0]

                for (let i = images.length; i < namesTitle.length; i++) {
                    images.push("No Data")
                }

                //    const newDosesLastWeek1 = newCases[1]
                var k1 = 0;
                for (let i = 0; i < namesTitle.length; i++) {




                    specificArticles.push({
                        name: namesTitle[i],
                        symbol: images[i],
                        totalCases: numbers[0+k1],
                        newCasesPerDay: numbers[1+k1],
                        casesPerMillion: numbers[3+k1],
                        deaths: numbers[4+k1]
                    })
                    k1 += 5;
                }
                console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
    */
    })


    app.get('/countiesreport/vaccines/numericcode/:quotesId', (req, res) => {


        /*
        const namesTitle = []
        const quotesId = req.params.quotesId
        const links = require("./countries.json");
        const sourceAddress = links.filter(country => country.NumericCode == quotesId)[0].casesAddress
        const source2Address = links.filter(country => country.NumericCode == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.NumericCode == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.NumericCode == quotesId)[0].NumericCode
        const country = links.filter(country => country.NumericCode == quotesId)[0].name
        axios.get(source2Address)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const numbers = []
                //  const namesTitle = []
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


                //      const symbol = images[0]
                const countryname = namesTitle[0]
                //  const number = numbers[0]

                for (let i = images.length; i < namesTitle.length; i++) {
                    images.push("No Data")
                }

                //    const newDosesLastWeek1 = newCases[1]
                var k1 = 0;
                for (let i = 0; i < namesTitle.length; i++) {
                    specificArticles.push({
                        name: namesTitle[i],
                        symbol: images[i],
                        totalCases: numbers[0+k1],
                        newCasesPerDay: numbers[1+k1],
                        casesPerMillion: numbers[3+k1],
                        deaths: numbers[4+k1]
                    })
                    k1 += 5;
                }
                console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))
    */
    })


    app.get('/topcovidnews/numericcode/:quotesId', (req, res) => {


        const quotesId1 = req.params.quotesId1

        const quotesId = capitalizeFirstLetter(quotesId1);
        const links = require("./filestorage/news.json");


        let result = []

        for (let i = 0; i < links.length; i++) {
            if (links[i].numericCode == quotesId) {
                result.push(links[i])

            }
        }
        if (result.length == 0) {

            result = "Input is not on our Country List. Check for spelling or our countries list: https://drive.google.com/file/d/17b0ACcJlxm356bbqWCIel6bTX4jvncz1/view?usp=sharing"
        }
        res.json(result)


        /*
        //  const namesTitle = []
        const quotesId = req.params.quotesId
        const links = require("./countries.json");
        const sourceAddress = links.filter(country => country.NumericCode == quotesId)[0].casesAddress
        //   const source2Address = links.filter(country => country.name == quotesId)[0].vaccineAddress
        const alpha3Code = links.filter(country => country.NumericCode == quotesId)[0].Alpha3Code
        const numericCode = links.filter(country => country.NumericCode == quotesId)[0].NumericCode
        const country = links.filter(country => country.NumericCode == quotesId)[0].name
        axios.get(sourceAddress)
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []
                const articleTitle = []
                const articleUrl = []
                const articleSource = []
                const titleImage = []
                const hoursAgo = []
                const timeStamp = []

                $("a[class='DY5T1d RZIKme']", html).each(function () {
                    //  const articleTitle = $(this).text()
                    //   const url2 = $(this).attr('href')
                    //   const url = base1+url2

                    articleTitle.push($(this).text())
                    articleUrl.push("https://news.google.com"+$(this).attr('href'))
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


                for (let i = 0; i < articleTitle.length; i++) {
                    specificArticles.push({
                        articleTitle: articleTitle[i],
                        articleUrl: articleUrl[i],
                        titleImage: titleImage[i],
                        source: articleSource[i],
                        hoursAgo: hoursAgo[i],
                        timeStamp: timeStamp[i]
                    })

                }
                //  console.log(images.length)
                res.json(specificArticles)
                //  console.log(specificArticles)
            }).catch((err) => console.log(err))


         */
    })


    app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
