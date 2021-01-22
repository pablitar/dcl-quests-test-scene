import { signedFetch } from "@decentraland/SignedFetch";

const { QuestsClient } = DCLQuests;

const cube = new Entity();

cube.addComponentOrReplace(
  new Transform({
    position: new Vector3(5, 1, 5),
  })
);

const text = new TextShape("Wait for it");
text.billboard = true;
text.isPickable = true;
cube.addComponentOrReplace(text);

engine.addEntity(cube);

executeTask(async () => {
  const client = new QuestsClient({
    baseUrl: "https://quests-api.decentraland.io",
    fetchFn: signedFetch,
  });

  const questsResponse = (await client.getQuests())!;
  if (questsResponse.ok) {
    text.value = `Found ${questsResponse.body.length} quests.${
      questsResponse.body.length
        ? " The first one is called: " + questsResponse.body[0].name
        : ""
    }`;
  } else {
    text.value =
      "Oops. Response was not OK!. It was: " + JSON.stringify(questsResponse);
  }
});
