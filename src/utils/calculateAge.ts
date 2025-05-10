import { parseISO, differenceInYears } from "date-fns"

export default function calculateAge (fecha_nacimiento:string)
{
const result = differenceInYears(new Date(), new Date(fecha_nacimiento))
return result;
}