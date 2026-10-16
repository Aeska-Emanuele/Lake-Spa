(() => {
  "use strict";

  // Menu mobile
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (toggle && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";

      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      navigation.classList.toggle("is-open", open);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Ano automático no rodapé
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  // Formulário de voucher
  const voucherForm = document.querySelector("#voucher-form");

  if (voucherForm) {
    voucherForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!voucherForm.reportValidity()) return;

      const formData = new FormData(voucherForm);

      const getValue = (name) => {
        const value = formData.get(name);
        return typeof value === "string" ? value.trim() : "";
      };

      const message = [
        "Olá! Gostaria de solicitar um voucher-presente no Lake Spa.",
        "",
        "DADOS DO COMPRADOR",
        `Nome completo: ${getValue("comprador")}`,
        `WhatsApp: ${getValue("whatsapp_comprador")}`,
        `E-mail: ${getValue("email") || "Não informado"}`,
        "",
        "DADOS DO PRESENTEADO",
        `Nome: ${getValue("presenteado")}`,
        `WhatsApp: ${getValue("whatsapp_presenteado") || "Não informado"}`,
        "",
        "DETALHES DO VOUCHER",
        `Massagem/procedimento: ${getValue("massagem")}`,
        `Forma de entrega: ${getValue("entrega")}`,
        `Ocasião: ${getValue("ocasiao") || "Não informada"}`,
        "",
        "Dedicatória:",
        getValue("dedicatoria") || "Sem dedicatória.",
        "",
        "Gostaria de receber as orientações para confirmar o voucher, o valor e o pagamento.",
        "Estou ciente de que o agendamento deve ser solicitado em até 60 dias e está sujeito à disponibilidade do Spa.",
      ].join("\n");

      const whatsappNumber = "553187996633";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
})();
