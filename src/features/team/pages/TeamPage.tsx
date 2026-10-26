import ContentPage from "../../../components/layout/ContentPage";

export default function TeamPage() {
  return (
    <ContentPage
      eyebrow="Detras del proyecto"
      title="Equipo Vaporlock"
      description="El videojuego integra trabajo de diseno, programacion, arte, animacion, audio, narrativa, QA y gestion."
      items={[
        { number: "01", title: "Diseno y narrativa", description: "Juan Jose Canche Ay, Alexander David Rosales Pacheco y Miguel Angel Cordova Sanchez." },
        { number: "02", title: "Programacion y QA", description: "Yasser Omar Apango Ramos." },
        { number: "03", title: "Arte, animacion y audio", description: "Juan Jose Canche Ay, Alexander David Rosales Pacheco, Gustavo Lopez Alvarado y Miguel Angel Cordova Sanchez, segun sus responsabilidades." },
      ]}
    />
  );
}
