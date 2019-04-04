import React, { Component } from 'react';
import axios from 'axios';
import Hello from './Hello';
import Priorite from './Priorite'




class Activites extends Component {

  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEditing = this.handleEditing.bind(this)

    this.state={
        Items:[],
        ItemsEdit:'',
        InputValue:'',
        IsLoading: true,
        IsEditing: false,
        CurrentId: ''
    };
  }
 
  componentDidMount(){
      axios.get('http://localhost:3001/activites')
      .then(res => {
        const Items = res.data;
        setTimeout(()=> {
          this.setState({ Items, IsLoading: false });
        }, 1500)
      })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.IsEditing !== this.state.IsEditing){
        axios.get('http://localhost:3001/activites')
        .then(res => {
        const Items = res.data;
        this.setState({ Items });
        })
    }
    return true
  }
    

    handleSubmit = e => {
      e.preventDefault();
      let id = e.target.attributes[0].nodeValue
      let InputValue = {nom: this.state.InputValue}
     axios({
        method: 'post',
        url: `http://localhost:3001/activites/update/${id}`,
        data : InputValue,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          this.setState({
            InputValue: '',
            IsEditing: false,
            CurrentId: ''
          })
          console.log(this.state.InputValue)
        }
        
        
      })
    }
    
    handleOnChange = e => {
        let task = e.target.value;
        this.setState({
          InputValue: task
        })
    }

    handleEditing = e => {
      let id = e.target.attributes[0].nodeValue
      this.setState({
        IsEditing: true,
        CurrentId: id
      })
    }

    render() {

      if(this.state.IsLoading){
        return (
          <div>
            <Hello />
            <h1>Loading in progress ...</h1>
          </div>
        )
      }

      if(this.state.IsEditing){
        return (
          <div>
            <form id={this.state.CurrentId} onSubmit={this.handleSubmit}>
              <input onChange={this.handleOnChange} value={this.state.InputValue}></input>
              <button>Update</button>
            </form>
          </div>
        )
      }

      const item = this.state.Items
      console.log(item)
      return (
        <div>
          <Hello />
          <ul>
            {item.map(element =>
                <div key={element.id}>
                  <span>{element.nom}</span>
                  <button id={element.id} onClick={this.handleEditing}>Editer</button>
                  <Priorite priorite={element.priorite}/>
                </div>          
              )}
          </ul>
        </div>
        )
      }
}        

export default Activites;