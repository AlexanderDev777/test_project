window.onload = function () {
  let btns = document.getElementsByClassName('element-price-button');

  addEvent(btns, 'click', basketAction);
  addEvent(document.getElementById('search'), 'input', search);
};

function basketAction(e) {
    e.preventDefault();

    let obj = e.target || e.srcElement;
    let id = obj.getAttribute('data-id');
    let string = 'id=' + id;
    console.log(id);

    var req = getXmlHttpRequest();
    // Установим обработчик
    req.onreadystatechange = function() {
        // только при состоянии "complete"
        if (req.readyState === 4) {
            try {
                let response = JSON.parse(req.responseText);
                if(response.hasOwnProperty('put')) {
                    obj.setAttribute('inbasket', '');
                }
                if(response.hasOwnProperty('remove')) {
                    obj.removeAttribute('inbasket');
                }

            } catch (e) {
                // todo
            }
        }
    };
    req.open("POST", "/ajax.php", true);
    // Установка заголовков
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(string);
}

function search(e) {
    let obj = e.target || e.srcElement;
    let value = obj.value;
    let string = 'search=' + value;

   if(value.length > 2) {
       var req = getXmlHttpRequest();
       // Установим обработчик
       req.onreadystatechange = function() {
           // только при состоянии "complete"
           if (req.readyState === 4) {
               try {
                   let response = JSON.parse(req.responseText);
                    console.log(response);

                    if(response.length > 0) {
                        let searchData = document.getElementById('searchData');
                        while(searchData.hasChildNodes()) {
                            searchData.removeChild(searchData.lastChild);
                        }
                        for(let i =0; i < response.length; i++) {
                            createItem(response[i]);
                        }
                    }
               } catch (e) {
                   // todo
               }
           }
       };
       req.open("POST", "/search.php", true);
       // Установка заголовков
       req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       req.send(string);
   }
}

function createItem(item) {
    let wrap = document.createElement('div');
    wrap.className = 'element';

    let desc = document.createElement('div');
    desc.className = 'element-desc';

    let name = document.createElement('div');
    name.className = 'element-desc-name';
    name.appendChild(document.createTextNode(item['name']));
    let color = document.createElement('div');
    color.className = 'element-desc-color';
    color.appendChild(document.createTextNode(item['color']));

    desc.appendChild(name);
    desc.appendChild(color);

    wrap.appendChild(desc);


    let price = document.createElement('div');
    price.className = 'element-price';


    let number = document.createElement('div');
    number.className = 'element-price-number';
    number.appendChild(document.createTextNode(item['price']));


    let button = document.createElement('div');
    button.className = 'element-price-button';
    if (item.hasOwnProperty('basket')) {
        button.setAttribute('inbasket', '');
    }
    button.setAttribute('data-id', item['id']);
    addEvent(button, 'click', basketAction);

    price.appendChild(number);
    price.appendChild(button);

    wrap.appendChild(price);


    let searchData = document.getElementById('searchData');
    searchData.appendChild(wrap);
}

//Кроссбраузерный обработчик событий
function addEvent(elem, type, handler) {
    //console.log('elem: "'  + elem + '"; type "' + type + '"; handler "' + handler + '"; typeof ' + typeof elem);
    //console.log(elem.tagName);
    if(elem) {
        if (typeof elem === 'object') {
            if(type === 'change' && elem.tagName === 'SELECT') {
                if (elem.addEventListener) {
                    elem.addEventListener(type, handler, false);
                } else {
                    elem.attachEvent('on' + type, handler);
                }
            }  else if(type === 'submit' && elem.tagName === 'FORM') {
                if (elem.addEventListener) {
                    elem.addEventListener(type, handler, false);
                } else {
                    elem.attachEvent('on' + type, handler);
                }
            } else if (!elem.length) {
                if (elem.addEventListener) {
                    elem.addEventListener(type, handler, false);
                } else {
                    if(elem.attachEvent)
                        elem.attachEvent('on' + type, handler);
                }
            } else {
                for (var i = 0; i < elem.length; i++) {
                    if (elem[i].addEventListener) {
                        elem[i].addEventListener(type, handler, false);
                    } else {
                        elem[i].attachEvent('on' + type, handler);
                    }
                }
            }
        } else {
            if (elem.addEventListener) {
                elem.addEventListener(type, handler, false);
            } else {
                elem.attachEvent('on' + type, handler);
            }
        }
    }
    return false;
}


/*
** Функция возвращат объект XMLHttpRequest
*/
function getXmlHttpRequest() {
    if (window.XMLHttpRequest) {
        try {
            return new XMLHttpRequest();
        }
        catch (e){}
    } else if (window.ActiveXObject) {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e){}
        try {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (e){}
    }
    return null;
}