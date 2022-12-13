function About (){

  return (
    <>
    <div className='about-container main-bg'>
      <p className='about-header md:pt-4'>About Meet N Eat</p>
      <p className='about-text pt-2'>Our group project application, for which we built our first version during our Software Engineering Intensive program at General Assembly, we utilized the Scrum methodology, assigning roles of Product Owner, Scrum Master and Development representatives to each of our project members. We completed our first version in less than two weeks, which included 3 sprints - one to build the backend, one to build the frontend functionalities and one to complete styling. <br/><br/>

      <p className='font-bold'>Although we passed not only the project's MVP set by our program's guidelines, but also a few of our own stretch goals, we were eager to further improve our application and see our own skills as fullstack software engineers to its fullest potential.</p><br/><br/> 
      
      Thus, after the program ended, we first identified the frontend functionality and backend inefficiencies we did not have time to work on during our time at General Assembly and essentially began from scratch. Although we all had different schedules and oftentimes were in completely different timezones, we maintained the Scrum methodology and contributed our time and skills to build this application. <br/><br/> In total, we worked for over 6 weeks, compartmentalized by 3 sprints, with bi-weekly, if not daily, standup Zoom calls and continous Slack communication.<br/><br/>
      Our general approach after the program ended was asking ourselves, <i>"What is missing? What do we need to fix?"</i> <br/><br/>
      <p className='font-bold'>Ultimately, however, our approach to all of these questions relied on teamwork and each member's hard work and dedication to enhance our project.<br/><br/>

      We are grateful for this experience and hope you all get to enjoy Meet N' Eat.</p><br/><br/>
      </p>
      <div className='flex flex-row justify-center'>
        <div className='frontend px-20'>
          <a href='https://github.com/Meet-N-Eat/Frontend'>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Github Repository' width='60' className='frontend-github-icon'/>
            <img src='https://i.ibb.co/GsYJJyK/frontend-github.png' alt='Github Repository' width='60' className='frontend-github-icon2'/>
          </a>
        </div>
        <div className='backend px-20'>
          <a href='https://github.com/Meet-N-Eat/Backend'>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Github Repository' width='60' className='backend-github-icon'/>
            <img src='https://i.ibb.co/pr8FSqy/backend-github.png' alt='Github Repository' width='60' className='backend-github-icon2'/>
          </a>
        </div>
      </div>
    </div>
    <div className='about-footer-bg absolute inset-x-0 bottom-0 text-center about-header'>
      <div className='py-4 flex flex-row justify-evenly'>
        <p className='about-footer-text'>
          <a className='about-links'href='https://github.com/andrewretherford'>Andrew Retheford</a>
        </p> 
        <p className='about-header text-white'> + </p>
        <p className='about-footer-text'>
          <a className='about-links' href='https://github.com/aimeemisaki'>Aimee Misaki</a>
        </p>
        <p className='about-header text-white'> + </p>
        <p className='about-footer-text'>
          <a className='about-links' href='https://github.com/DavidJoao'>David Sandoval</a>
        </p>
      </div>
    </div>
    </>
  );
};

export default About;
