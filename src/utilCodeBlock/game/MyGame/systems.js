const MoveFinger = (entities, { touches, events, dispatch }) => {

  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

  // if (events.length) {
  //   events.forEach((e) => {
  //     let sprite = entities[0]
  //     console.log("wc", sprite, sprite?.position)
  //     switch (e) {
  //       case "move-up":
  //         sprite.position = [
  //           sprite.position[0],
  //           sprite.position[1] - 10
  //         ]
  //         return;
  //       case "move-right":
  //         sprite.position = [
  //           sprite.position[0] + 10,
  //           sprite.position[1]
  //         ]
  //         return;
  //       case "move-down":
  //         sprite.position = [
  //           sprite.position[0],
  //           sprite.position[1] + 10
  //         ]
  //         return;
  //       case "move-left":
  //         sprite.position = [
  //           sprite.position[0] - 10,
  //           sprite.position[1]
  //         ]
  //         return;
  //     };
  //   });
  // };


  touches.filter(t => t.type === "move").forEach(t => {

    let finger = entities[t.id];
    if (finger && finger.position) {
      finger.position = [
        finger.position[0] + t.delta.pageX,
        finger.position[1] + t.delta.pageY
      ];
    }
  });
  return entities;
};

export { MoveFinger };