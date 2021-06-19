const websiteName = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url') 
const bookForm = document.querySelector('.bookmark-from');
const wrapperForm =document.querySelector('.wrapper');

 var bookmarks = []
bookForm.addEventListener('submit',(e)=> {
    e.preventDefault();

    const nameValue =websiteName.value;
    let urlValue = websiteUrl.value;
    
     
    if(!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`
    }
    const bookmark = {
        name:nameValue,
        url:urlValue,
    }
   bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchbook()
   websiteName.focus();
  buildBooks()


})

function buildBooks(){

    wrapperForm.textContent = " "
    bookmarks.forEach((bookmark) =>{
        const {name, url} = bookmark;
       var item = document.createElement('div');
       item.classList.add('item');
     // icon  
     const closeIcon = document.createElement('i');
     closeIcon.classList.add('las', 'la-times');
     closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)
    
     const linkInfo =document.createElement('div');
     linkInfo.classList.add('name')

    // favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
    favicon.setAttribute('alt', 'Favicon')
    // link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    // wrapperForm.appendChild(item)
    wrapperForm.append(item)


    })
}

function fetchbook(){
  if(localStorage.getItem('bookmarks')){
      bookmarks =   JSON.parse(localStorage.getItem('bookmarks'))
  }else{
      bookmarks = [
         {
            name:'google', 
            url:'https://google.com'
        }
      ];
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
  }
 buildBooks()
}

function deleteBookmark(url){
   bookmarks.forEach((bookmark, i) =>{
       if(bookmark.url === url){
          bookmarks.splice(i , 1)
       }
   })

   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   fetchbook()
}
// on load
fetchbook()

