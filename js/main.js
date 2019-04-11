var request = new XMLHttpRequest();
var requestURL = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture';

request.open('GET', requestURL, false);
request.send();

var json = request.response;
var jsonObj = JSON.parse(json);

function userCardAssembler(i) {
    var userImg = jsonObj['results'][i]['picture']['medium'];
    var userTitle = jsonObj['results'][i]['name']['title'];
    var userFirst = jsonObj['results'][i]['name']['first'];
    var userLast = jsonObj['results'][i]['name']['last'];
    var userName = '<p>' + userTitle + '. ' + userFirst + ' ' + userLast + '</p>';
    var card = '<img src=' + userImg + '></img>' + userName + '<button onclick="showUserInfo(' + i +')">Show more Info</button>';
    
    return card;
}

function userInfoCardAssembler(i) {
    var userImg = jsonObj['results'][i]['picture']['large'];
    var userTitle = jsonObj['results'][i]['name']['title'];
    var userFirst = jsonObj['results'][i]['name']['first'];
    var userLast = jsonObj['results'][i]['name']['last'];
    var userLocationStreet = jsonObj['results'][i]['location']['street'];
    var userLocationCity = jsonObj['results'][i]['location']['city'];
    var userLocationState = jsonObj['results'][i]['location']['state'];
    var userEmail = jsonObj['results'][i]['email'];
    var userTel = jsonObj['results'][i]['phone'];
    var userName = '<p>' + userTitle + '. ' + userFirst + ' ' + userLast + '</p>';
    
    card = '<img src=' + userImg + '></img>' + userName;
    card += '<p>Street: ' + userLocationStreet +'</p><p>City: ' + userLocationCity + '</p><p>State: ' + userLocationState + '</p>';
    card +='<p>Email: ' + userEmail + '</p>' + '<p>Phone: ' + userTel + '</p>';
    return card;
}

function addCard(text) {
    var childElem = document.createElement('article');
    var parentElem = document.getElementById('userList');
    childElem.innerHTML = text;
    childElem.className = 'user_profile';
    parentElem.appendChild(childElem);
}

function showUsers() {
    for (let i = 0; i < jsonObj['results'].length; i++) {
        addCard(userCardAssembler(i));
    }
}

function showUserInfo(i) {
    var dialogWindow = document.createElement('dialog');
    var closeButton = document.createElement('button');
    var userInfoCard = userInfoCardAssembler(i);
    dialogWindow.innerHTML = userInfoCard;
    dialogWindow.id = 'dialog';
    document.body.appendChild(dialogWindow);
    closeButton.setAttribute('onclick', 'dialogClose()');
    closeButton.innerHTML = 'Close';
    dialogWindow.appendChild(closeButton);
    dialogWindow.showModal();
}

function removeElem(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function dialogClose(){
    var dialogWindow = document.getElementById('dialog');
    removeElem('dialog');
    dialogWindow.close();
}