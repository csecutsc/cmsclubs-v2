import React from "react"
import Layout from "../components/Layout"
import Events from "../sections/Home/Events"
import Landing from "../sections/Home/Landing"

export default function IndexPage() {
  return (
    <Layout title="Home">
      <Landing/>
      <Events/>
    </Layout>
  );
}
