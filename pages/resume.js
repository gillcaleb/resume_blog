import React from "react";
import Layout from "../components/layout";
import Container from "../components/container";
import Experience from "../components/experience";
import Header from "../components/header";

export default function Resume() {
  return (
    <Layout>
    
    <Container title="Caleb Gill experience">
      <Header />
      <Experience />
    </Container>
    </Layout>
  );
}