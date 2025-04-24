import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        console.error('Error verificando token:', error);
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('tokenJWT')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/loginPage', req.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
        return NextResponse.redirect(new URL('/loginPage', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/homePage', '/chatHistoryPage','/savedPage','/suscriptionsPage'],
};
