import { PortfolioExperience } from "./immersive/PortfolioExperience";
import { portfolio } from "./immersive/content";

export default function Home() {
  return <PortfolioExperience content={portfolio} />;
}