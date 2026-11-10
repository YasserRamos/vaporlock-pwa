
import { useEffect, useRef, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
const CHECK_INTERVAL = 10000;

type ConnectionState = "offline" | "checking" | "online" | null;

export default function ConnectionStatus() {
  const [status, setStatus] = useState<ConnectionState>(null);
  const wasOffline = useRef(false);
  const checking = useRef(false);

  useEffect(() => {
    let active = true;
    let reloadTimer: number | undefined;

    const checkConnection = async () => {
      if (!active || checking.current) return;

      if (!navigator.onLine) {
        wasOffline.current = true;
        setStatus("offline");
        return;
      }

      if (!API_URL) {
        wasOffline.current = true;
        setStatus("offline");
        return;
      }

      checking.current = true;

      const controller = new AbortController();
      const timeout = window.setTimeout(
        () => controller.abort(),
        5000
      );

      try {
        const response = await fetch(`${API_URL}/health`, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!active) return;

        if (!response.ok) {
          wasOffline.current = true;
          setStatus("offline");
          return;
        }

        if (wasOffline.current) {
          wasOffline.current = false;
          setStatus("online");

          reloadTimer = window.setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          setStatus(null);
        }
      } catch {
        if (active) {
          wasOffline.current = true;
          setStatus("offline");
        }
      } finally {
        window.clearTimeout(timeout);
        checking.current = false;
      }
    };

    const handleOffline = () => {
      wasOffline.current = true;
      setStatus("offline");
    };

    const handleOnline = () => {
      setStatus("checking");
      checkConnection();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Comprobar la conexión inicial.
    checkConnection();

    // Supervisar periódicamente la disponibilidad de la API.
    const interval = window.setInterval(
      checkConnection,
      CHECK_INTERVAL
    );

    return () => {
      active = false;

      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);

      window.clearInterval(interval);
      window.clearTimeout(reloadTimer);
    };
  }, []);

  if (!status) return null;

  const messages = {
    offline: "Sin conexión. Esperando conexión con Vaporlock...",
    checking: "Conexión recuperada. Comprobando servidor...",
    online: "De nuevo en línea. Actualizando Vaporlock...",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2"
    >
      <div className="flex items-center gap-3 rounded-lg border border-[#b87936] bg-[#171512] px-5 py-3 shadow-xl">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            status === "offline"
              ? "bg-red-500"
              : status === "checking"
                ? "animate-pulse bg-yellow-400"
                : "animate-pulse bg-emerald-400"
          }`}
        />

        <span className="text-sm font-medium text-[#f2dfad]">
          {messages[status]}
        </span>
      </div>
    </div>
  );
}
