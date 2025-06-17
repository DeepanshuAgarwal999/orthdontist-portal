import { UserService } from "@/service/user.service"
import { useQuery } from "@tanstack/react-query"


const useUser = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: UserService.getUser,
        retry: 1
    })
    return {
        user: data,
        isLoading,
        error
    }
}

export default useUser