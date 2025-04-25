import React, {useState, useEffect} from "react";
import { Subscripcion } from "@/types/generalTypes";
import getSubscriptionByUser from "@/services/getSubscriptionService";
import { useUser } from "@/contexts/userContext";

export default function useSubscriptionHook() 
{
    // Llamada al contexto de usuario
    const { user } = useUser();
    const userId = user?.id || null; // Puede ser string o null
    const [subscription, setSubscription] = useState<Subscripcion|null>(null);
    const [subscriptionLoading, setSubscriptionLoading] = useState<boolean>(false);
    const [subscriptionError, setSubscriptionError] = useState<string|null>(null);

    useEffect(()=>{
        if (userId) {
        const fetchSubscriptionByUser = async () => {
                setSubscriptionLoading(true);
                setSubscriptionError(null);
                try {
                    const subscription = await getSubscriptionByUser(userId);
                    console.log('Subscription ', subscription);
                    if (subscription.subsCount == 0) 
                    {
                        setSubscription(null);    
                    }
                    else 
                    {
                        const activeSubscription = subscription.subsList.find((sub: Subscripcion) => sub.activo);
                        setSubscription(activeSubscription);
                    }  
                } catch (error) {
                    setSubscriptionError('Error en useSubscriptionHook');
                }
                finally{
                    setSubscriptionLoading(false);
                }
            }
            fetchSubscriptionByUser();
        }
    },[userId])
    return {subscription,subscriptionLoading,subscriptionError};
}