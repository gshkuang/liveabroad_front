import React from "react";
import {
  FootBox,
  Container,
  Row,
  Column,
  FooterLink,
  FootHeading,
} from "../tag_styles";

import "../../index.css";

const Footer = () => {
  return (
    <FootBox>
      <Container>
        <Row>
          <Column>
            <FootHeading>About Us</FootHeading>
            <FooterLink> Vision</FooterLink>
          </Column>
          <Column>
            <FootHeading>Contact Us</FootHeading>
          </Column>
        </Row>
      </Container>
    </FootBox>
  );
};
export default Footer;
