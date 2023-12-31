const MovePlayer = (entities, { touches, events, dispatch }) => {

  let player = entities['player']
  if (player.going) {
    const deg = Number(player.rotate.slice(0, -3))
    player.position = [
      player.position[0] + 1 * Math.cos((deg - 90) * Math.PI / -180),
      player.position[1] - 1 * Math.sin((deg - 90) * Math.PI / -180)
    ];
  }

  if (events.length) {
    //组件角度减去90°乘以-1为实际偏转角度
    //console.log(events)
    let player = entities['player']
    events.forEach((e) => {
      switch (e['action']) {
        case "move-player-rotate":
          const x = e['x']
          const y = e['y']
          let deg = Math.atan2(y, x) / (Math.PI / 180)
          player.rotate = (deg + 90) + 'deg'
          player.position = [
            player.position[0] + 1 * Math.cos((deg - 90) * Math.PI / -180),
            player.position[1] - 1 * Math.sin((deg - 90) * Math.PI / -180)
          ];
          return;
        case "move-player":
          const going = e['going']
          player.going = going
          return
      }
    })
  }



  // let player = entities[0]
  // let originDeg = Number(player.rotate.slice(0, -3))
  // if (events.length) {
  //   //组件角度减去90°乘以-1为实际偏转角度
  //   events.forEach((e) => {
  //     switch (e) {
  //       case "move-up":
  //         if (player && player.position) {
  //           player.position = [
  //             player.position[0] + 50 * Math.cos((originDeg - 90) * Math.PI / -180),
  //             player.position[1] - 50 * Math.sin((originDeg - 90) * Math.PI / -180)
  //           ];
  //         }
  //         return;
  //       case "move-down":
  //         if (player && player.position) {
  //           player.position = [
  //             player.position[0] - 50 * Math.cos((originDeg - 90) * Math.PI / -180),
  //             player.position[1] + 50 * Math.sin((originDeg - 90) * Math.PI / -180)
  //           ];
  //         }
  //         return;
  //       case "move-left":
  //         player.rotate = (originDeg - 5) + 'deg'
  //         console.log(player.rotate, originDeg, 50 * Math.cos(originDeg * 2 * Math.PI / 360),
  //           50 * Math.sin(originDeg * 2 * Math.PI / 360))
  //         return;
  //       case "move-right":
  //         player.rotate = (originDeg + 5) + 'deg'
  //         console.log(player.rotate, originDeg, 50 * Math.cos(originDeg * 2 * Math.PI / 360),
  //           50 * Math.sin(originDeg * 2 * Math.PI / 360))
  //         return;

  //     }
  //   });
  // }


  return entities;
};

export { MovePlayer };