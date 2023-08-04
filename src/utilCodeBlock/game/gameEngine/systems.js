const MoveFinger = (entities, { touches }) => {

  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.
  const init = {
    0: 100,
    1: 120,
    2: 140,
    3: 160,
    4: 180,
    5: 200,
    6: 220,
    7: 240,
    8: 260,
    9: 280,
    10: 300,
    11: 320,
    12: 340,
  }


  Object.keys(entities).forEach(e => {

    let finger = entities[e]

    finger.position = [
      finger.position[0] = (init[e]??200) + 100 * Math.cos(finger.rotate),
      finger.position[1] = (init[e]??200) + 100 * Math.sin(finger.rotate)
    ]

    finger.rotate = finger.rotate >= (Math.PI * 20000) ? 0 : (finger.rotate + Math.PI / 32)
 })

  // entities.forEach(element => {

  //   let finger = element

  //   finger.position = [
  //     finger.position[0] = 200 + 100 * Math.cos(finger.rotate),
  //     finger.position[1] = 200 + 100 * Math.sin(finger.rotate)
  //   ]

  //   finger.rotate = finger.rotate + 0.01

  // });



  // touches.filter(t => t.type === "move").forEach(t => {

  //   let finger = entities[t.id];
  //   if (finger && finger.position) {
  //     finger.position = [
  //       finger.position[0] + t.delta.pageX,
  //       finger.position[1] + t.delta.pageY
  //     ];
  //   }
  // });

  return entities;
};

export { MoveFinger };