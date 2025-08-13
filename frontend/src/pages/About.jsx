import React from "react";

export default function About() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto text-gray-800">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6">About</h1>

        {/* Intro */}
        <p className="mb-6 leading-relaxed">
          Bilal is a proficient full stack developer with a robust skill set spanning both
          front-end and back-end technologies. With a passion for building dynamic,
          responsive, and user-friendly web applications, Bilal excels in crafting
          seamless digital experiences.
        </p>

        {/* Technical Expertise */}
        <h2 className="text-xl font-semibold text-blue-500 mb-2">
          Technical Expertise:
        </h2>
        <p className="mb-6 leading-relaxed">
          <strong>Front-End:</strong> Adept in modern JavaScript frameworks and
          libraries such as React.js, Angular, and Vue.js. Skilled in HTML5, CSS3,
          and responsive design principles to create intuitive and visually appealing
          interfaces.{" "}
          <strong>Back-End:</strong> Proficient in server-side technologies including
          Node.js, Express.js, and Django. Experienced with database management
          using SQL and NoSQL databases like MySQL, PostgreSQL, and MongoDB.{" "}
          <strong>DevOps:</strong> Knowledgeable in containerization and orchestration
          tools such as Docker and Kubernetes. Familiar with continuous integration
          and deployment (CI/CD) pipelines.{" "}
          <strong>Cloud Services:</strong> Experienced with platforms like AWS, Azure,
          and Google Cloud, enabling scalable and reliable application deployment.
        </p>

        {/* Professional Highlights */}
        <h2 className="text-xl font-semibold text-blue-500 mb-2">
          Professional Highlights:
        </h2>
        <p className="mb-4 leading-relaxed">
          Successfully developed and deployed numerous full-stack applications,
          demonstrating strong problem-solving skills and a keen eye for detail.
          Collaborated with cross-functional teams to deliver high-quality software
          solutions within tight deadlines. Continuously learning and adapting to
          emerging technologies and industry trends to stay ahead in the
          fast-evolving tech landscape.
        </p>
        <p className="mb-6 italic font-medium">
          Bilal is dedicated to leveraging his expertise to contribute to innovative
          projects and drive technological advancements. Whether working on
          front-end interfaces or back-end logic, he is passionate about delivering
          exceptional digital solutions that meet user needs and exceed client
          expectations.
        </p>

        {/* Personal Interests */}
        <h2 className="text-xl font-semibold text-blue-500 mb-2">
          Personal Interests and Inspiration:
        </h2>
        <p className="leading-relaxed">
          Beyond his professional achievements, Bilal is a big fan of cricket and holds
          immense admiration for King Kohli. His favorite person and biggest inspiration
          is his twin brother, Ankush. Their friendly rivalry and deep bond have
          significantly shaped Bilal’s journey. Ankush is not only a great competitor
          but also a steadfast friend, constantly motivating Bilal to strive for
          excellence.
        </p>
      </div>
    </section>
  );
}
