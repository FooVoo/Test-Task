var request = new XMLHttpRequest();
var requestURL = 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture';

request.open('GET', requestURL, false);
request.send();

var json = request.response;
var jsonObj = JSON.parse(json);
    jsonObj = jsonObj.results;

function userCardAssembler(i) {
    var userImg = jsonObj[i].picture.medium;
    var userTitle = jsonObj[i].name.title;
    var userFirst = jsonObj[i].name.first;
    var userLast = jsonObj[i].name.last;
    var userFirstLetter = userFirst[0];
    var userName = '<p>' + userTitle + '. ' + userFirst + ' ' + userLast + '</p>';
    var card = '<img src=' + userImg + '></img>' + userName + '<button onclick="showUserInfo(' + i +')">Show more Info</button>';

    return {'card' : card, 'userFirstLetter' : userFirstLetter};
}

function userInfoCardAssembler(i) {
    var userImg = jsonObj[i].picture.large;
    var userTitle = jsonObj[i].name.title;
    var userFirst = jsonObj[i].name.first;
    var userLast = jsonObj[i].name.last;
    var userLocationStreet = jsonObj[i].location.street;
    var userLocationCity = jsonObj[i].location.city;
    var userLocationState = jsonObj[i].location.state;
    var userEmail = jsonObj[i].email;
    var userTel = jsonObj[i].phone;
    var userName = '<p>' + userTitle + '. ' + userFirst + ' ' + userLast + '</p>';
    
    card = '<img src=' + userImg + ' alt="User Photo"></img>' + userName;
    card += '<p>Street: ' + userLocationStreet +'</p><p>City: ' + userLocationCity + '</p><p>State: ' + userLocationState + '</p>';
    card +='<p>Email: ' + userEmail + '</p>' + '<p>Phone: ' + userTel + '</p>';
    
    return card;
}

function addCard(text) {
    var childElem = document.createElement('article');
    var parentElem = document.getElementById('userList');
    childElem.innerHTML = text.card;
    childElem.className = 'user_profile';
    childElem.id = text.userFirstLetter;
    parentElem.appendChild(childElem);
}

function showUsers() {
    for (i = 0; i < jsonObj.length; i++) {
        addCard(userCardAssembler(i));
        //elemArray = document.getElementsByClassName('user_profile');
        //elemArray[i].id = i;
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

function deleteCards() {
    var parentElem = document.getElementById('userList');
    parentElem.innerHTML = '';
}

function sort() {
    var sortStart = document.getElementById('sort').value;
    deleteCards();
    switch (sortStart) {
        case 'A':
            jsonObj.sort(function (obj1, obj2) {
                if (obj1.name.first < obj2.name.first) {
                    return -1;
                }
                if (obj1.name.first > obj2.name.first) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'Z':
            jsonObj.sort(function (obj1, obj2) {
                if (obj1.name.first > obj2.name.first) {
                    return -1;
                }
                if (obj1.name.first < obj2.name.first) {
                    return 1;
                }
                return 0;
            });
            break;

        default:


            break;
    }
    
    showUsers();
}