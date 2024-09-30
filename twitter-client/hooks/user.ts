import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser=()=>{
    const query=useQuery({
        queryKey:["current-user"],
        queryFn:()=>graphqlClient.request(getCurrentUserQuery)
    })

    return {...query,user:query.data?.getCurrentUser};
}

export const useGetUserById = (id: string) => {
    const query = useQuery({
        queryKey: ["random-user", id],
        queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
        enabled: !!id, 
    });

    return { ...query, user: query.data?.getUserById };
};