export function acortarTexto(texto, maxLength) {
  if (!texto) return "";
  if (texto.length <= maxLength) return texto;
  const corte = texto.substring(0, maxLength);
  return corte.substring(0, corte.lastIndexOf(" ")) + "...";
}
