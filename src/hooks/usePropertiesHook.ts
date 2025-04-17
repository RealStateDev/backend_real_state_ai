import React, {useState, useEffect} from "react";
import { PropertyListing } from "@/types/generalTypes";
import getAllPropertiesService from "@/services/getAllPropertiesService";

export default function usePropertiesHook() 
{
    const [properties, setProperties] = useState<PropertyListing[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        const fetchProperties = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const allProperties:PropertyListing[] = await getAllPropertiesService();
                console.log('allProperties ', allProperties);
                setProperties(allProperties);

            } catch (error) {
                setError('Error en usePropertiesHook');
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchProperties();
    },[])
    return {properties,isLoading,error};
}