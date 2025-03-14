import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css/Contac.css";

function Contactos() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Ensure effect runs when location changes

  const [formData, setFormData] = useState({
    correo: "",
    name: "",
    phone: "",
    consulta: "",
  });

  const [errors, setErrors] = useState({});
  const language = localStorage.getItem("language") || "0";

  const translations = {
    "0": {
      Contactenos: "Contáctenos",
      correo: "Correo:",
      name: "Nombre o Empresa:",
      phone: "Teléfono:",
      consulta: "Consulta:",
      Enviar: "Enviar",
    },
    "1": {
      Contactenos: "Contact Us",
      correo: "Email:",
      name: "Name or Company:",
      phone: "Phone:",
      consulta: "Consultation:",
      Enviar: "Send",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.correo.trim()) newErrors.correo = "El correo es requerido.";
    if (!formData.name.trim()) newErrors.name = "Nombre o empresa es requerido.";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono es requerido.";
    if (!formData.consulta.trim()) newErrors.consulta = "Consulta es requerida.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = { ...formData, header: "Consulta" };

      try {
        const response = await fetch("http://127.0.0.1:5001/consulta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("Formulario enviado con éxito!");
          setFormData({ correo: "", name: "", phone: "", consulta: "" });
        } else {
          const errorData = await response.json();
          alert("Error al enviar: " + errorData.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al enviar el formulario.");
      }
    }
  };

  return (
    <div className="con">
      <h1>{translations[language].Contactenos}</h1>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{translations[language][key]}</label>
            {key === "consulta" ? (
              <textarea
                rows="6"
                name={key}
                id={key}
                value={value}
                onChange={handleChange}
                placeholder={translations[language][key]}
              />
            ) : (
              <input
                name={key}
                id={key}
                value={value}
                onChange={handleChange}
                placeholder={translations[language][key]}
              />
            )}
            {errors[key] && <p className="error">{errors[key]}</p>}
          </div>
        ))}
        <button type="submit">{translations[language].Enviar}</button>
      </form>
    </div>
  );
}

export default Contactos;
