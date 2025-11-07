async function askTheOracle(question) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=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",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }),
    }
  );
  return (await response.json()).candidates[0].content.parts[0].text.trim();
}

async function getItemsClasses(items) {
  let classesJson = await askTheOracle(
    `Dados os itens de compra "${JSON.stringify(
      items
    )}", classifique-o em uma das seguintes categorias: "Alimentos", "Bebidas", "Limpeza", "Higiene", "Outros". Retorne um array de objetos com as propriedades "id" e "category" e também um emoji dentro da categoria representando sua categoria, como emoji de vinho para bebidas. Retorne apenas o array em formato JSON, sem explicações adicionais e nenhuma estilização ou formatação de markdown, apenas o JSON como string. Exemplo: [{"id": 1, "category": "Alimentos"}, {"id": 2, "category": "Bebidas"}]`
  );
  if (classesJson.startsWith("```json")) {
    classesJson = classesJson.slice(7, -3); // Remove the ```json and ``` at the end
  }
  return JSON.parse(classesJson);
}

export default getItemsClasses;

function teste() {
  const items = [
    { id: 1, name: "Arroz" },
    { id: 2, name: "Feijão" },
    { id: 3, name: "Sabão em pó" },
    { id: 4, name: "Shampoo" },
  ];
  getItemsClasses(items).then(console.log);
}

teste();
