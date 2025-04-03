import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import { toast } from "sonner";

interface CopyToClipboardProps {
  text: string;
}

export const CopytoClipboard = (text: CopyToClipboardProps["text"]): void => {
  // Check if there's text to copy
  if (!text) {
    toast("No hay contenido para copiar");
    return;
  }
  
  // Copy the text to clipboard
  navigator.clipboard.writeText(text)
  .then(() => {
    showInfoToast("Valor copiado");
  })
  .catch((error: unknown) => {
    console.error("Error copying to clipboard:", error);
    showErrorToast("Error al copiar");
  });
};