import ContentPage from "../../../components/layout/ContentPage";

export default function StoryPage() {
  return (
    <ContentPage
      eyebrow="Archivo de Metronia / Historia"
      title="Una ciudad bajo control"
      description="Metronia, año 2943. La tecnologia avanzada y las maquinas de vapor sostienen una ciudad marcada por el poder industrial."
      items={[
        { number: "01", title: "Metronia", description: "Una ciudad industrial futurista donde conviven el vapor y la tecnologia avanzada." },
        { number: "02", title: "Vaporis Industries", description: "La corporacion que Jack Veil debe detener y cuyos suministros de energia debe destruir." },
        { number: "03", title: "La mision", description: "Jack Veil debe enfrentarse a Lucius Corr para salvar Metronia." },
      ]}
    />
  );
}
