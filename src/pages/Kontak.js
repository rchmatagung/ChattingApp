import { gql, useQuery } from '@apollo/client'
import KontakList from '../components/KontakList'
import { Divider } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom"

const GetUser = gql`
    query MyQuery(
        $order_by: [users_order_by!] = { name: desc }
        $_neq: String = ""
    ) {
        users(order_by: $order_by, where: { id: { _neq: $_neq } }) {
        id
        name
        picture
        }
    }`

const Kontak = () => {
    const {user} = useAuth0()
    const {data} = useQuery(GetUser, {
        variables:{order_by: {name: "asc"}, _neq: user.sub}
    })
    
    const users = [{id:"Lobby", name: "Lobby"}]
    if(data && data.users) {
        users.push(...data.users)
    }

    return (
        <div>
            {users.map(u => {
                return (
                <div key={u.id}>
                    <Link to={`/home/${u.id}`} style={{textDecoration:"none", color:"black"}}>
                    <KontakList user={u} />
                    </Link>
                    <Divider/>
                </div> 
            )
            })}
        </div>
    )
}

export default Kontak