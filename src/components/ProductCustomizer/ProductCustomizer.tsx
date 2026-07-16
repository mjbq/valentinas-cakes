import { useEffect, useState } from "react";
import type { ProductCustomization } from "../../types";

import {
  sizes,
  cakes,
  fillings,
  frostings,
  decorations,
} from "../../data/customizations";

import "./ProductCustomizer.css";

interface Props {
  basePrice: number;
  onChange: (customization: ProductCustomization) => void;
}

export default function ProductCustomizer({
  basePrice,
  onChange,
}: Props) {

  const [size, setSize] = useState(sizes[0]);

  const [cake, setCake] = useState(cakes[0]);

  const [frosting, setFrosting] = useState(frostings[0]);

  const [selectedFillings, setSelectedFillings] =
    useState<string[]>([]);

  const [selectedDecorations, setSelectedDecorations] =
    useState<string[]>([]);

  const [message, setMessage] = useState("");

  function handleFillings(item: string) {

    setSelectedFillings((prev) =>
      prev.includes(item)
        ? prev.filter((f) => f !== item)
        : [...prev, item]
    );

  }

  function handleDecorations(item: string) {

    setSelectedDecorations((prev) =>
      prev.includes(item)
        ? prev.filter((d) => d !== item)
        : [...prev, item]
    );

  }

  const fillingsExtra = fillings
    .filter((f) => selectedFillings.includes(f.name))
    .reduce((total, item) => total + item.extra, 0);

  const decorationsExtra = decorations
    .filter((d) => selectedDecorations.includes(d.name))
    .reduce((total, item) => total + item.extra, 0);

  const extras =
    size.extra +
    frosting.extra +
    fillingsExtra +
    decorationsExtra;

  const total = basePrice + extras;

  useEffect(() => {

    onChange({

      size: size.name,

      cake,

      fillings: selectedFillings,

      frosting: frosting.name,

      decorations: selectedDecorations,

      message,

      extraPrice: extras,

      totalPrice: total,

    });

  }, [

    size,

    cake,

    frosting,

    selectedFillings,

    selectedDecorations,

    message,

    extras,

    total,

    onChange,

  ]);

  return (
    <div className="customizer">

      <h3>🎂 Personaliza tu torta</h3>

      {/* Tamaño */}

      <div className="customizer-section">

        <h4>Tamaño</h4>

        {sizes.map((item) => (

          <label
            key={item.id}
            className="customizer-option"
          >

            <input
              type="radio"
              checked={size.id === item.id}
              onChange={() => setSize(item)}
            />

            <span>{item.name}</span>

            {item.extra > 0 && (
              <strong>
                (+${item.extra.toLocaleString("es-CL")})
              </strong>
            )}

          </label>

        ))}

      </div>

      {/* Bizcocho */}

      <div className="customizer-section">

        <h4>Bizcocho</h4>

        <select
          value={cake}
          onChange={(e) => setCake(e.target.value)}
        >

          {cakes.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

      {/* Rellenos */}

      <div className="customizer-section">

        <h4>Rellenos</h4>

        {fillings.map((item) => (

          <label
            key={item.name}
            className="customizer-option"
          >

            <input
              type="checkbox"
              checked={selectedFillings.includes(item.name)}
              onChange={() => handleFillings(item.name)}
            />

            <span>{item.name}</span>

            {item.extra > 0 && (
              <strong>
                (+${item.extra.toLocaleString("es-CL")})
              </strong>
            )}

          </label>

        ))}

      </div>

      {/* Cobertura */}

      <div className="customizer-section">

        <h4>Cobertura</h4>

        <select
          value={frosting.name}
          onChange={(e) =>
            setFrosting(
              frostings.find(
                (f) => f.name === e.target.value
              )!
            )
          }
        >

          {frostings.map((item) => (

            <option
              key={item.name}
              value={item.name}
            >

              {item.name}

              {item.extra > 0
                ? ` (+$${item.extra.toLocaleString("es-CL")})`
                : ""}

            </option>

          ))}

        </select>

      </div>

      {/* Decoraciones */}

      <div className="customizer-section">

        <h4>Decoración</h4>

        {decorations.map((item) => (

          <label
            key={item.name}
            className="customizer-option"
          >

            <input
              type="checkbox"
              checked={selectedDecorations.includes(item.name)}
              onChange={() => handleDecorations(item.name)}
            />

            <span>{item.name}</span>

            {item.extra > 0 && (
              <strong>
                (+${item.extra.toLocaleString("es-CL")})
              </strong>
            )}

          </label>

        ))}

      </div>

      {/* Mensaje */}

      <div className="customizer-section">

        <h4>Mensaje para la torta</h4>

        <textarea
          rows={3}
          maxLength={50}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ejemplo: Feliz Cumpleaños Sofía"
        />

        <small>
          {message.length}/50 caracteres
        </small>

      </div>

      {/* Resumen */}

      <div className="customizer-total">

        <hr />

        <div className="customizer-total__row">

          <span>Precio base</span>

          <strong>
            ${basePrice.toLocaleString("es-CL")}
          </strong>

        </div>

        <div className="customizer-total__row">

          <span>Extras</span>

          <strong>
            +${extras.toLocaleString("es-CL")}
          </strong>

        </div>

        <div className="customizer-total__final">

          <span>Total</span>

          <span>
            ${total.toLocaleString("es-CL")}
          </span>

        </div>

      </div>

    </div>

  );

}