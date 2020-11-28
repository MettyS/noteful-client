import React, { Component } from 'react';
import ApiContext from '../ApiContext';

export default class AddNotePage extends Component {
	static contextType = ApiContext;

	state = {
		name: {
			value: '',
			touched: false
		},
		content: {
			value: ''
		},
		folderIdIndex: {
			value: null,
			touched: false
		}
	}

	getNameErrorMessage() {
    if(this.state.name.touched){
      let message = this.state.name.value.length ? "" : "please enter a name";
      return <p className='error'>{message}</p>
    }
    return <></>
  }

	getFolderErrorMessage() {
		if(this.state.folderIdIndex.touched) {
			let message = this.state.folderIdIndex.touched && this.state.folderIdIndex.value.length ? '' : 'please select a folder';
			return <p className='error'>{message}</p>
		}
		return <></>
	}

	validateInfo() {
		console.log('folder valid?:', this.context.folders[this.state.folderIdIndex.value]);
		if (this.state.name.value.length !== 0 && this.context.folders[this.state.folderIdIndex.value]) return true;
		return false;
	}

	render()  {
		const { folders, addNote } = this.context;
		const [nameError, folderError] = [ this.getNameErrorMessage(), this.getFolderErrorMessage()]
		return (
			<form
	      className='Noteful-form'
				onSubmit={ e => {
					e.preventDefault();
					if (this.validateInfo()) {
						const {name, content, folderIdIndex } = this.state;
						const note = {
							name: name.value,
							content: content.value,
							folderId: folders[folderIdIndex.value].id
						}
						addNote(note);
						this.props.history.goBack();
					} else {
						console.log('invalid');
					}
				}}
			>
			<label htmlFor='name-input'>Note Name:
			{nameError}
			</label>
				<input type='text' id='name-input'  onChange={ e=>this.setState({name:{value: e.target.value, touched: true} }) }/>

			<label htmlFor='content'>Description:</label>
			<textarea id='content' placeholder="(Optional)" onChange={ e=> this.setState({ content :{value: e.target.value}}) }></textarea>

			<label htmlFor='folder-selection'>Select Folder
			{folderError}</label>
				<select id='folder-selection' onChange={ e=> this.setState({ folderIdIndex :{value: e.target.value, touched: true} }) }>
					<option value=''>--- Select Folder ---</option>
					{folders.map( (folder, i) =>
						<option value={i} key={folder.id}>{folder.name}</option>)}
				</select>

				<button type='submit' className='buttons'>Create Note</button>
			</form>
		)
	}
}
