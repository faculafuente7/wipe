"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import styles from "./Formulario.module.css";
import Swal from "sweetalert2";
import { RiRestaurantFill, RiTShirtFill, RiStore3Fill, RiRocketFill } from "react-icons/ri";
import { FaClock, FaUtensils, FaChartLine, FaMobileAlt, FaCreditCard } from "react-icons/fa";

export default function QuieroMiSpazio() {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    tipoNegocio: "",
    mensaje: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);

  // Referencias para el scrolleo
  const selectedCategoryRef = useRef(null);
  const continueButtonRef = useRef(null);
  const formStepRef = useRef(null);

  // Categorías de negocio
  const businessCategories = [
    {
      id: "gastronomia",
      icon: <RiRestaurantFill />,
      title: "Gastronomía",
      description: "Digitaliza tu menú y agiliza pedidos"
    },
    {
      id: "indumentaria",
      icon: <RiTShirtFill />,
      title: "Indumentaria",
      description: "Catálogos virtuales para tu marca"
    },
    {
      id: "retail",
      icon: <RiStore3Fill />,
      title: "Comercio",
      description: "Optimiza ventas y gestiona stock"
    },
    {
      id: "otros",
      icon: <RiRocketFill />,
      title: "Otros",
      description: "Soluciones personalizadas"
    }
  ];

  // Textos por categoría
  const categoryContent = {
    gastronomia: {
      title: "Digitalización de Menús para Restaurantes",
      description: "Transforma la experiencia gastronómica de tus clientes con menús digitales interactivos. Actualiza platos, precios y promociones al instante, muestra fotografías de alta calidad e integra sistemas de pedido directo que aumentarán tu ticket promedio.",
      features: ["Escaneo de QR", "Actualizaciones en tiempo real", "Integración con sistemas de pedido", "Analíticas de platos más vistos"]
    },
    indumentaria: {
      title: "Catálogos Digitales para Moda",
      description: "Presenta tus colecciones con un catálogo digital que resalta cada prenda. Permite a tus clientes explorar tallas, colores y disponibilidad desde cualquier lugar, facilitando decisiones de compra rápidas y aumentando tus conversiones.",
      features: ["Fotografías de alta calidad", "Filtros intuitivos", "Guía de talles interactiva", "Notificaciones de restock"]
    },
    retail: {
      title: "Plataformas de E-commerce para Tiendas",
      description: "Lleva tu tienda física al mundo digital con una plataforma de ventas intuitiva y potente. Gestiona inventario, automatiza ventas y ofrece una experiencia de compra fluida que fideliza a tus clientes.",
      features: ["Gestión de inventario", "Procesamiento seguro de pagos", "Seguimiento de pedidos", "Programa de fidelización"]
    },
    otros: {
      title: "Soluciones Digitales a Medida",
      description: "Cada negocio es único. Desarrollamos soluciones personalizadas que se adaptan perfectamente a tu modelo de negocio, optimizando procesos y mejorando la experiencia del cliente en cada punto de contacto.",
      features: ["Análisis personalizado", "Desarrollo a medida", "Integración con sistemas existentes", "Soporte continuo"]
    }
  };

  // Animaciones para la página
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Función para hacer scroll a un elemento con offset
  const scrollToElementWithOffset = (ref, offset = 0) => {
    if (ref.current) {
      const yPosition = ref.current.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({
        top: yPosition,
        behavior: 'smooth'
      });
    }
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Selección de categoría de negocio
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setFormData({ ...formData, tipoNegocio: categoryId });

    // Esperamos a que el estado se actualice y el elemento de descripción se renderice
    setTimeout(() => {
      scrollToElementWithOffset(selectedCategoryRef, -60);
    }, 100);
  };

  // Avanzar al siguiente paso del formulario
  const handleNextStep = () => {
    if (currentStep === 0 && !activeCategory) {
      // Validar que se seleccionó una categoría
      Swal.fire({
        title: 'Selecciona una categoría',
        text: 'Por favor, selecciona el tipo de negocio para continuar.',
        icon: 'info',
        iconColor: '#4FD3FF',
      });
      return;
    }

    setCurrentStep(currentStep + 1);

    // Scroll al formulario después de cambiar de paso

    setTimeout(() => {
      scrollToElementWithOffset(formStepRef, -100);
    }, 100);
  };

  // Retroceder al paso anterior
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quiero-mi-spazio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por tu interés. Un especialista se pondrá en contacto contigo en las próximas 24 horas.',
        icon: 'success',
        iconColor: '#4FD3FF',
        confirmButtonColor: '#0098D4',
        background: '#FFFFFF',
      });

      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        tipoNegocio: "",
        mensaje: ""
      });
      setCurrentStep(0);
      setActiveCategory(null);

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar tu información. Por favor, intenta nuevamente.',
        icon: 'error',
        iconColor: '#FF4F4F',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={styles.mainTitle}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transforma tu Negocio en una Experiencia Digital
          </motion.h1>

          <motion.p
            className={styles.mainDescription}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Potencia tus ventas con soluciones digitales a medida que conectan con tus clientes,
            optimizan procesos y aumentan tus conversiones. Convierte cada interacción en una
            oportunidad de crecimiento.
          </motion.p>

          <motion.div
            className={styles.scrollIndicator}
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <span>Descubre cómo</span>
            <span className={styles.arrow}>↓</span>
          </motion.div>
        </motion.div>

        <div className={styles.heroBackground}>
          <div className={styles.overlay}></div>
          <div className={styles.gradientShape}></div>
        </div>
      </div>

      <div className={styles.formSectionWrapper} ref={formStepRef}>
        <motion.div
          className={styles.formContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2
            className={styles.formTitle}
            variants={itemVariants}
          >
            Inicia tu transformación digital
          </motion.h2>

          <motion.p
            className={styles.formSubtitle}
            variants={itemVariants}
          >
            Completa el formulario y un especialista te contactará para ofrecerte la mejor solución para tu negocio
          </motion.p>

          <div className={styles.formStepsContainer} id="quiero-mi-spazio" // Añadimos la referencia aquí
          >
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                  className={styles.formStep}
                >
                  <h3 className={styles.stepTitle}>¿Cuál es tu tipo de negocio?</h3>

                  <div className={styles.categoriesGrid}>
                    {businessCategories.map((category) => (
                      <motion.div
                        key={category.id}
                        className={`${styles.categoryCard} ${activeCategory === category.id ? styles.activeCategory : ''}`}
                        onClick={() => handleCategorySelect(category.id)}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 152, 212, 0.15)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={styles.categoryIcon}>
                          {category.icon}
                        </div>
                        <h4>{category.title}</h4>
                        <p>{category.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {activeCategory && (
                    <motion.div
                      ref={selectedCategoryRef} // Añadimos la referencia aquí
                      className={styles.selectedCategoryInfo}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>{categoryContent[activeCategory].title}</h4>
                      <p>{categoryContent[activeCategory].description}</p>

                      <motion.ul className={styles.featuresList} variants={staggerItems} initial="hidden" animate="visible">
                        {categoryContent[activeCategory].features.map((feature, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                          >
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}

                  <motion.button
                    ref={continueButtonRef} // Añadimos la referencia aquí
                    className={styles.nextButton}
                    onClick={handleNextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continuar
                  </motion.button>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  id="formStep"
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className={styles.formStep}
                >
                  <h3 className={styles.stepTitle}>Cuéntanos sobre ti</h3>

                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formGrid}>
                      <motion.div
                        className={styles.formField}
                      >
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>

                      <motion.div
                        className={styles.formField}
                      >
                        <label htmlFor="apellido">Apellido</label>
                        <input
                          type="text"
                          id="apellido"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>

                      <motion.div
                        className={styles.formField}
                      >
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>

                      <motion.div
                        className={styles.formField}
                      >
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      className={styles.formField}
                    >
                      <label htmlFor="mensaje">¿Qué tienes en mente para tu proyecto?</label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={4}
                      />
                    </motion.div>

                    <div className={styles.formActions}>
                      <motion.button
                        type="button"
                        className={styles.backButton}
                        onClick={handlePrevStep}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Volver
                      </motion.button>

                      <motion.button
                        type="submit"
                        className={styles.submitButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.stepsIndicator}>
              <span className={currentStep === 0 ? styles.activeStep : ''}></span>
              <span className={currentStep === 1 ? styles.activeStep : ''}></span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
