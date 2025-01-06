import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Definir rutas públicas
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

export default clerkMiddleware((auth, request) => {
  const url = request.nextUrl;

  // Permitir acceso a rutas públicas
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Proteger rutas privadas
  return auth.isSignedIn
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/sign-in', url.origin));
});

export const config = {
  matcher: [
    // Omitir archivos internos y estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Ejecutar siempre en rutas de API
    '/(api|trpc)(.*)',
    // Añadir rutas ignoradas
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ]
};



// publicRoutes: [
//   '/',
//   '/events/:id',
//   '/api/webhook/clerk',
//   '/api/webhook/stripe',
//   '/api/uploadthing'
// ], 
// ignoredRoutes: [
//   '/api/webhook/clerk',
//   '/api/webhook/stripe',
//   '/api/uploadthing'
// ]
