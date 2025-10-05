import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function DeleteListModal(props) {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.currentList) {
        name = store.currentList.name;
    }
    function handleConfirmDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCancelDeleteList(event) {
        store.hideModals();
    }
    let modalClass = "modal is-visible";
    return (
        <div
        id="delete-list-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-root" id='verify-delete-list-root'>
            <div className="modal-north">
            Delete the {name} playlist?
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Are you sure you wish to permanently delete the {name} playlist?
                </div>
            </div>
            <div className="modal-south">
                <input 
                    type="button" 
                    id="remove-song-confirm-button" 
                    className="modal-button" 
                    onClick={handleConfirmDeleteList} 
                    value='Confirm' />
                <input 
                    type="button" 
                    id="remove-song-cancel-button" 
                    className="modal-button" 
                    onClick={handleCancelDeleteList} 
                    value='Cancel' />
            </div>
        </div>
    </div>
    );
}

export default DeleteListModal;