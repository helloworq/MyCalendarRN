import React, { useState, useEffect, useContext, } from 'react';
import {
    View,
    Button,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import { Svg, SvgXml, Path, Circle, Rect, TextPath, TSpan } from 'react-native-svg';
//const patten = /<path(\b([\s\S]*?))\/>/g
import { selectProvinceList, selectSubRegion, selectParentRegion, selectParentCode } from '../../storage/repository/RegionDao';

const MySvgMap = ({ id, path, func, select, setSelect }) => {
    return (<>
        <Path
            id={id}
            fill={select === id ? "green" : "red"}
            fillOpacity={0.5}
            fillRule={'evenodd'}
            stroke="#333"
            strokeOpacity={1}
            strokeWidth={1}
            strokeLinecap={'square'}
            strokeLinejoin={'miter'}
            strokeDasharray={1}
            d={path}
            onPress={(e) => {
                setSelect(id)

            }}
        />
    </>
    )
}

const MySvgChina = () => {
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height
    const [select, setSelect] = useState()
    const header = `<svg xmlns="http://www.w3.org/2000/svg" pointer-events="none" class="leaflet-zoom-animated" width="664" height="628" viewBox="-68 -52 664 628" style="transform: translate3d(-68px, -52px, 0px);"><g>`
    const footer = `</g></svg>`
    const anyuan = `M276 245L273 250L272 258L276 260L274 271L276 273L282 272L284 278L287 278L289 281L286 283L294 293L296 294L303 291L303 283L305 282L321 282L321 276L328 271L326 267L328 264L330 254L329 248L324 249L317 257L304 256L301 260L293 258L292 262L287 263L286 258L279 254L279 250L283 242L278 244z`
    const xiangdong = `M253 243L247 248L242 259L233 265L231 268L231 282L229 283L226 290L223 293L223 297L225 300L231 302L234 299L236 303L234 305L235 307L232 313L226 316L229 330L234 330L234 333L236 334L229 340L230 347L234 352L240 350L247 355L254 355L260 350L263 351L270 347L281 345L286 346L298 340L301 332L296 328L296 324L293 323L290 319L291 313L289 311L291 311L290 310L292 310L292 308L299 311L300 310L298 307L301 302L294 301L294 297L296 294L286 283L288 279L285 279L282 273L276 273L274 271L276 261L275 259L272 259L273 250L276 245L266 252L264 252L264 246L267 243L267 241L262 240L254 242z`
    const luxi = `M339 328L342 326L347 327L348 325L352 327L358 325L367 327L376 322L378 316L382 314L381 313L384 307L382 305L383 301L389 298L389 293L391 291L395 290L396 288L399 288L399 286L403 284L401 284L400 281L393 277L382 266L387 259L386 256L381 251L381 248L376 238L373 237L372 239L371 233L369 233L367 230L365 231L364 228L362 228L359 233L356 232L352 235L348 235L348 237L333 245L328 246L327 248L330 249L327 267L328 271L321 276L320 283L311 281L303 283L304 290L296 294L294 297L295 302L301 302L298 307L300 310L299 311L292 308L292 310L289 310L291 313L290 319L293 323L296 323L294 326L300 332L310 332L313 324L312 319L318 316L322 318L327 326L338 328z`
    const lianhua = `M298 340L299 351L294 363L295 365L298 365L298 369L295 373L292 387L288 391L284 401L274 412L273 425L277 426L279 423L281 423L284 438L286 441L290 441L292 446L296 446L298 449L298 454L302 459L310 463L312 462L313 457L322 451L322 443L325 442L328 436L331 435L332 431L330 430L330 427L334 417L344 406L351 406L359 387L365 387L372 381L372 378L370 375L369 368L367 366L368 360L366 359L362 362L356 355L350 354L350 350L344 346L344 344L341 341L337 339L339 328L330 327L326 325L321 317L318 316L313 318L311 330L308 333L302 331L300 333L299 338z`
    const shangli = `M253 243L256 241L266 240L267 243L264 246L263 251L266 252L272 247L282 242L283 243L279 250L279 254L287 259L287 263L291 262L293 258L301 260L304 256L317 257L324 249L328 247L328 245L330 246L347 237L348 235L342 236L342 234L336 230L335 232L331 233L327 230L324 231L325 227L321 225L321 220L323 218L320 215L317 216L317 218L315 218L314 210L305 210L307 209L305 209L305 207L307 207L308 202L307 200L303 199L311 189L316 186L316 190L318 190L321 185L324 185L327 180L331 178L332 174L329 169L326 168L323 171L320 170L318 167L319 164L312 166L311 163L304 165L300 164L299 161L296 160L293 168L288 169L285 166L280 169L278 173L274 174L267 181L266 186L263 188L261 197L263 200L264 199L269 203L271 217L254 235L254 239z`

    const [curRegion, setCurRegion] = useState([])
    const [curLevel, setCurLevel] = useState(0)
    const [curCode, setCurCode] = useState()
    const [scale, setScale] = useState(1)

    return (
        <>

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
                    <Button title='加载全国地图' onPress={() => {
                        selectProvinceList((e) => setCurRegion(e))
                        setScale(1)
                    }} />
                    <Button title='上一级' onPress={() => { 
                        setScale(scale - 1)
                        console.log(scale)
                        selectParentCode(curCode, (e) => setCurCode(e))
                        selectParentRegion(curCode, (e) => setCurRegion(e))
                    }} />
                </View>
                <Svg
                    viewBox={'50 110 ' + 400 + ' ' + 200}
                >
                    {
                        curRegion.map(e => {
                            const id = e['NAME']
                            const parentCode = e['PARENT_CODE']
                            const regionCode = e['REGION_CODE']
                            return <Path
                                id={id}
                                fill={select === id ? "green" : "red"}
                                fillOpacity={0.5}
                                fillRule={'evenodd'}
                                stroke="#333"
                                strokeOpacity={1}
                                strokeWidth={1}
                                strokeLinecap={'square'}
                                strokeLinejoin={'miter'}
                                strokeDasharray={1}
                                d={e['PATH']}
                                onPress={(e) => {
                                    setScale(scale + 1)
                                    setCurCode(regionCode)
                                    selectSubRegion(regionCode, (e) => setCurRegion(e))
                                }}
                            />
                        })
                    }

                </Svg>
            </View>
        </>
    )
}

export default MySvgChina