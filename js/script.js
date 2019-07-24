class UI {

    static showCurrentItems() {
        const elementsToView = storage.getAllStorageInfo();
        if (elementsToView.length > 0) {
        elementsToView.forEach(function (item) {
            UI.addItemToTheList(item);
        });
        }
    }

    static addItemToTheList(albumItem) {
        const listOfItems = document.querySelector('#album-list');
        const row = document.createElement('tr');

        const artistValue = albumItem.artistValue;
        const albumValue = albumItem.albumValue;
        const linkValue = albumItem.link;
        row.innerHTML = `
            <td>${artistValue}</td>
            <td>${albumValue}</td>
            <td>${linkValue}</td>
        `;

        listOfItems.appendChild(row);
    }

    static clearInputs() {
        document.getElementById('artist').value = null;
        document.getElementById('album').value = null;
        document.getElementById('link').value = null;
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
}

let storage = new Storage();
UI.showCurrentItems();

let musicForm = document.getElementById('music-form');

musicForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let artistInput = document.getElementById('artist').value;
    let albumInput = document.getElementById('album').value;
    let linkInput = document.getElementById('link').value;
    const albumItem = new AlbumItem(artistInput, albumInput, linkInput);

    storage.addItem(albumItem);
    UI.addItemToTheList(albumItem);
    UI.clearInputs();

});



