import fetchAndSave from './fetch'

fetchAndSave().then(() => {
    console.log("Done Scrapping and saving")
    process.exit(0)
}).catch((err:any) => {
    console.error(err)
})



