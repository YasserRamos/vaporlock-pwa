import ContentPage from "../../../components/layout/ContentPage";

export default function LevelsPage() {
  return (
    <ContentPage
      eyebrow="Zonas de operacion"
      title="Los niveles"
      description="Vaporlock contempla tres niveles. Los detalles visuales y los objetivos especificos se completaran conforme se definan en el desarrollo."
      items={[
        { number: "01", title: "Nivel 1", description: "Incluye al Doctor y el tutorial segun los datos actuales del proyecto." },
        { number: "02", title: "Nivel 2", description: "Incluye a la Tecnocrata, enemigos y el sub-jefe Victoria Ashford." },
        { number: "03", title: "Nivel 3", description: "Incluye a Lucius Corr, el jefe final, ademas de enemigos registrados." },
      ]}
    />
  );
}
