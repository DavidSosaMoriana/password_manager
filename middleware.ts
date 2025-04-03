export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Protege todas las rutas excepto la página de inicio de sesión y otras rutas públicas
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"
  ]
};