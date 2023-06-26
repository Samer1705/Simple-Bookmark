var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var bookmarkContainer;
if(localStorage.getItem('Bookmarks') != null){
    bookmarkContainer = JSON.parse(localStorage.getItem('Bookmarks'));
    displayData(bookmarkContainer);
}
else{
    bookmarkContainer = [];
}
document.querySelector('.btn-success').addEventListener('click', function () {
    document.getElementById('NameError').classList.add('d-none');
    document.getElementById('UrlError').classList.add('d-none');
    if(siteName.value == '' && siteURL.value == ''){
        document.getElementById('NameError').classList.remove('d-none');
        document.getElementById('UrlError').classList.remove('d-none');
    }
    else if(siteName.value == '' && siteURL.value != ''){
        document.getElementById('NameError').classList.remove('d-none');
    }
    else if(siteName.value != '' && siteURL.value == ''){
        document.getElementById('UrlError').classList.remove('d-none');
    }
    else{
        var bookmark = {
            name: siteName.value,
            url: siteURL.value
        };
        bookmarkContainer.push(bookmark);
        localStorage.setItem('Bookmarks', JSON.stringify(bookmarkContainer));
        displayData(bookmarkContainer);    
    }
    clearData();
})
function clearData() {
    siteName.value = '';
    siteURL.value = '';
}
function displayData(list) {
    var temp = ` `;
    for (let i = 0; i < list.length; i++) {
        temp += `
        <div class="item d-flex justify-content-between my-3">
        <p class="my-4 mx-5 fs-4">${list[i].name}</p>
        <div class="btns my-4 mx-5">
            <button class="btn btn-primary fs-5" onclick="window.open('https://${list[i].url}')">Visit</button>
            <button class="btn btn-danger fs-5" onclick='deleteBookmark(${i})'>Delete</button>
        </div>
    </div>`;
    }
    document.querySelector('.saved-bookmarks').innerHTML = temp;
}
function deleteBookmark(i) {
    bookmarkContainer.splice(i, 1);
    localStorage.setItem('Bookmarks', JSON.stringify(bookmarkContainer));
    displayData(bookmarkContainer);
}