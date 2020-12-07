import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import ErrorBoundary from '../ErrorBoundaries/ErrorBoundaries';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
        console.log('notes>>>>>>>>', notes);
        console.log('folders>>>>>>>>>>', folders);
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleAddFolder = (folder) => {
    this.setState({
      folders: this.state.folders.concat(folder),
    });
  };

  handleAddNote = (note) => {
    this.setState({
      notes: this.state.notes.concat(note),
    });
  };

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,
    };
    return (
      <ErrorBoundary>
        <ApiContext.Provider value={value}>
          <div className="App">
            <ErrorBoundary>
              <nav className="App__nav">{this.renderNavRoutes()}</nav>
            </ErrorBoundary>
            <ErrorBoundary>
              <header className="App__header">
                <h1>
                  <Link to="/">Noteful</Link>{' '}
                  <FontAwesomeIcon icon="check-double" />
                </h1>
              </header>
            </ErrorBoundary>
            <ErrorBoundary>
              <main className="App__main">
                <ErrorBoundary>{this.renderMainRoutes()}</ErrorBoundary>
              </main>
            </ErrorBoundary>
          </div>
        </ApiContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default App;