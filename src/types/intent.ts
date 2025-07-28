export interface IntentPayload {
  tipo_propiedad: string;
  ciudad: string;
  trans_type: string;
  dormitorios: number;
  precio_min: number;
  precio_max: number;
}

export function isIntentPayload(obj: any): obj is IntentPayload {
  return (
    obj &&
    typeof obj.tipo_propiedad === 'string' &&
    typeof obj.ciudad === 'string' &&
    typeof obj.trans_type === 'string' &&
    typeof obj.dormitorios === 'number' &&
    typeof obj.precio_min === 'number' &&
    typeof obj.precio_max === 'number'
  );
}
