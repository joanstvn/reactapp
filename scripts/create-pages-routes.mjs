import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = 'dist';
const routes = [
    'beneficios',
    'faq',
    'rick-and-morty',
    'props',
    'login',
    'login/iniciar-sesion',
    'login/crear-cuenta',
    'login/recuperar',
];

for (const route of routes) {
    const routeDirectory = join(outputDirectory, route);
    await mkdir(routeDirectory, { recursive: true });
    await copyFile(join(outputDirectory, 'index.html'), join(routeDirectory, 'index.html'));
}
