import { jsTPS_Transaction } from "jstps"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class CreateSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.song = initSong;
    }

    executeDo() {
        this.store.createSong(this.index, this.song);
    }
    
    executeUndo() {
        this.store.removeSong(this.index);
    }
}