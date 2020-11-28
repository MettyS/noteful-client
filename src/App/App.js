import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNotePage from '../AddNotePage/AddNotePage';
import api from '../api';
import cuid from 'cuid';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
      api.getNotesAndFolders()
			.then(({notes, folders}) => {
                console.log('updating state.notes to: ',notes);
                console.log('updating state.folders to: ',folders)
          this.setState({notes, folders});
      })
      .catch(error => {
          console.error({error});
      });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    //update local state with new note
    updateStateOnAddNote = note => {
        let tempNotes = [...this.state.notes, note]
        this.setState({
            notes: tempNotes
        })
    }

    //compound function to call api and update local state with new note
    handleAddNote = note => {
				note.id = cuid();
				api.addNote(note)
				.then( res => {
					console.log('added note:', res);
					this.updateStateOnAddNote(note);
				});
    }

    //update local state with new folder
    updateStateOnAddFolder = folder => {
        let tempFolders = [...this.state.folders, folder]
        this.setState({
            folders: tempFolders
        })
    }

    //compound function to call api and update local state with new folder
    handleAddFolder = name => {
        console.log('added foldername is: ',name);
        let folder = {name: name, id: cuid()};
        api.addFolder(folder).then(res => {
            console.log(res);
            this.updateStateOnAddFolder(folder);
        }).catch(er =>{
            console.error(er);
        });
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route exact path="/note/:noteId" component={NotePageNav} />
                <Route exact path="/add-folder" component={NotePageNav} />
                <Route exact path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
								<Route path='/add-note' component={AddNotePage} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
						addNote: this.handleAddNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
