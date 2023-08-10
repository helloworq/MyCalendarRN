const MoveBullet = (entities, { touches, events, dispatch }) => {

    const bulletSpeed = 1

    //子弹飞行
    let bullet = entities['bullet'].position
    const keys = Object.keys(bullet)

    keys.forEach(e => {
        const x = bullet[e].x
        const y = bullet[e].y

        if (x < 0 || y < 0 || x > 500 || y > 700) {
            delete bullet[e]
        } else {
            const rotate = bullet[e].rotate

            bullet[e].x = x + bulletSpeed * Math.cos((rotate) * Math.PI / 180)
            bullet[e].y = y - bulletSpeed * Math.sin((rotate) * Math.PI / 180)
        }
    })


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

                    //console.log(-(Number(playerRotate.slice(0, -3)) - 90))
                    bullets[String(maxIndex)] = { 'x': playerPosition[0], 'y': playerPosition[1], 'rotate': -(Number(playerRotate.slice(0, -3)) - 90) }
                    return
            }
        })
    }

    return entities;
};

export { MoveBullet };