// src/components/common/SuscripcionOptions.tsx
"use client";

import React, { useState } from "react";
import { useUser } from "@/contexts/userContext";
import createSubscription from "@/services/createSubscription";
import { useRouter } from "next/navigation";
import useSubscriptionHook from "@/hooks/useSubscriptionHook";
import updateSubscriptionService from "@/services/updateSubscriptionService";

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
}

export default function SuscripcionOptions() {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();
  // Llamada al contexto de usuario
  const { user } = useUser();
  const userId = user?.id || null; // Puede ser string o null
  const {subscription, subscriptionError, subscriptionLoading } = useSubscriptionHook();

  const plans: Plan[] = [
    {
      name: "Plan Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description:
        "Plan gratuito para comenzar a explorar nuestras funcionalidades.",
      features: [
        "40 consultas por día",
        "Soporte limitado",
        "Actualizaciones mensuales",
      ],
      cta: "Empezar gratis",
    },
    {
      name: "Plan Básico",
      monthlyPrice: 9.99,
      annualPrice: 8.99,
      description: "Para usuarios en crecimiento que necesitan más opciones.",
      features: [
        "500 consultas por mes",
        "Soporte básico",
        "Actualizaciones mensuales",
      ],
      cta: "Seleccionar",
    },
    {
      name: "Plan Premium",
      monthlyPrice: 29.99,
      annualPrice: 25.99,
      description: "Todo incluido: acceso ilimitado y soporte 24/7.",
      features: [
        "Consultas ilimitadas",
        "Soporte 24/7",
        "Reportes avanzados",
        "Actualizaciones inmediatas",
      ],
      cta: "Seleccionar",
    },
  ];

  return (
    <div className="p-4">
      {/* Toggle de precios */}
      <div className="flex items-center justify-center mb-6">
        <span
          className={`${
            !isAnnual ? "text-blue-600" : "text-gray-600"
          } font-semibold mx-2`}
        >
          Mensual
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAnnual}
            onChange={() => setIsAnnual(!isAnnual)}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-700 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                      after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all 
                      dark:border-gray-600 peer-checked:bg-blue-600"
          />
        </label>
        <span
          className={`${
            isAnnual ? "text-blue-600" : "text-gray-600"
          } font-semibold mx-2`}
        >
          Anual
        </span>
        {isAnnual && (
          <span className="text-sm text-pink-600 ml-2">
            ¡Ahorra hasta 2 meses!
          </span>
        )}
      </div>

      {/* Tarjetas de planes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-lg shadow p-6 flex flex-col hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-500 mb-4">{plan.description}</p>
            <div className="mb-4">
              <span className="text-4xl font-bold">
                ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
              </span>
              <span className="text-base font-normal"> / mes</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 flex-1 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 inline-block" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition font-medium"
              onClick={async () => {
                try {
                  if (userId && subscription?.id) {

                    const updateSubscription = await updateSubscriptionService(subscription?.id, {
                      activo: false,
                    });

                    console.log("desactivado de subscripcion: " + updateSubscription);

                    const subscriptionCreate = await createSubscription({
                      usuario_id: userId,
                      tipo_suscripcion: plan.name,
                      activo: true,
                      monto: isAnnual ? plan.annualPrice * 12 : plan.monthlyPrice,
                      tipo_facturacion: isAnnual ? "anual" : "mensual",
                    });
                    console.log("Subscription ", subscriptionCreate);

                    router.back();
                  }else if(userId && !subscription?.id){
                    const subscriptionCreate = await createSubscription({
                      usuario_id: userId,
                      tipo_suscripcion: plan.name,
                      activo: true,
                      monto: isAnnual ? plan.annualPrice * 12 : plan.monthlyPrice,
                      tipo_facturacion: isAnnual ? "anual" : "mensual",
                    });
                    console.log("Subscription ", subscriptionCreate);

                    router.back();
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
