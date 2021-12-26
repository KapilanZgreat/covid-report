const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const links = require("./countries.json");




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

})


app.get('/dailyreport/country/:quotesId', (req, res) => {


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

})




app.get('/countiesreport/cases/country/:quotesId', (req, res) => {
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

})






app.get('/countiesreport/doses/country/:quotesId', (req, res) => {
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

})



app.get('/topcovidnews/country/:quotesId', (req, res) => {
    //  const namesTitle = []
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

})











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



app.get('/totalreport/alphacode/:quotesId', (req, res) => {

    const quotesId = req.params.quotesId
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

})


app.get('/dailyreport/alphacode/:quotesId', (req, res) => {

    const quotesId = req.params.quotesId
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

})




app.get('/countiesreport/cases/alphacode/:quotesId', (req, res) => {
    const namesTitle = []
    const quotesId = req.params.quotesId
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

})






app.get('/countiesreport/doses/alphacode/:quotesId', (req, res) => {
    const namesTitle = []
    const quotesId = req.params.quotesId
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

})



app.get('/topcovidnews/alphacode/:quotesId', (req, res) => {
    //  const namesTitle = []
    const quotesId = req.params.quotesId
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

})




app.get('/totalreport/numericcode/:quotesId', (req, res) => {

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

})


app.get('/dailyreport/numericcode/:quotesId', (req, res) => {

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

})




app.get('/countiesreport/cases/numericcode/:quotesId', (req, res) => {
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

})






app.get('/countiesreport/doses/numericcode/:quotesId', (req, res) => {
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

})



app.get('/topcovidnews/numericcode/:quotesId', (req, res) => {
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

})













app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))