
async function apiFetch(url, options={}) {
    const response = await fetch(
        "/api" + url, {
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json"
            },
            ...options
        }
    );

    if (response.status === 401) {
        localStorage.removeItem("jwt");
        window.dispatchEvent(new CustomEvent("jwtChange", localStorage.getItem("jwt")));
    }

    return response;
}

export default apiFetch;