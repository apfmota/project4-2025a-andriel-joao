async function askTheOracle(question) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
            "messages": [
                {
                    "role": "user",
                    "content": question
                }
            ]
        })
    })
    return (await response.json()).choices[0].message.content;
}

async function classifyItem(item) {
    const response = await askTheOracle(`Dado o item de compra "${item}", classifique-o em uma das seguintes categorias: "Alimentos", "Bebidas", "Limpeza", "Higiene", "Outros". Não retorne nada além da categoria, sem explicações, justificativas ou estilização. Apenas a categoria.`);
    console.log(`Item: "${item}" - Categoria: "${response}"`);
}

export default classifyItem;