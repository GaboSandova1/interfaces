import React, { useState, useEffect } from 'react';

// Fuentes estándar y ejemplo de fuentes personalizadas
const SERIF_FONTS = [
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Playfair Display', value: 'Playfair Display, serif' },
  { label: 'Merriweather', value: 'Merriweather, serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Lora', value: 'Lora, serif' }
];
const SANS_SERIF_FONTS = [
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Open Sans', value: 'Open Sans, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Lato', value: 'Lato, sans-serif' }
];

const TypographyPreview = ({ headingFont, headingSize, bodyFont, bodySize }) => (
  <div style={{ padding: 24, background: '#f9f9f9', borderRadius: 8, marginTop: 24 }}>
    <h4 style={{ fontFamily: headingFont, fontSize: 14, color: '#666' }}>Tipografía de Títulos</h4>
    <h1 style={{ fontFamily: headingFont, fontSize: headingSize, margin: 0 }}>Título Principal</h1>
    <h2 style={{ fontFamily: headingFont, fontSize: `calc(${headingSize} * 0.85)`, margin: 0 }}>Subtítulo</h2>
    <h3 style={{ fontFamily: headingFont, fontSize: `calc(${headingSize} * 0.7)`, margin: 0 }}>Encabezado Nivel 3</h3>
    <h4 style={{ fontFamily: bodyFont, fontSize: 14, color: '#666', marginTop: 32 }}>Tipografía de Contenido</h4>
    <p style={{ fontFamily: bodyFont, fontSize: bodySize }}>
      Este es un párrafo de ejemplo que muestra cómo se ve el texto normal en el contenido. La tipografía sans-serif es ideal para la lectura en pantalla.
    </p>
    <p style={{ fontFamily: bodyFont, fontSize: bodySize }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
      <span style={{ color: '#2563eb', fontWeight: 500 }}>Texto Resaltado</span>
      <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, padding: '6px 16px', fontFamily: bodyFont, fontSize: bodySize }}>Botón Principal</button>
      <button style={{ background: 'transparent', color: '#2563eb', border: '1px solid #2563eb', borderRadius: 4, padding: '6px 16px', fontFamily: bodyFont, fontSize: bodySize }}>Botón Secundario</button>
    </div>
  </div>
);

export default TypographyPreview;
