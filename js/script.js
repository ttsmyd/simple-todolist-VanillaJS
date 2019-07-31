class UI {

    static showCurrentItems() {
        const elementsToView = storage.getAllStorageInfo();
        if (elementsToView.length > 0) {
            elementsToView.forEach(function (item, numberOfElement) {
                UI.addItemToTheList(item, numberOfElement);
            });
        }
    }

    static addItemToTheList(albumItem, numberOfElement) {
        const listOfItems = document.querySelector('#album-list');
        const row = document.createElement('tr');

        const artistValue = albumItem.artistValue;
        const albumValue = albumItem.albumValue;
        const linkValue = albumItem.link;
        console.log(numberOfElement);
        if (linkValue === '') {
            row.innerHTML = `
            <td>${artistValue}</td>
            <td>${albumValue}</td>
            <td></td>
            <button class="copy-button btn btn-outline-secondary">Copy Info</button>
            <button class="delete-button btn btn-outline-secondary">Delete</button>
        `;
        } else {
            row.innerHTML = `
            <td>${artistValue}</td>
            <td>${albumValue}</td>
            <td><a href="${linkValue}">Link</a></td>
            <button class="copy-button btn btn-outline-secondary">Copy Info</button>
            <button class="delete-button btn btn-outline-secondary">Delete</button>
        `;
        }
        row.classList.add('album-item');
        row.id = `album-item-${numberOfElement}`;

        const elementBefore =  document.getElementById(`album-item-${numberOfElement - 1}`);

        listOfItems.insertBefore(row, elementBefore);
    }

    static clearInputs() {
        document.getElementById('artist').value = null;
        document.getElementById('album').value = null;
        document.getElementById('link').value = null;
    }

    static deleteItemView(button, idOfItem) {
        console.log('parent elemen');
        console.log(button.parentElement.id);
        button.parentElement.remove();
        let infoStorage = storage.getAllStorageInfo();
        console.log('idOfItem');
        console.log(idOfItem);
        let allItems = document.querySelectorAll('.album-item');
        console.log('allItems');
        console.log(allItems);
        console.log('cycle');

        //for invers list in UI
        for (let i = 0; i < allItems.length - idOfItem; i++) {
            allItems[i].id = `album-item-${allItems.length - i - 1}`;
        }


        // let allButtons = document.querySelectorAll('.delete-button');
        //
        // for (let i = idOfItem; i < allButtons.length; i++) {
        //     allButtons[i].id = `delete-button-${i}`;
        // }
        console.log(document.querySelectorAll('.delete-button'));
        console.log(document.querySelectorAll('.delete-button').length);


        // for (let i = idOfItem + 1; i < infoStorage.length; i++) {
        //     console.log(`i = ${i}`);
        //     console.log(document.querySelector(`[id="delete-button-${i}"]`));
        //     console.log(document.querySelector(`[id="delete-button-${i}"]`).id);
        //     document.querySelector(`[id="delete-button-${i}"]`).id = i - 1;
        // }
        console.log('kek');
    }
}

class AlbumItem {
    constructor(artistValue, albumValue, link) {
        this._artistValue = artistValue;
        this._albumValue = albumValue;
        this._link = link;
    };

    get link() {
        return this._link;
    };

    set link(value) {
        this._link = value;
    };

    get artistValue() {
        return this._artistValue;
    };

    set artistValue(value) {
        this._artistValue = value;
    };

    get albumValue() {
        return this._albumValue;
    };

    set albumValue(value) {
        this._albumValue = value;
    };

    get allAlbumInfo() {
        return {
            artistValue: this.artistValue,
            albumValue: this._albumValue,
            link: this._link
        };
    };
}

class Storage {

    constructor() {
        const lStorageInfo = localStorage.getItem('albums');
        if (typeof lStorageInfo !== 'undefined' && lStorageInfo !== null) {
            this.infoStorage = JSON.parse(lStorageInfo);
        } else {
            this.infoStorage = [];
        }
    };

    getAllStorageInfo() {
        return this.infoStorage;
    };

    addItem(albumItem) {
        this.infoStorage.push(albumItem.allAlbumInfo);
        localStorage.setItem('albums', JSON.stringify(this.infoStorage));
    };

    deleteItem(idOfItem) {
        this.infoStorage.splice(idOfItem, 1);
        console.log(this.infoStorage);
        localStorage.setItem('albums', JSON.stringify(this.infoStorage));
    }

    copyItemToClipboard(idOfItem) {
        console.log(this.infoStorage[idOfItem]);
        const chosenElement = this.infoStorage[idOfItem];
        let finalString;
        if (chosenElement.albumValue === '') {
            finalString = chosenElement.artistValue;
        } else {
            if (chosenElement.artistValue === '') {
                finalString = chosenElement.albumValue;
            } else {
                finalString = `${chosenElement.artistValue} — ${chosenElement.albumValue}`;
            }
        }
        inserTextIntoClipboard(finalString);

    }

    getItemById(idOfItem) {
        return this.infoStorage[idOfItem];
    }
}

let storage = new Storage();

document.addEventListener('DOMContentLoaded', function () {
    UI.showCurrentItems();
});

let musicForm = document.getElementById('music-form');
let albumList = document.getElementById('album-list');

musicForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let artistInput = document.getElementById('artist').value;
    let albumInput = document.getElementById('album').value;
    let linkInput = document.getElementById('link').value;
    let isValidLink = validURL(linkInput);
    if (artistInput === '' && albumInput === '' && linkInput === '') {
        alert('Please, enter correct information about album');
        return;
    }

    if (!isValidLink && linkInput !== '') {
        alert('Please, enter correct link');
        return;
    }

    const albumItem = new AlbumItem(artistInput, albumInput, linkInput);

    UI.addItemToTheList(albumItem, storage.getAllStorageInfo().length);
    storage.addItem(albumItem);
    UI.clearInputs();
});

musicForm.addEventListener('paste', function (e) {
    setTimeout(function () {
        let artistInput = document.getElementById('artist').value;
        if (artistInput.indexOf(' — ') > 0) {
            console.log('yey');
            divideString(artistInput.indexOf(' — '));
        } else {
            if (artistInput.indexOf(' – ') > 0) {
                divideString(artistInput.indexOf(' – '));
            } else {
                if (artistInput.indexOf(' - ') > 0) {
                    divideString(artistInput.indexOf(' - '));
                }
            }
        }

        function divideString(indexToDivide) {
            console.log('index');
            console.log(indexToDivide);
            const newArtistInput = artistInput.slice(0, indexToDivide);
            const newAlbumInput = artistInput.slice(indexToDivide + 3);
            document.getElementById('artist').value = newArtistInput;
            document.getElementById('album').value = newAlbumInput;
        }
        document.getElementById('link').focus();
    }, 5);

})

albumList.addEventListener('click', function (e) {
    filterAlbumListButton(e.target);
});


function filterAlbumListButton(button) {
    const typeOfButton = button.classList;
    const idOfItem = +button.parentElement.id.replace(/album-item-/, '');
    if (typeOfButton.contains('delete-button')) {
        console.log('id Item before deleting ' + idOfItem);
        UI.deleteItemView(button, idOfItem);
        storage.deleteItem(idOfItem);
        return;
    }
    if (typeOfButton.contains('copy-button')) {
        storage.copyItemToClipboard(idOfItem);
    }


}

function validURL(str) {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}

function inserTextIntoClipboard(textToBeCopied) {
    let textarea = null;
    textarea = this.document.createElement("textarea");
    textarea.style.height = "0px";
    textarea.style.left = "-100px";
    textarea.style.opacity = "0";
    textarea.style.position = "fixed";
    textarea.style.top = "-100px";
    textarea.style.width = "0px";
    document.body.appendChild(textarea);
    // Set and select the value (creating an active Selection range).
    textarea.value = textToBeCopied;
    textarea.select();
    // Ask the browser to copy the current selection to the clipboard.
    let successful = document.execCommand("copy");
    if (textarea && textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
    }
}