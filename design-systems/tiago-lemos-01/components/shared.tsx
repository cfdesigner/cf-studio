import React from "react";
import { colors, ouroGradiente } from "../tokens";
import "../fonts";

/** Texto com *palavra* em ouro (degradê). Ex.: "MAIS *INSANA*". */
export const Rico: React.FC<{ texto: string }> = ({ texto }) => (
  <>
    {texto.split(/(\*[^*]+\*)/g).map((parte, i) =>
      parte.startsWith("*") ? (
        <span
          key={i}
          style={{
            background: ouroGradiente,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {parte.slice(1, -1)}
        </span>
      ) : (
        <React.Fragment key={i}>{parte}</React.Fragment>
      ),
    )}
  </>
);

export const semMarcas = (t: string) => t.replace(/\*/g, "");

/** Cor padrão do texto branco. */
export const branco = colors.branco;
