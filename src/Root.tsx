import { TecnicasComposicoes } from "../tecnicas/composicoes";
import { CertiComposicoes } from "../design-systems/certi/composicoes";
import { CFDesignerComposicoes } from "../design-systems/cfdesigner/composicoes";
import { TiagoLemos01Composicoes } from "../design-systems/tiago-lemos-01/composicoes";
import { ArrastaIlhaComposicoes } from "../design-systems/arrasta-ilha/composicoes";
import { Producoes } from "../producoes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Um bloco por design system (exemplos de referência) */}
      <CFDesignerComposicoes />
      <CertiComposicoes />
      <TiagoLemos01Composicoes />
      <ArrastaIlhaComposicoes />
      {/* Exemplos das técnicas gerais */}
      <TecnicasComposicoes />
      {/* Produções de verdade */}
      <Producoes />
    </>
  );
};
