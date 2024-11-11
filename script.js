let products=
[
    {title:'cpu',stock:12},
    {title:'ram',stock:23},
    {title:'hard',stock:4},
    {title:'vga',stock:8},
    {title:'monitor',stock:0},
    {title:'speaker',stock:0},
    {title:'keyboard',stock:0},
]
const filters={searchItem:'',mojodicheckBox:false}
const divProducts=document.querySelector('#products')
const textBoxSearch=document.querySelector('#search')
const chekbox=document.querySelector('#chek')
// ......................................................
// localStorage.getItem('space')
let productjson=localStorage.getItem('space')
if(productjson !== null){
    products=JSON.parse(productjson)
}
let renderProducts=function(products,filters) {//...............................................................renerProducts........................................................
  let filtered=  products.filter(function(item){
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    });
    
    filtered=filtered.filter(function(item){
        if(filters.mojodicheckBox){
            return item.stock
        }else{
            return true
        }
    });
    divProducts.innerHTML=""
        filtered.forEach(function(item,index){
            let proelem=document.createElement('p')
             // proelem.textContent=item.title
            divProducts.appendChild(proelem)
            proelem.style.textDecoration=item.stock ? 'initial' : 'line-through'
            proelem.style.listStyleType='none'
            MyDate=new Date()
            // console.log(myDate);
            if(item.stock){
                proelem.innerHTML +=`<li>${index+1}- ${item.title}-<span class="badge badge-success text-white">${item.stock}: موجودی</span><span>${MyDate.getFullYear()}/${MyDate.getMonth()+1}/${MyDate.getDate()}</span></li>`
            }else{
                proelem.innerHTML +=`<li>${index+1}- ${item.title}<span class="badge badge-danger"> موجودی صفر</span><span>${MyDate.getFullYear()}/${MyDate.getMonth()+1}/${MyDate.getDate()}</span></li>`
                
            }
            proelem.addEventListener('click',function(e){
                // console.log(index);
                products.splice(index,1)
                localStorage.setItem('space',JSON.stringify(products))
                renderProducts(products,filters)
            })
        });
    }//..................................................................................................end function renderproducts......................................

renderProducts(products,filters)
textBoxSearch.addEventListener('input',function(e) {
    filters.searchItem=e.target.value
    renderProducts(products,filters)
});
//.............................................
chekbox.addEventListener('change',function(e) {
    divProducts.classList.add('show')
    filters.mojodicheckBox=e.target.checked
    renderProducts(products,filters)
})
document.querySelector('#Add-Form').addEventListener('submit',function(e){
    e.preventDefault()
    products.push({title:e.target.elements.searchTitle.value,stock:parseInt(prompt('enter stock:'))})
    divProducts.classList.add('show')
    localStorage.setItem('space',JSON.stringify(products))
    e.target.elements.searchTitle.value=""
    renderProducts(products,filters)
})
