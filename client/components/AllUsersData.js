import React from 'react'
import { useQuery, gql} from "@apollo/client";

const GET_ALL_USERS_DATA = gql`
  query Users{
    users{
        firstName
      containers{
        name
      }
     }
  }
`;



export default function AllUsersData() {

  const { loading, error, data } = useQuery(GET_ALL_USERS_DATA);
  if (loading) {
    return 'loading..'
  }
  if (error) {
    return 'loading..'
  }

  return (
    <div>
      {
         data.users.map((user, idx) => {
          return (
            <><div key={idx}>
              {user.firstName}
            </div><div>
                {user.containers?.map((container, idx) => {
                  return (
                    <div key={idx}>
                      {container.name}
                    </div>
                  );
                })}
              </div></>
          )
        })
      }
    </div>
  )
}
