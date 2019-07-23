class UI {

    showItems() {
        const storage = storage.getAllInfo();
        storage.forEach(function (albumItem) {
            UI.addItemToTheList(albumItem);
        });
    }

    static addItemToTheList(albumItem) {
        const listOfItems = document.querySelector('#album-list');
        console.log(listOfItems);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${albumItem.artistValue}</td>
            <td>${albumItem.albumValue}</td>
            <td>${albumItem.link}</td>
        `;

        listOfItems.appendChild(row);
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
}

class Storage {

    constructor() {
        this.infoStorage = [];
    };

    getAllInfo() {
        return this.infoStorage;
    };

    addItem(albumItem) {
        this.infoStorage.push(albumItem);
        alert(this.infoStorage);
    };
}

let storage = new Storage();
let userInterface = new UI();
let musicForm = document.getElementById('music-form');

musicForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const artistInput = document.getElementById('artist').value;
    const albumInput = document.getElementById('album').value;
    const linkInput = document.getElementById('link').value;
    const albumItem = new AlbumItem(artistInput, albumInput, linkInput);

    storage.addItem(albumItem);
    UI.addItemToTheList(albumItem);
});

