import React from "react";
import Layout from "../components/layout";
import Container from "../components/container";
import ContactForm from "../components/contactform";
import Header from "../components/header";

export default function contact() {
  return (
    <Layout>
        <Container>
            <Header />
            <ContactForm />
        </Container>
    </Layout>
  );
}