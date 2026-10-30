import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import './RickAndMorty.css';

const API_BASE = import.meta.env.DEV
    ? '/api/rick-and-morty/character'
    : 'https://rickandmortyapi.com/api/character';
const CACHE_TTL = 30 * 60 * 1000;
const RATE_LIMIT_COOLDOWN = 60 * 1000;
const MIN_REQUEST_INTERVAL = 1000;
const CACHE_PREFIX = 'softapp:rick-and-morty:';
const COOLDOWN_KEY = `${CACHE_PREFIX}cooldown`;
let lastApiRequestAt = 0;

const readCachedPage = (key) => {
    try {
        const stored = sessionStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const saveCachedPage = (key, data) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({ ...data, cachedAt: Date.now() }));
    } catch {
        // Continue without the optional session cache if storage is unavailable.
    }
};

const getRateLimitCooldown = () => {
    try {
        return Number(sessionStorage.getItem(COOLDOWN_KEY)) || 0;
    } catch {
        return 0;
    }
};

const setRateLimitCooldown = () => {
    try {
        sessionStorage.setItem(COOLDOWN_KEY, String(Date.now() + RATE_LIMIT_COOLDOWN));
    } catch {
        // The in-memory error state still prevents automatic retries.
    }
};

/**
 * Componente que consume la API de Rick and Morty.
 * Muestra personajes con búsqueda, filtros por estado y paginación.
 */
export const RickAndMorty = () => {
    const pageRef = useRef(null);
    const [characters, setCharacters] = useState([]);
    const [info, setInfo] = useState({ pages: 0, count: 0, next: null, prev: null });
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const forceNextRequest = useRef(false);

    const fetchCharacters = useCallback(async (signal, force = false) => {
        const normalizedSearch = search.trim().toLowerCase();
        const cacheKey = `${CACHE_PREFIX}page:${page}:search:${encodeURIComponent(normalizedSearch)}`;
        const cachedPage = readCachedPage(cacheKey);

        if (cachedPage?.results && cachedPage?.info) {
            setCharacters(cachedPage.results);
            setInfo(cachedPage.info);
            setIsLoading(false);

            if (!force && Date.now() - cachedPage.cachedAt < CACHE_TTL) {
                setError(null);
                return;
            }
        }

        const cooldownUntil = getRateLimitCooldown();
        if (!force && cooldownUntil > Date.now()) {
            setCharacters(cachedPage?.results ?? []);
            setError(cachedPage
                ? 'La API está limitando las consultas. Mostrando los resultados guardados; vuelve a intentar en un minuto.'
                : 'La API está limitando las consultas temporalmente. Espera un minuto y vuelve a intentar.');
            setIsLoading(false);
            return;
        }

        if (force) {
            try {
                sessionStorage.removeItem(COOLDOWN_KEY);
            } catch {
                // Continue with a manual retry if session storage is unavailable.
            }
        }

        try {
            const requestDelay = Math.max(0, lastApiRequestAt + MIN_REQUEST_INTERVAL - Date.now());
            if (requestDelay > 0) {
                await new Promise((resolve) => window.setTimeout(resolve, requestDelay));
            }
            if (signal.aborted) return;
            lastApiRequestAt = Date.now();

            const params = new URLSearchParams({ page: String(page) });
            if (normalizedSearch) params.set('name', search.trim());

            const res = await fetch(`${API_BASE}?${params}`, { signal });
            if (!res.ok) {
                if (res.status === 404) {
                    setCharacters([]);
                    setInfo({ pages: 0, count: 0, next: null, prev: null });
                    setError('No se encontraron personajes con esos filtros.');
                    setIsLoading(false);
                    return;
                }
                const apiError = new Error(`Error ${res.status}`);
                apiError.status = res.status;
                throw apiError;
            }
            const data = await res.json();
            setCharacters(data.results);
            setInfo(data.info);
            saveCachedPage(cacheKey, data);
            setError(null);
        } catch (err) {
            if (err.name === 'AbortError') return;
            const isRateLimited = err.status === 429 || err instanceof TypeError;
            if (isRateLimited) setRateLimitCooldown();
            setCharacters(cachedPage?.results ?? []);
            setError(cachedPage
                ? 'No se pudo actualizar la API. Mostrando los últimos resultados guardados.'
                : isRateLimited
                    ? 'La API está temporalmente ocupada o no disponible. Espera un minuto y vuelve a intentar.'
                    : 'No se pudieron cargar los personajes. Vuelve a intentarlo.');
        } finally {
            if (!signal.aborted) setIsLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        const ctx = gsap.context(() => {
            gsap.from('.features__header > *', {
                y: 35,
                opacity: 0,
                filter: 'blur(8px)',
                stagger: 0.1,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'filter',
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const force = forceNextRequest.current;
        forceNextRequest.current = false;
        const timeoutId = window.setTimeout(() => fetchCharacters(controller.signal, force), 250);
        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [fetchCharacters, retryCount]);

    /** Reinicia a página 1 al cambiar búsqueda */
    const handleSearchChange = (e) => {
        setIsLoading(true);
        setError(null);
        setSearch(e.target.value);
        setPage(1);
    };

    const handleRetry = () => {
        forceNextRequest.current = true;
        setIsLoading(true);
        setError(null);
        setRetryCount((count) => count + 1);
    };

    const statusLabel = (s) => {
        const map = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };
        return map[s] || s;
    };

    const statusDotClass = (s) => {
        const map = { Alive: 'rm-card__dot--alive', Dead: 'rm-card__dot--dead' };
        return map[s] || 'rm-card__dot--unknown';
    };

    return (
        <section className="rm" ref={pageRef}>
            <header className="features__header rm__header">
                <h1 className="rm__title">Rick and Morty</h1>
                <p className="rm__subtitle">
                    Explora los personajes del multiverso. Datos de la{' '}
                    <a
                        href="https://rickandmortyapi.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rm__api-link"
                    >
                        Rick and Morty API
                    </a>
                    .
                </p>
            </header>

            {/* ── Barra de búsqueda ── */}
            <div className="rm__controls">
                <div className="rm__search-wrap">
                    <span className="material-symbols-outlined rm__search-icon" aria-hidden="true">
                        search
                    </span>
                    <input
                        type="text"
                        className="rm__search"
                        placeholder="Buscar personaje…"
                        aria-label="Buscar personajes por nombre"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* ── Contador ── */}
            {!isLoading && !error && (
                <p className="rm__count">
                    {info.count} personaje{info.count !== 1 ? 's' : ''} encontrado{info.count !== 1 ? 's' : ''}
                </p>
            )}

            {/* ── Loading ── */}
            {isLoading && (
                <div className="rm__status">
                    <span className="rm__spinner" />
                    <p>Cargando personajes…</p>
                </div>
            )}

            {/* ── Error ── */}
            {!isLoading && error && (
                <div className="rm__status rm__status--empty" role="alert">
                    <span className="material-symbols-outlined rm__empty-icon" aria-hidden="true">
                        search_off
                    </span>
                    <p>{error}</p>
                    <button type="button" className="rm__page-btn" onClick={handleRetry}>
                        Reintentar
                    </button>
                </div>
            )}

            {/* ── Grid de personajes ── */}
            {!isLoading && characters.length > 0 && (
                <div className="rm__grid" aria-label="Personajes">
                    {characters.map((char) => (
                        <article className="rm-card" key={char.id}>
                            <img
                                className="rm-card__img"
                                src={char.image}
                                alt={char.name}
                                loading="lazy"
                                width={300}
                                height={300}
                            />
                            <div className="rm-card__body">
                                <h2 className="rm-card__name">{char.name}</h2>
                                <p className="rm-card__meta">
                                    <span className={`rm-card__dot ${statusDotClass(char.status)}`} />
                                    {statusLabel(char.status)} — {char.species}
                                </p>
                                <p className="rm-card__location">
                                    <span className="material-symbols-outlined rm-card__loc-icon" aria-hidden="true">
                                        location_on
                                    </span>
                                    {char.location.name}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* ── Paginación ── */}
            {!isLoading && info.pages > 1 && (
                <nav className="rm__pagination" aria-label="Paginación de personajes">
                    <button
                        type="button"
                        className="rm__page-btn"
                        disabled={!info.prev}
                        onClick={() => {
                            setIsLoading(true);
                            setPage((p) => Math.max(1, p - 1));
                        }}
                    >
                        <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                        Anterior
                    </button>

                    <span className="rm__page-info">
                        {page} / {info.pages}
                    </span>

                    <button
                        type="button"
                        className="rm__page-btn"
                        disabled={!info.next}
                        onClick={() => {
                            setIsLoading(true);
                            setPage((p) => p + 1);
                        }}
                    >
                        Siguiente
                        <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                    </button>
                </nav>
            )}
        </section>
    );
};
