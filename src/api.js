const URL = 'http://localhost:9090';

function fetchHandler (...args) {

	return fetch(...args).then(res => {
		if (!res.ok) {
			return Promise.reject(res.status);
		}
		return res.json();
	}).then(data => data);
}

function getNotesAndFolders () {
	return Promise.all([
			fetchHandler(`${URL}/notes`),
			fetchHandler(`${URL}/folders`)
	]).then( ([notesRes, foldersRes]) =>{ return {notes: notesRes, folders: foldersRes } });
}

function addNote (noteObject) {
	noteObject.modified = new Date();
	let body = JSON.stringify(noteObject);

	return fetchHandler(`${URL}/notes`, {
		method: 'POST',
		headers: { 'content-type': 'application/json'},
		body
	});
}

function deleteNote (id) {
	return fetchHandler(`${URL}/notes/${id}`, {
		method: 'DELETE',
		headers: { 'content-type': 'application/json'}
	});
}

function addFolder (folderObj) {
	let body = JSON.stringify(folderObj);

	return fetchHandler(`${URL}/folders`, {
		method: 'POST',
		headers: { 'content-type': 'application/json'},
		body
	});
}

function deleteFolder (id) {
	return fetchHandler(`${URL}/folders/${id}`,{
		method: 'DELETE',
		headers: { 'content-type': 'application/json'}
	});
}

export default {
	getNotesAndFolders,
	addNote,
	deleteNote,
	addFolder,
	deleteFolder
}
