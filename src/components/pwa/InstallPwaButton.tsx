import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import './InstallPwaButton.css'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

export default function InstallPwaButton() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  const [installed, setInstalled] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true

    setInstalled(isStandalone)

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    const handleInstalled = () => {
      setInstalled(true)
      setInstallPrompt(null)
      setMessage('Vaporlock se ha instalado correctamente.')
    }

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstall,
    )

    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstall,
      )

      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) {
      setMessage(
        'Si utilizas Safari en iPhone o iPad, abre el menú Compartir y selecciona "Añadir a pantalla de inicio".',
      )
      return
    }

    await installPrompt.prompt()

    const result = await installPrompt.userChoice

    if (result.outcome === 'accepted') {
      setMessage('Instalación iniciada.')
    }

    setInstallPrompt(null)
  }

  if (installed) return null

  return (
    <div className="pwa-install-container">
      <button
        type="button"
        className="pwa-install-button"
        onClick={handleInstall}
        aria-label="Instalar Vaporlock"
        title="Instalar Vaporlock"
      >
        <Download size={17} strokeWidth={2.2} />
        <span>Instalar</span>
      </button>

      {message && (
        <span className="pwa-install-message" role="status">
          {message}
        </span>
      )}
    </div>
  )
}