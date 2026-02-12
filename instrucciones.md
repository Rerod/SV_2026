# 🎮 Animal Crossing – Valentine Interactive Experience

## 📌 Objetivo

Crear una experiencia web estática estilo Animal Crossing que simule:

1. Pantalla de inicio tipo menú del juego
2. Transición al NookPhone
3. Icono de Mensajes con animación de notificación
4. Chat interactivo estilo Animal Crossing
5. Flujo conversacional personalizado
6. Pantalla final con overlay de Tom Nook en T-pose

La aplicación será desplegada en **GitHub Pages** como sitio estático.

---

# 🏗️ Arquitectura General

Proyecto 100% estático:

```
animal-valentine/
 ├── index.html
 ├── style.css
 ├── script.js
 └── assets/
       nookphone.svg
       icon-messages.svg
       (otros iconos svg)
       tomnook-tpose.png
       background.png
```

## 🔹 Tecnologías

* HTML5
* CSS3 (animaciones + layout)
* JavaScript Vanilla (gestión de estados)
* SVGs exportados desde Figma

---

# 🎨 Assets Disponibles

Contamos con:

* ✅ SVG completo del NookPhone
* ✅ SVG individual de cada icono
* ✅ Cursor estilo Animal Crossing
* ✅ Elementos de UI del juego exportados desde Figma
* ✅ Globos de diálogo en SVG

Esto permite una recreación visual muy fiel al juego.

---

# 🧠 Arquitectura de Estados

La aplicación funciona mediante un sistema simple de estados:

```js
state = "menu" | "phone" | "chat" | "final"
```

Cada estado renderiza una pantalla diferente.

---

# 🏝️ Flujo Completo de Experiencia

## 1️⃣ Pantalla de Inicio (Menu Principal)

* Fondo estilo Animal Crossing
* Logo del juego
* Botón: "Continuar"

Al hacer click → transición a NookPhone.

---

## 2️⃣ NookPhone

* Se renderiza el SVG completo del teléfono
* Iconos posicionados en grid
* Icono de "Mensajes" con:

  * Animación bounce
  * Badge rojo de notificación

```css
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

Click en Mensajes → abre chat.

---

# 💬 Sistema de Chat

## 📱 Estética

Inspirado en el chat del juego:

* Fondo verde claro con patrón
* Burbujas crema
* Nombre del remitente en etiqueta rosa
* Texto gris oscuro
* Bordes muy redondeados

---

## 🧩 Estructura HTML del Chat

```html
<div class="chat-container">
  <div class="bubble left">
    <div class="name-tag">Sebastian</div>
    <div class="text">Hola Ari</div>
  </div>
</div>
```

---

## 🟢 Ejemplo de Globo en SVG

Ejemplo simplificado de burbuja estilo Animal Crossing en SVG:

```svg
<svg width="260" height="80" viewBox="0 0 260 80">
  <rect x="0" y="0" width="260" height="70" rx="25" ry="25" fill="#f4f1e6"/>
  <circle cx="230" cy="10" r="4" fill="red"/>
</svg>
```

Características:

* `rx` alto para bordes redondeados
* Colores suaves (#f4f1e6 crema)
* Puntito rojo opcional de notificación

---

# 💘 Flujo Conversacional Completo

## Etapa 1

Mensaje:
"Hola Ari"

Opciones:

* Hola Sebis
* No quiero hablar ahora

---

## Etapa 2

Si elige "Hola Sebis":
→ "Ariana"

Si elige "No quiero hablar ahora":
→ 😭
→ "es rapido"
→ "Ariana"

Opciones:

* Dime
* Sebastian

---

## Etapa 3

Mensaje:
"Tengo que hacerte una pregunta, ya que pronto es una fecha importante"

Opciones:

* Dime Dime Dime
* Que cosa 😮

---

## Etapa 4 – Propuesta

Mensaje:
"Quieres ser mi San Valentin? ❤️"

Opciones:

* Si quiero, te amo
* Si quiero, te amo aun mas

---

## Etapa Final

Mensaje:
"Te amo muchísimo mas princesita"

Luego:
"Bueno eso era todo, ya no puedo esperar para verte mañana. Nuevamente te amo mucho más. Espero te gustara"


---

# 🦝 Pantalla Final

Se vuelve al menú principal.

Pero encima aparece un overlay con:

Tom Nook en T-pose.

```html
<div class="overlay">
  <img src="assets/tomnook-tpose.png">
</div>
```

Overlay cubre toda la pantalla con fondo semitransparente.

---

# 🎬 Animaciones Recomendadas

* Fade entre pantallas
* Texto con efecto typewriter
* Sonido estilo Animal Crossing al escribir
* Bounce infinito en icono mensajes

---

# 🚀 Deploy

1. Subir proyecto a GitHub
2. Activar GitHub Pages desde branch main
3. Compartir URL
4. Generar QR si se desea

---

# ❤️ Resultado Esperado

Una experiencia interactiva que:

* Se siente como estar dentro del juego
* Usa assets reales del NookPhone
* Tiene fidelidad visual
* Es divertida y romántica
* Termina con humor interno (capitalismo + T-pose)

---

# 🧠 Posibles Mejoras Futuras

* Música instrumental de fondo
* Cursor personalizado estilo juego
* Animaciones más suaves
* Guardado de respuesta
* Easter eggs escondidos

---

## 🎯 Conclusión

Este proyecto combina:

* Diseño fiel al universo Animal Crossing
* Interactividad personalizada
* Desarrollo frontend limpio
* Romanticismo + humor interno

Una propuesta creativa, técnica y emocionalmente potente.
