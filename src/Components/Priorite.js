import React from 'react'

const Priorite = (props) => {
    if (props.priorite === 1) {
        return (
            <td>
                <span className="badge badge-danger">Urgent</span>
            </td>
        )
    } else if (props.priorite === 2) {
        return (
            <td>
                <span className="badge badge-success">Important</span>
            </td>
        )
    } else {
        return (
            <td>
                <span className="badge badge-primary">Pas important</span>
            </td>
        )
    }
}

export default Priorite