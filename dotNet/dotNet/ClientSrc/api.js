export const requestGet = async (url) => {
    const res = await fetch(url);

    if (res.ok) {
        const json = await res.json();
        return json;
    }

    throw new Error("요청에 실패함");
};

export const requestGetToState = async (url) => {
    const res = await fetch(url);

    if (res.ok) {
        return res;
    }

    throw new Error("요청에 실패함");
};

export const requestPost = async (url, data) => {
    const postOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, postOption);

    if (res.ok) {
        return res;
    }

    throw new Error("요청에 실패함");
};

export const requestPostToJson = async (url, data) => {
    const postOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, postOption);

    if (res.ok) {
        const json = await res.json();
        return json;
    }

    throw new Error("요청에 실패함");
};

export const requestDelete = async (url, data) => {
    const postOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, postOption);

    if (res.ok) {
        return res;
    }

    throw new Error("요청에 실패함");
};
