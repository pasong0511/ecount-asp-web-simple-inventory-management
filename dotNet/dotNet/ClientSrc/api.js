export const requestGet = async (url) => {
  const res = await fetch(url)

  if (res.ok) {
    const json = await res.json()
    return json
  }

  throw new Error('요청에 실패함')
}

export const requestPost = async (url, data) => {
  const postOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  }
  const res = await fetch(url, postOption)

  if (res.ok) {
    console.log("POST 성공")
    //const json = await res.json()
    return res.ok;
  }

  throw new Error('요청에 실패함')
}