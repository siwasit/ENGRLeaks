    'use client';
    import { useCallback, useEffect, useMemo, useState } from "react";
    import Particles, { initParticlesEngine } from "@tsparticles/react";

    import {
        type Container,
        type ISourceOptions,
        MoveDirection,
        OutMode,
    } from "@tsparticles/engine";
    // import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
    // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
    import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
    // import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

    const ParticlesComponent = () => {
        const options = useMemo(() => {
            return {
                background: {
                    color: {
                        value: "#000000000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: MoveDirection.none,
                        enable: true,
                        outModes: {
                            default: OutMode.out,
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true
            }
        }, []);

        useEffect(() => {
            initParticlesEngine(async (engine) => {
                await loadSlim(engine);
            });
        }, []);

        return (
            <div className="particle-container absolute inset-0 z-[-10]" style={{
                pointerEvents: 'none', // This will make the element ignore pointer events
            }} >
                <Particles options={options} />
            </div>
        );

    };

    export default ParticlesComponent;
