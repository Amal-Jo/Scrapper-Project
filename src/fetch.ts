import fs from 'fs'
import cheerio from 'cheerio'

const categoriesFilePath = "./assets/categories.html"
const quoteFilePath = "./assets/quotes.html"

const fetchAndSave = async () => {

    // const serviceCategoryGroups = fetchServiceCategoryGroups()

    const serviceCategories = fetchServiceCategories()
    const midpoint = Math.floor(serviceCategories.length/2)
    const array1 = serviceCategories.slice(0,midpoint)
    const array2 = serviceCategories.slice(midpoint)
    console.log(array1,array2)

}

const fetchServiceCategoryGroups = () => {
    const content = fs.readFileSync(categoriesFilePath,"utf8")
    const $ = cheerio.load(content)

    const serviceCategoryGroups:string[] = []
    $('div.categories-index div.category-group').each((index,element) => {
        const serviceCategoryGroupName = normalizeText($(element).find('div.category-group__heading').text())
        console.log(`Category name: ${serviceCategoryGroupName}`)

        const serviceCategories :any= []
        $(element).find('ul.category-group__list span.category-group__category-name').each((i,el) => {
            const serviceCategoryName = normalizeText($(el).text())
            console.log(`\t - ${serviceCategoryName}`)
            serviceCategories.push(serviceCategoryName,serviceCategories)
        })
        serviceCategoryGroups.push(serviceCategoryGroupName,)

    })
    return serviceCategoryGroups
}

// Populates service category group and saves it in the Db
const fetchServiceCategories =  () => {

    const content = fs.readFileSync(quoteFilePath,"utf8")
    const $ = cheerio.load(content)

    const serviceCategories:string[] = []
    let serviceCategoryName:any,services:any
    $('div.task-picker-categorized-tasks').children().each((index,element) => {
        if(index % 2 === 0){
            serviceCategoryName = normalizeText($(element).text())
            console.log(`Sub-Category: ${serviceCategoryName}`)
        }
        else{
            services = []
            $(element).find('span.option__text').each((i,e) => {
                const serviceName = normalizeText($(e).text())
                console.log(`\t - ${serviceName}`)
                services.push(serviceName)
            })
            serviceCategories.push(serviceCategoryName,services)
        }
    })

    return serviceCategories
}

const normalizeText = (text:any) => {
    return text.replace(/&/g,'And').replace(/(\s)+/g,"-").replace(/,-/g,",")
        .replace(/(-)+$/g,"").replace(/(-){2,}/g,"-")

}




export default fetchAndSave
