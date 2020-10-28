import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";
import defaultLogo from "./default-logo.png";

function CompanyCard({ item = {}, apply = () => null, idx }) {
  if (item.handle) {
    const { name, description, logo_url, handle } = item;
    return (
        <div className="company__card">
          <Link to={`/companies/${handle}`}>
          <h6 className="company__name">
            <span>{name}</span>
            <img className="company__logo" src={ defaultLogo || logo_url } alt=""/>
          </h6>
          </Link>
          <p className="company__description">{description}</p>
        </div>
    );
  } 
}

export default CompanyCard;
