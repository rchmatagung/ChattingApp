import { useAuth0 } from "@auth0/auth0-react"
import { Typography } from "@material-ui/core"
import { ExitToApp } from "@material-ui/icons"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router"

//Query Mengambil Data Nama Sesuai Id
const GetUser = gql `
query MyQuery($_eq: String!) {
    users(where: {id: {_eq: $_eq}}) {
      name
    }
  }  
  `

const NamaPesan = () => {
    const {id} = useParams()
    const {data} = useQuery(GetUser, {variables: {
        _eq: id
    }})
    const {logout} = useAuth0()

    return (
        <div>
                <Typography variant="h6" noWrap style={{width: "100%"}}>
                    {id==="Lobby"?"Lobby":data?.users[0].name}
                    <ExitToApp
                        style={{ float: "right" , marginTop:"5px", display: "flex"}}
                        onClick={() => logout({
                        returnTo: process.env.REACT_APP_BASE_URL
                        })}
                    ></ExitToApp>
                </Typography>
        </div>
    )
}

export default NamaPesan