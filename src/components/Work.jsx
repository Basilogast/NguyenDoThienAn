import React from "react";
import { Container } from "react-bootstrap";

import WorkCard from "./WorkCard";

import LYN from "../assets/img/works/LYN.png";
import HP from "../assets/img/works/HP.png";
import OTEKER from "../assets/img/works/workpage/OTEKER/4.1.mp4";
import HONGKONG from "../assets/img/works/HONGKONG.png";
import HONGKONG2 from "../assets/img/works/workpage/HONGKONG/TIKTOK/Hukha.1.mp4";
import CELA from "../assets/img/works/CELA.png";
import DALMORE from "../assets/img/works/DALMORE.png";

import LYNpdf from "../assets/pdf/REPORT KOC _ LYN.pdf";
import HPpdf from "../assets/pdf/THE LAMP X BV HẠNH PHÚC PROPOSAL.pdf";
import HKpdf from "../assets/pdf/Hong Kong MX Moon Cake x The Lamp.pdf";
import CELApdf from "../assets/pdf/CELADON BOULEVARD_DIGITAL PROPOSAL 2024.pdf";
import DALpdf from "../assets/pdf/_Internal_Catalyst_2024.pdf";

export const Work = () => {
  const styles = {
    pin_container: {
      margin: "0 auto",
      padding: 0,
      width: "80vw",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 300px)",
      gridAutoRows: "10px",
      // position: "absolute",
      // left: "50%",
      // transform: "translateX(-50%)",
      justifyContent: "center",
      backgroundColor: "#121212",
    },
  };
  return (
    <section className="work" id="work">
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h2>MY DEDICATED WORKS</h2>
          <hr></hr>
        </div>
        <div style={styles.pin_container}>
          <WorkCard
            size="small"
            img={LYN}
            text="Booking KOLs x LYN"
            pdfUrl={LYNpdf}
            textPara={[
              "+ Book and manage KOL",
              "+ Keep track and monitor project progress",
              "+ Ensure timeline for product air schedules",
              "+ Ensure KOC's product quality meets the requirements from LYN client brief",
              "+ Make sure KOL's posts meet up to KPI commitment and report KOL booking campaign",
            ]}
            detailsRoute=""
          />
          <WorkCard
            size="medium"
            img={HP}
            text="HANH PHUC INTERNATIONAL x THE LAMP"
            pdfUrl={HPpdf}
            textPara={[
              "+ Project leader of social campaign ( Social post, Shooting photo and video clips  + Artworks package )",
              "+ Keep track timeline and quality control of each output of the internal teams ( each content and design output) ",
              "+ Update any client's order, debrief and brief every task for internal team and ensure the quality meet up to client's requirement ",
              "+ Deal, negotiate solve problems and disagreent between client and internal team",
              "+ Manage client's expectation, internal performance",
              "+ Solve team and client's problems with any tasks",
              "+ Deal and negotiate workload and timeline to make sure the smooth progress of the campaign",
              "+ Take responsility to every phase and every works of the campaign",
              "+ Catch up job progress and aware any issues of team to solve and give directions",
            ]}
            detailsRoute="/NguyenDoThienAn/HanhPhucInternational"
          />
          <WorkCard
            size="large"
            img={HONGKONG2}
            text="HONG KONG Mooncake Digital Campaign"
            pdfUrl={HKpdf}
            textPara={[
              "+ Digital campaign - Social Media, Google ads, GDN ads, PR Article, Tiktokers Booking, Community Seeding",
              "+ Create campaign proposal and pitching with MX Hong Kong client ",
              "+ Brief direction for media team, quality control with keyword planning for google ",
              "+ Filter and approach suitable KOL with brand identity and process the campaign with them",
              "+ Order and brief GDN design direction and run ads",
              "+ Work and deal with PR outlets to run 4 articles tp promote MX Hong Kong mooncakes",
              "+ Order, brief internal team and quality control for social media posts",
            ]}
            detailsRoute="/NguyenDoThienAn/HONGKONGMooncake"
          />
          <WorkCard
            size="small"
            img={DALMORE}
            text="DALMORE CATALYST Internal Project"
            pdfUrl={DALpdf}
            textPara={[
              "+ Plan and execute a brand lauching projects as a whiskey brand ",
              "+ Plan and organize new product and brand launch events: bartendar masterclass, consumer masterclass, VIP dinner event",
              "+ Brief ideas and quality control for POSM design and manage productions of stakeholders to ensure the quality ",
            ]}
            detailsRoute=""
          />
          <WorkCard
            size="medium"
            img={OTEKER}
            text="DR. OTEKER x THE LAMP"
            pdfUrl={OTEKER}
            textPara={[
              "+ Project leader of social campaign ( Social post, Shooting photo and video clips  + Artworks package )",
              "+ Keep track timeline and quality control of each output of the internal teams ( each content and design output) ",
              "+ Update any client's order, debrief and brief every task for internal team and ensure the quality meet up to client's requirement ",
              "+ Deal, negotiate solve problems and disagreent between client and internal team",
              "+ Manage client's expectation, internal performance",
              "+ Solve team and client's problems with any tasks",
              "+ Deal and negotiate workload and timeline to make sure the smooth progress of the campaign",
              "+ Take responsility to every phase and every works of the campaign",
              "+ Catch up job progress and aware any issues of team to solve and give directions",
            ]}
            detailsRoute="/NguyenDoThienAn/DrOTEKER"
          />
          <WorkCard
            size="medium"
            img={CELA}
            text="CELADON BOULEVARD Digital Campaign"
            pdfUrl={CELApdf}
            textPara={[
              "+ Work with the internal team to come up with ideas for video shooting and photography contributions, create KPI and distribution plans",
              "+ Quality controls all project outputs: media plan, video shooting script and detailed plan for shooting ",
              "+ Make a report for the project, comment and point out points that need to be improved on the monthly campaign",
              "+ Keep tracking the progress of completing the campaign's KPIs in terms of qualified leads",
              "+ Keep track timeline and quality control of each output of the internal teams ( each content and design output) ",
              "+ Manage client's expectation, internal performance",
              "+ Take responsility to every phase and every works of the campaign ",
              "+ Catch up job progress and aware any issues of team to solve and give directions",
            ]}
            detailsRoute=""
          />
          <WorkCard
            size="small"
            img={HONGKONG}
            text="HONG KONG Mooncake Digital Campaign"
            pdfUrl={HKpdf}
            textPara={[
              "+ Digital campaign - Social Media, Google ads, GDN ads, PR Article, Tiktokers Booking, Community Seeding",
              "+ Create campaign proposal and pitching with MX Hong Kong client ",
              "+ Brief direction for media team, quality control with keyword planning for google ",
              "+ Filter and approach suitable KOL with brand identity and process the campaign with them",
              "+ Order and brief GDN design direction and run ads",
              "+ Work and deal with PR outlets to run 4 articles tp promote MX Hong Kong mooncakes",
              "+ Order, brief internal team and quality control for social media posts",
            ]}
            detailsRoute="/NguyenDoThienAn/HONGKONGMooncake"
          />
        </div>
      </Container>
    </section>
  );
};
