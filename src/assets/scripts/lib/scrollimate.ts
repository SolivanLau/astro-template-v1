/**
 * Given an HTMLElement, returns an object containing all
 * "data-scrollimate-*" attributes as key-value pairs. "data-scrollimate-" is
 * stripped from the attribute name.
 * @param {HTMLElement} element
 * @returns {Object<string, string>}
 */
const getOptions = (element: HTMLElement): { [key: string]: string } => {
    let options = element
        .getAttributeNames()
        .filter((attribute) => attribute.startsWith("data-scrollimate-"))
        .reduce(
            (acc, name) => {
                const key = name.replace("data-scrollimate-", "");
                acc[key] = element.getAttribute(name);
                return acc;
            },
            {} as { [key: string]: string },
        );

    console.log(options);
    return options;
};

const scrollimateObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            // retreive additional options
            const element = entry.target as HTMLElement;
            const options = getOptions(element);

            // animate with options
            if (options) {
                for (const option in options) {
                    if (option) {
                        element.style.setProperty(`--_${option}`, options[option]);
                    }
                }
            }

            // animate without options
            entry.target.classList.toggle("animate", entry.isIntersecting);

            // unobserve after animation
            if (entry.isIntersecting) {
                scrollimateObserver.unobserve(entry.target);
            }
        });
    },
    {
        rootMargin: "-100px 0px",
    },
);

/**
 * Initializes all elements with the "data-scrollimate" attribute
 * with the intersection observer. This should be called after
 * DOM has been loaded.
 */
export const scrollimateInit = () => {
    const scrollElements = document.querySelectorAll(
        "[data-scrollimate]",
    ) as NodeListOf<HTMLElement>;

    scrollElements.forEach((element) => {
        scrollimateObserver.observe(element);
    });
};
