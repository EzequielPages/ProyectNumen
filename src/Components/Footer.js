import React from "react";
// import logo from "../asset/logo.png";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-100 text-base-content">
      <div>
        <img src="{logo}" alt="" />
        <p>Agencia de Viajes Desde 2022</p>
      </div>
      <div>
        <span className="footer-title">Info</span>
        <a href="#" className="link link-hover">
          info@example.com
        </a>
        <a href="#" className="link link-hover">
          750 Brooklyn Street, 88 New York, USA
        </a>
        <a href="#" className="link link-hover">
          666 888 00000
        </a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a href="#" className="link link-hover">
          Sobre nosotros
        </a>
        <a href="#" className="link link-hover">
          Contacto
        </a>
        <a href="#" className="link link-hover">
          Paquetes
        </a>
        <a href="#" className="link link-hover">
          Trabaja con nosotros
        </a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a href="#" className="link link-hover">
          Términos de uso
        </a>
        <a href="#" className="link link-hover">
          Política de privacidad
        </a>
        <a href="#" className="link link-hover">
          Cookies
        </a>
      </div>
    </footer>
  );
};

export default Footer;
