# OGUC App — Compilar instalador Windows

## Opción A: GitHub Actions (recomendado, sin instalar nada)

1. Crea una cuenta gratis en https://github.com
2. Crea un repositorio nuevo (puede ser privado)
3. Sube todos estos archivos al repositorio
4. Ve a la pestaña **Actions** → selecciona **Build OGUC App para Windows** → clic en **Run workflow**
5. Espera ~5 minutos → descarga el `.exe` desde la sección **Artifacts**

## Opción B: Compilar en tu PC con Node.js instalado

```powershell
npm install
npm run build:win
```
El instalador queda en la carpeta `dist/`

## Resultado
`OGUC App Setup 1.0.0.exe` — instalador estándar Windows que:
- Instala la app en Archivos de programa
- Crea acceso directo en el escritorio
- Crea entrada en el menú inicio
- Permite desinstalar desde el Panel de control
