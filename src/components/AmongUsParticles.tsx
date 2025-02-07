import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function AmongUsParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  return (
    <>
      {/* Static Stars Layer */}
      <Particles
        id="stars"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0"
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0
          },
          background: {
            color: {
              value: "transparent"
            }
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            number: {
              value: 100,
              density: {
                enable: true,
                area: 800,
              },
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.3, max: 1 },
            },
            size: {
              value: { min: 1, max: 3 },
            },
            move: {
              enable: false,
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1
              }
            }
          },
          detectRetina: true
        }}
      />

      {/* Among Us Characters Layer */}
      <Particles
        id="amongus"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0"
        options={{
          fullScreen: {
            enable: false,
            zIndex: -1
          },
          background: {
            color: {
              value: "transparent"
            }
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 10,
              density: {
                enable: true,
                area: 800
              }
            },
            shape: {
              type: ["image"],
              image: [
                {
                  src: "https://particles.js.org/images/amongus_red.png",
                  width: 32,
                  height: 32
                },
                {
                  src: "https://particles.js.org/images/amongus_blue.png",
                  width: 32,
                  height: 32
                },
                {
                  src: "https://particles.js.org/images/amongus_green.png",
                  width: 32,
                  height: 32
                }
              ]
            },
            size: {
              value: 32,
              animation: {
                enable: false
              }
            },
            move: {
              enable: true,
              speed: 2,
              direction: "right",
              random: false,
              straight: true,
              outModes: {
                default: "out",
                right: "wrap",
                left: "wrap"
              }
            },
            rotate: {
              value: {
                min: 0,
                max: 360
              },
              direction: "random",
              animation: {
                enable: true,
                speed: 5
              }
            }
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              }
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4
              }
            }
          },
          detectRetina: true
        }}
      />
    </>
  );
}