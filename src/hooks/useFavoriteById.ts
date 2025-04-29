import React, {useState, useEffect} from "react";
import { Favorite } from "@/types/generalTypes";
import getFavoritePropertyByUser from "@/services/getFavoritePropertyByUser";
interface useFavHook {
    code: number;
    data: Favorite[];
    favoritoCount:number;
}

export default function useFavoriteHook(userId:number) 
{
    const [favorites, setFavorites] = useState< useFavHook | null>(null);
    const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
    const [favoriteError, setFavoriteError] = useState<string|null>(null);

    useEffect(()=>{
        const fetchFavoriteByUser = async () => {
            setFavoriteLoading(true);
            setFavoriteError(null);
            try {
                const userFavorites:useFavHook= await getFavoritePropertyByUser(userId);
                console.log('allFavorites ', userFavorites);
                setFavorites(userFavorites);

            } catch (error) {
                setFavoriteError('Error en useFavoriteByIdHook');
            }
            finally{
                setFavoriteLoading(false);
            }
        }
        fetchFavoriteByUser();
    },[userId])
    return {favorites,favoriteLoading,favoriteError};
}