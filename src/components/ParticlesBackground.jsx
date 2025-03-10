import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#c084fc", "#a855f7", "#7c3aed"],
          },
          links: {
            color: "#a855f7",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 60,
                smooth: 10
              }
            },
            resize: {
              enable: true,
              delay: 0.5,
              density: true
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
                color: "#a855f7"
              }
            }
          },
        },
        background: {
          color: {
            value: "transparent",
          },
        }
      }}
    />
  );
}