
async function apiFetch(url, options={}) {
    const response = await fetch(
        "/api" + url, {
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            ...options
        }
    );

    if (response.status === 401) {
        const data = await response.json();
        alert("You have to login again because of the following reason: " + data.detail);
        localStorage.removeItem("jwt");
        window.dispatchEvent(new CustomEvent("jwtChange", localStorage.getItem("jwt")));
    }

    return response;
}

export default apiFetch;