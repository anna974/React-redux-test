import React, {Component} from 'react'
import axios from 'axios'
import Priorite from './Priorite'
import EditInputValue from './EditInputValue'

class ListeActivites extends Component {

    constructor(props) {
        super(props);
        this.handleEditActivite = this.handleEditActivite.bind(this)

        this.state={
            activites : [],
            InputValue:'',
            IsLoading: true,
            IsEditing: false,

        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/activites')
        .then(res => {
            const activites = res.data
            setTimeout(()=> {
                this.setState({ activites, IsLoading: false });
              }, 1500)
        });
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
      
    handleEditActivite = (e) => {
        // let id = e.target.attributes[0].nodeValue
        this.setState({
          IsEditing: true,
        })
    }

    handleOnChange = e => {
        console.log(e.target.value)
        let task = e.target.value;
        this.setState({
          InputValue: task
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.id)
        let id = e.target.id
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
            })
            console.log(this.state.InputValue)
          }
          
          
        })
      }

    render() {
        if(this.state.IsLoading){
            return (
                <div>
                    <h1>Loading in progress ...</h1>
                </div>
            )
        }
        
        const activites = this.state.activites;
        if(this.state.IsEditing){
            return (
                <div>
                {
                    <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col-2"></th>
                        <th scope="col-7">Activite</th>
                        <th scope="col-3">Priorité</th>
                      </tr>
                    </thead>
                    <tbody>
                        {activites.map( element =>
                            <tr key={element.id}>
                                <th scope="row">1</th>
                                <td>
                                    <form id={element.id} onSubmit={this.handleSubmit}>
                                        <input onChange={this.handleOnChange} value={this.state.InputValue}></input>
                                        <button>Update</button>
                                    </form>
                                </td>
                                <Priorite priorite={element.priorite}/>
                            </tr>
                        )}
                      
                    </tbody>
                  </table>

                }
            </div>
            )}

        return (
            <div>
                {
                    <table className="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col-2"></th>
                        <th scope="col-7">Activite</th>
                        <th scope="col-3">Priorité</th>
                      </tr>
                    </thead>
                    <tbody>
                        {activites.map( element =>
                            <tr key={element.id}>
                                <th scope="row">1</th>
                                <td onClick={this.handleEditActivite}>{element.nom}</td>
                                <Priorite priorite={element.priorite}/>
                            </tr>
                        )}
                      
                    </tbody>
                  </table>

                }
            </div>
        )
    }

}

export default ListeActivites