/**
 * Genera la URL de la imagen del avatar usando la API de Imgur.
 *
 * @param {Object} person - Objeto con los datos de la persona científica.
 * @param {string} person.imageId - Identificador de la imagen en Imgur.
 * @param {number|string} [size='s'] - Tamaño en píxeles o sufijo de tamaño ('s' o 'b').
 * @returns {string} URL pública y accesible de la imagen.
 */
const getImageUrl = (person, size = 's') => {
    const sizeSuffix = typeof size === 'number' ? (size < 90 ? 's' : 'b') : size;
    return `https://i.imgur.com/${person.imageId}${sizeSuffix}.jpg`;
};

export const Avatar = ({ person, size = 100 }) => {
    return (
        <img
            className="avatar"
            src={getImageUrl(person, size)}
            alt={person.name}
            width={size}
            height={size}
            loading="lazy"
        />
    );
};

const scientists = [
    { name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' },
    { name: 'Aklilu Lemma', imageId: 'OKS67lh' },
    { name: 'Lin Lanying', imageId: '1bX5QH6' },
];

const Props = () => {
    return (
        <div className="props-bento-grid">
            {scientists.map((person) => (
                <article className="props-bento-card" key={person.name}>
                    <div className="props-bento-card__avatar-wrap">
                        <Avatar person={person} size={100} />
                    </div>
                    <span className="props-bento-card__name">{person.name}</span>
                </article>
            ))}
        </div>
    );
};

export default Props;
export { Props, Props as Profile };
