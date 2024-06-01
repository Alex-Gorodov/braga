import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Hero } from "../../components/hero/hero";
import { Video } from "../../components/video/video";
import { SwiperClassics } from "../../components/swiper-classics/swiper-classics";
import { SignUp } from "../../components/sign-up/sign-up";

export function HomePage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>Braga | Home</title>
      </Helmet>
      <main className="main">
        <Hero/>
        <Video/>
        <SwiperClassics/>
        <SignUp/>
      </main>
    </Layout>
  );
}
