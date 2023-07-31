<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js" integrity="sha512-5T245ZTH0m0RfONiFm2NF0zcYcmAuNzcGyPSQ18j8Bs5Pbfhp5HP1hosrR8XRt5M3kSRqzjNMYpm2+it/AUX/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
  const matterContainer = document.querySelector("#matter-container");
  const THICCNESS = 60;

  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
      width: matterContainer.clientWidth,
      height: matterContainer.clientHeight,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false
    }
  });

 const logos = [];
     const logoUrls = [
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dcc7e8881a747c088b9_Logo23.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dca430c26ba903b17c8_Logo3.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc92e7f5a3fc405c31b_Logo27.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc915c87ee31424f5ec_Logo29.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc9c9bbb755cfbdc477_Logo4.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc92b95cbe3c8420cb4_Logo22.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc982cf9a4e32bee3bc_Logo1.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc94f9a861231195a9e_Logo21.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc94f9a861231195a92_Logo18.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc97f78b88b6bc24870_Logo2.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc915c87ee31424f5b2_Logo28.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc9a5eb283bf8d2e870_Logo26.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc9eb3cf3352c15aa71_Logo24.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc854758da2a484fa2e_Logo25.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc818eba68e764ac149_Logo20.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc8ca2218b2bcc9a8ee_Logo19.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc815575b6b3c80547d_Logo17.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc74aa4f4832e5116b8_Logo16.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc72e7f5a3fc405c0c3_Logo15.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc7fab01d2aed83e78a_Logo14.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc77a8f4e5e30ee3bb7_Logo13.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc745e0b0129d6a3f83_Logo11.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc7bf2b6e07020691ec_Logo12.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc70f7c89e6a5e60cb3_Logo10.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc7eb6b5f7302c498ce_Logo9.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc7fab01d2aed83e731_Logo7.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc756896cdab21dd616_Logo8.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc789b53647d82ee5c6_Logo6.svg",
      "https://uploads-ssl.webflow.com/64bfd4acc2f4948a787efd23/64c10dc754758da2a484f95d_Logo5.svg"
    ];
  for (let i = 0; i < logoUrls.length; i++) {
    const x = Math.random() * (matterContainer.clientWidth - 88.91);
    const y = Math.random() * (matterContainer.clientHeight - 88.91);

    const logo = Bodies.rectangle(x, y, 88.91, 88.91, {
      isStatic: false,
      restitution: 0.5,
      frictionAir: 0.05
    });

    logo.render.sprite.texture = logoUrls[i];
    logos.push(logo);
    Composite.add(engine.world, logo);
  }

  var ground = Bodies.rectangle(
    matterContainer.clientWidth / 2,
    matterContainer.clientHeight + THICCNESS / 2,
    27184,
    THICCNESS,
    { isStatic: true }
  );

  let leftWall = Bodies.rectangle(
    0 - THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    {
      isStatic: true
    }
  );

  let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + THICCNESS / 2,
    matterContainer.clientHeight / 2,
    THICCNESS,
    matterContainer.clientHeight * 5,
    { isStatic: true }
  );

  Composite.add(engine.world, [ground, leftWall, rightWall]);

  let mouse = Matter.Mouse.create(render.canvas);
  let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.5,
      render: {
        visible: false
      }
    }
  });

  Composite.add(engine.world, mouseConstraint);

  Events.on(engine, "beforeUpdate", function() {
    const mousePosition = mouse.position;

    logos.forEach(logo => {
      const distance = Matter.Vector.magnitude(
        Matter.Vector.sub(logo.position, mousePosition)
      );

      // Apply repulsive force based on distance from the mouse
      const forceMagnitude = 0.0300 * (logo.area / Math.pow(distance, 2));
      const force = Matter.Vector.mult(
        Matter.Vector.normalise(Matter.Vector.sub(logo.position, mousePosition)),
        forceMagnitude
      );

      Matter.Body.applyForce(logo, logo.position, force);
    });
  });

  mouseConstraint.mouse.element.removeEventListener(
    "mousewheel",
    mouseConstraint.mouse.mousewheel
  );
  mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
  );

  Render.run(render);

  var runner = Runner.create();

  Runner.run(runner, engine);

  function handleResize(matterContainer) {
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.height = matterContainer.clientHeight;

    Matter.Body.setPosition(
      ground,
      Matter.Vector.create(
        matterContainer.clientWidth / 2,
        matterContainer.clientHeight + THICCNESS / 2
      )
    );

    Matter.Body.setPosition(
      rightWall,
      Matter.Vector.create(
        matterContainer.clientWidth + THICCNESS / 2,
        matterContainer.clientHeight / 2
      )
    );
  }

  window.addEventListener("resize", () => handleResize(matterContainer));
</script>
