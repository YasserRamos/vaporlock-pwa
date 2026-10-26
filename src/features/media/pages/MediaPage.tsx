import ContentPage from "../../../components/layout/ContentPage";

export default function MediaPage() {
  return (
    <ContentPage
      eyebrow="Archivo visual"
      title="Galeria"
      description="Un espacio para reunir capturas, sprites, animaciones, ilustraciones y avances visuales originales de Vaporlock."
      items={[
        { number: "01", title: "Escenarios", description: "Fondos y escenarios industriales de Metronia." },
        { number: "02", title: "Pixel Art", description: "Sprites de personajes, enemigos y elementos del entorno." },
        { number: "03", title: "Desarrollo", description: "Capturas y avances del proceso de creacion del videojuego." },
      ]}
    />
  );
}
