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
            IsLoading: true,
            CurrentID:''

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

    handleEditActivite = (e) => {
        e.preventDefault();
        console.log(e.target);

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