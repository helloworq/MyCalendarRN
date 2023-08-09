const MoveFinger = (entities, { touches, events, dispatch }) => {

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


  //   Object.keys(entities).forEach(e => {

  //     let finger = entities[e]

  //     finger.position = [
  //       finger.position[0] = (init[e]??200) + 100 * Math.cos(finger.rotate),
  //       finger.position[1] = (init[e]??200) + 100 * Math.sin(finger.rotate)
  //     ]

  //     finger.rotate = finger.rotate >= (Math.PI * 20000) ? 0 : (finger.rotate + Math.PI / 32)
  //  })

  // entities.forEach(element => {

  //   let finger = element

  //   finger.position = [
  //     finger.position[0] = 200 + 100 * Math.cos(finger.rotate),
  //     finger.position[1] = 200 + 100 * Math.sin(finger.rotate)
  //   ]

  //   finger.rotate = finger.rotate + 0.01

  // });



  touches.filter(t => t.type === "move").forEach(t => {

    let finger = entities[1];
    if (finger && finger.position) {
      finger.position = [
        finger.position[0] + t.delta.pageX,
        finger.position[1] + t.delta.pageY
      ];
    }
  });


  
  let player = entities[0]
  let originDeg = Number(player.rotate.slice(0, -3))
  if (events.length) {
    //组件角度减去90°乘以-1为实际偏转角度
    events.forEach((e) => {
      switch (e) {
        case "move-up":
          if (player && player.position) {
            player.position = [
              player.position[0] + 50 * Math.cos((originDeg - 90) * Math.PI / -180),
              player.position[1] - 50 * Math.sin((originDeg - 90) * Math.PI / -180)
            ];
          }
          return;
        case "move-down":
          if (player && player.position) {
            player.position = [
              player.position[0] - 50 * Math.cos((originDeg - 90) * Math.PI / -180),
              player.position[1] + 50 * Math.sin((originDeg - 90) * Math.PI / -180)
            ];
          }
          return;
        case "move-left":
          player.rotate = (originDeg - 5) + 'deg'
          console.log(player.rotate, originDeg, 50 * Math.cos(originDeg * 2 * Math.PI / 360),
            50 * Math.sin(originDeg * 2 * Math.PI / 360))
          return;
        case "move-right":
          player.rotate = (originDeg + 5) + 'deg'
          console.log(player.rotate, originDeg, 50 * Math.cos(originDeg * 2 * Math.PI / 360),
            50 * Math.sin(originDeg * 2 * Math.PI / 360))
          return;

      }
    });
  }


  return entities;
};

export { MoveFinger };