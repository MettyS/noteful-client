import React, { Component } from 'react'
import './AddFolder.css'
import ApiContext from '../ApiContext'

class AddFolder extends Component {

  static contextType = ApiContext

  state = {
    title: { value: 'sample title' , touched: false}
  }

  getErrorMessage() {
    if(this.state.title.touched){
      let message = "";
      if(!this.state.title.value || !this.state.title.value.length){
        message = "please enter a folder name";
      }
      console.log('the add folder error is: ', message);
      return <p className='error'>{message}</p>
    }
    return <></>
  }

  render() {
    const { addFolder } = this.context
    const getErrors = this.getErrorMessage();


    return (
    <form
      id='add-folder-form'
      className='Noteful-form'
      action='#'
      onSubmit={e => {e.preventDefault();  addFolder(this.state.title.value); this.props.history.goBack()}}
    >
      <label htmlFor='folder-name-input'>New Folder Name:
        {getErrors}
      </label>
      <input type='text' name='folder-title' className='field' id='folder-name-input' onChange={e => {
        console.log(e.target.value);
        this.setState({
          title: {value: e.target.value, touched: true}
        })
      }}/>
      <button type='submit' className='buttons'>Create Folder</button>
    </form>
  )
  }


}

export default AddFolder
