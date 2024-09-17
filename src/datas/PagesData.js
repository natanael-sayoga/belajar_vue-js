let pages = localStorage.getItem('pages')
let pagesArr = JSON.parse(pages)

export default{
    getAllPages(){
        return pagesArr
    },
    getSinglePage(index){
        return pagesArr[index]
    }
}