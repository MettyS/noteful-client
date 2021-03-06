import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import './NoteListMain.css';
import ErrorBoundary from '../ErrorBoundaries/ErrorBoundaries';

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, Number(folderId));
    console.log('notesForFolder: ', notesForFolder);

    return (
      <section className="NoteListMain">
        <ErrorBoundary>
          <ul>
            {notesForFolder.map((note) => {
              console.log(note.note_name);
              return(
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.note_name}
                  modified={note.date_created}
                />
              </li>
            )}
            )}
          </ul>
          <div className="NoteListMain__button-container">
            <CircleButton
              tag={Link}
              to="/add-note"
              type="button"
              className="NoteListMain__add-note-button">
              <FontAwesomeIcon icon="plus" />
              <br />
              Note
            </CircleButton>
          </div>
        </ErrorBoundary>
      </section>
    );
  }
}