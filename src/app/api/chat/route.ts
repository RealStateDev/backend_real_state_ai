import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { isIntentPayload, IntentPayload } from '@/types/intent';
import { ChatMessage } from '@/types/generalTypes';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `Eres un asistente inmobiliario. Conversa con el usuario para obtener los datos necesarios de su búsqueda de propiedades. Cuando tengas tipo de propiedad, ciudad, trans_type, dormitorios, precio_min y precio_max responde exclusivamente con un JSON minificado del siguiente formato: {"ready":true,"intent":"buscar_propiedad","entidades":{...}}.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    const openAiMessages = [
      { role: 'system', content: systemPrompt },
      ...(messages || []).map((m) => ({
        role: m.sender === 'usuario' ? 'user' : 'assistant',
        content: m.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: openAiMessages,
    });

    const message = completion.choices[0].message.content?.trim() || '';
    let ready = false;
    let payload: IntentPayload | null = null;
    try {
      const parsed = JSON.parse(message);
      if (parsed && parsed.intent === 'buscar_propiedad' && isIntentPayload(parsed.entidades)) {
        ready = true;
        payload = parsed as any;
      }
    } catch {}

    return NextResponse.json({ message, ready, payload });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error procesando solicitud' }, { status: 500 });
  }
}
