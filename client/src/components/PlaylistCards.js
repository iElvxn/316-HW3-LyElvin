import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PlaylistCard from './PlaylistCard.js'
import { GlobalStoreContext } from '../store/index.js'
import DeleteListModal from './DeleteListModal.js'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const PlaylistCards = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <PlaylistCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    let deleteListModal = "";
    if (store.isDeleteListModalOpen())
        deleteListModal = <DeleteListModal />;
    return (
        <div id="playlist-selector">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                {
                    deleteListModal
                }                
            </div>
        </div>)
}

export default PlaylistCards;