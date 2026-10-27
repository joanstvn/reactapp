import React from 'react';

export const RickAndMorty = () => {
    return (
        <main
            style={{
                padding: 'clamp(100px, 12vh, 130px) 24px clamp(80px, 10vh, 120px)',
                maxWidth: '1180px',
                margin: '0 auto',
                minHeight: '80vh',
            }}
        >
            <header className="features__header" style={{ marginBottom: '2rem' }}>
                <h1
                    style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: 'var(--color-ink, #0f172a)',
                    }}
                >
                    Rick and Morty
                </h1>
                <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
                    Explora los personajes y episodios de Rick and Morty.
                </p>
            </header>
        </main>
    );
};
