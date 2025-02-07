import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export const StarfieldBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="starfield"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false
            }
          },
          size: {
            value: { min: 0.5, max: 1.5 },
            animation: {
              enable: true,
              speed: 0.3,
              sync: false,
              minimumValue: 0.3
            }
          },
          move: {
            enable: false
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 0.8
            }
          }
        },
        emitters: [
          {
            direction: "right",
            position: { x: 0, y: 25 },
            rate: { delay: 2, quantity: 1 },
            size: { width: 0, height: 50 },
            life: { duration: 0, count: 0 },
            particles: {
              move: {
                enable: true,
                speed: 70,
                direction: "right",
                straight: true,
                outModes: { default: "out" }
              },
              opacity: {
                value: 1
              },
              size: {
                value: 2
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle"
              },
              life: {
                duration: {
                  sync: true,
                  value: 3
                }
              },
              trail: {
                enable: true,
                length: 30,
                fillColor: "#000000"
              }
            }
          },
          {
            direction: "right",
            position: { x: 0, y: 50 },
            rate: { delay: 3, quantity: 1 },
            size: { width: 0, height: 50 },
            life: { duration: 0, count: 0 },
            particles: {
              move: {
                enable: true,
                speed: 90,
                direction: "right",
                straight: true,
                outModes: { default: "out" }
              },
              opacity: {
                value: 1
              },
              size: {
                value: 2.5
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle"
              },
              life: {
                duration: {
                  sync: true,
                  value: 3
                }
              },
              trail: {
                enable: true,
                length: 40,
                fillColor: "#000000"
              }
            }
          },
          {
            direction: "right",
            position: { x: 0, y: 75 },
            rate: { delay: 4, quantity: 1 },
            size: { width: 0, height: 50 },
            life: { duration: 0, count: 0 },
            particles: {
              move: {
                enable: true,
                speed: 80,
                direction: "right",
                straight: true,
                outModes: { default: "out" }
              },
              opacity: {
                value: 1
              },
              size: {
                value: 2
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle"
              },
              life: {
                duration: {
                  sync: true,
                  value: 3
                }
              },
              trail: {
                enable: true,
                length: 35,
                fillColor: "#000000"
              }
            }
          }
        ],
        detectRetina: true
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1
      }}
    />
  );
};