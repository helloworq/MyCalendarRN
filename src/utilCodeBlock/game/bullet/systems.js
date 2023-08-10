const MoveBullet = (entities, { touches, events, dispatch }) => {

    if (events.length) {
        let player = entities['player']

        events.forEach((e) => {
            switch (e['action']) {
                case "shoot":
                    //根据射击角度生成一个子弹
                    let playerRotate = player.rotate
                    let playerPosition = player.position
                    let bullets = entities['bullet'].position
                    let maxIndex = Math.max.apply(null, Object.keys(bullets))
                    maxIndex = maxIndex > 0 ? maxIndex + 1 : 1
                    bullets[String(maxIndex)] = { 'x': playerPosition[0], 'y': playerPosition[1], 'rotate': playerRotate }
                    return
            }
        })
    }

    return entities;
};

export { MoveBullet };